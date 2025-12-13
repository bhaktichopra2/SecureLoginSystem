import bcrypt from "bcryptjs";
import logger from "../utils/logger.js";
import { prisma } from "../config/db.js";
import { validationResult } from "express-validator";
import audit from "../utils/audit.js";   // <-- required for login logs

/* -------------------------------------------------------------
   REGISTER USER
------------------------------------------------------------- */
export const registerUser = async (req, res) => {
  console.log("REGISTER BODY:", req.body);
  console.log("SESSION:", req.session);

  try {
    /* ---------- Input Validation --------- */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Register failed: validation error");
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      logger.warn("Register failed: Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and Password required" });
    }

    /* ---------- Prevent Duplicate Users ---------- */
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      logger.warn(`Register failed: Email already exists (${email})`);
      return res.status(400).json({ message: "Email already exists" });
    }

    /* ---------- Hash Password ---------- */
    const hashPassword = await bcrypt.hash(password, 12);

    /* ---------- Create User ---------- */
    await prisma.user.create({
      data: {
        email,
        password_hash: hashPassword,
      },
    });

    logger.info(`User registered successfully: ${email}`);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    logger.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


/* -------------------------------------------------------------
   LOGIN USER
------------------------------------------------------------- */
export const loginUser = async (req, res) => {
  if (req.rateLimit && req.rateLimit.remaining === 0) {
  logger.warn(`Rate limit hit for IP ${req.ip}`);
}

  try {
    /* ---------- Input Validation ---------- */
    const { email, password } = req.body;

    if (!email || !password) {
      logger.warn("Login failed: Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    /* ---------- Check User Exists ---------- */
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      logger.warn(`Login failed: User not found (${email})`);
      await audit(null, `LOGIN_FAILED (user not found): ${email}`, req.ip);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* ---------- Account Locked? ---------- */
    if (user.locked_until && new Date() < user.locked_until) {
      logger.warn(`Login blocked: Account locked (${email})`);
      return res.status(403).json({
        message: "Account temporarily locked. Try again later.",
      });
    }

    /* ---------- Check Password ---------- */
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      /* Failed password attempt */
      let failed = user.failed_attempts + 1;
      let lockTime = null;

      if (failed >= 5) {
        lockTime = new Date(Date.now() + 5 * 60 * 1000);
        logger.warn(`Account locked after 5 failed attempts: ${email}`);
      }

      await prisma.user.update({
        where: { email },
        data: {
          failed_attempts: failed,
          locked_until: lockTime,
        },
      });

      await audit(null, `LOGIN_FAILED (wrong password): ${email}`, req.ip);

      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* ---------- Reset failed attempts ---------- */
    await prisma.user.update({
      where: { email },
      data: {
        failed_attempts: 0,
        locked_until: null,
      },
    });

    /* ---------- Create Session ---------- */
    req.session.userId = user.id;

    await audit(user.id, "LOGIN_SUCCESS", req.ip);

    logger.info(`Login successful: ${email}`);

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    logger.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
