import express from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import audit from "../utils/audit.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // 5 attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP ${req.ip}`);
    return res
      .status(429)
      .json({ message: "Too many attempts. Try again later." });
  },
});


const router = express.Router();

router.get("/csrf-token", (req, res)=>{
    res.json({csrfToken : req.csrfToken()});
})

router.post("/register", authLimiter,
    [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    ], 
registerUser);

router.post("/login", authLimiter,
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password").notEmpty().withMessage("Password required"),
    ],
     loginUser);

router.get('/dashboard', requireAuth, (req, res)=>{
    res.status(200).json({
        message : "Welcome to your dashboard",
        userId : req.session.userId,
    })
})

router.post("/logout", async (req, res)=>{
    await audit(req.session.userId, "LOGOUT", req.ip);

    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({ message:"Error logging out"})
        }
        res.clearCookie("sessionId");
        return res.status(200).json({message:"Logged out successfully"})
    })
})


export default router;