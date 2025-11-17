import bcrypt from "bcryptjs";
import {prisma} from "../config/db.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and Password required"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });
        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        const hashPassword =  await bcrypt.hash(password, 12)

        await prisma.user.create({
            data:{
                email,
                password_hash : hashPassword,
            }
        });
        return res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error("Register error", error);
        return res.status(500).json({message:"Server error"});
    }
}