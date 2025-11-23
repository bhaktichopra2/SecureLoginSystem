import bcrypt from "bcryptjs";
import logger from "../utils/logger.js"
import {prisma} from "../config/db.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            logger.warn("Register failed: Missing email or password")
            return res.status(400).json({message: "Email and Password required"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });
        if(existingUser){
            logger.warn("Register failed: Email already exists (${email})")
            return res.status(400).json({message: "Email already exists"});
        }

        const hashPassword =  await bcrypt.hash(password, 12)

        await prisma.user.create({
            data:{
                email,
                password_hash : hashPassword,
            }
        });
        logger.info("User registered successfully : ${email}")
        return res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error("Register error", error);
        return res.status(500).json({message:"Server error"});
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
}

export const loginUser = async (req, res)=>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            logger.warn("Login failed: Missing email or password")
            return res.status(400).json({message:"Email and password required"});
        }

        const user = await prisma.user.findUnique({where: { email }});
        if(!user){
            logger.warn("Login failed: User not found (${email}) ")
            return res.status(400).json({message:"Invalid credentials"});
        }
        if(user.locked_until && new Date() < user.locked_until){
            logger.warn(`Login blocked: Account locked (${email})`);
            return res.status(403).json({
                message:"Account temporarily locked. Try again later."
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      await audit(null, `LOGIN_FAILED for ${email}`, req.ip);

      logger.warn(`Invalid password attempt for ${email}`);
      let failed = user.failed_attempts + 1;
      let lockTime = null;

      // Lock the account after 5 attempts
      if (failed >= 5) {
        lockTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        logger.warn(`Account locked (5 failed attempts): ${email}`);
      }

      await prisma.user.update({
        where: { email },
        data: {
          failed_attempts: failed,
          locked_until: lockTime,
        },
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }
    await prisma.user.update({
      where: { email },
      data: {
        failed_attempts: 0,
        locked_until: null,
      },
    });

    // 6. Create session
    req.session.userId = user.id;
    await audit(user.id, "LOGIN_SUCCESS", req.ip);

    logger.info(`Login successful: ${email}`);

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
    logger.error("Register error:", error);  // for register
    logger.error("Login error:", error);    // for login
  }
};