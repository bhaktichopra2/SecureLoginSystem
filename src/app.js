import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import {prisma} from "./config/db.js"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
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


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(helmet());

const limiter = rateLimit({
  windowMs : 15 * 60 * 1000,
  max : 100,
});

app.use(limiter);

app.use("/api/auth", authRoutes);
