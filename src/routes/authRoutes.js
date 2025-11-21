import express from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/register",
    [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    ], 
registerUser);

router.post("/login",
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

router.post("/logout", (req, res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).json({ message:"Error logging out"})
        }
        res.status(200).json({message:"Logged out successfully"})
    })
})

router.get("/csrf-token", (req, res)=>{
    res.json({csrfToken : req.csrfToken()});
})

export default router;