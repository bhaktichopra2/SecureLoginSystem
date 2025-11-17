import express from "express";
import dotenv from "dotenv";
import {prisma} from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Secure Login System Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  try{
    await prisma.$connect();
    console.log("DB connected successfully");
  }catch(error){
    console.error("DB connection error", error);
  }
})();

app.use("/api/auth", authRoutes);