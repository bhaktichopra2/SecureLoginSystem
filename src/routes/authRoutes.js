import express from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

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

export default router;