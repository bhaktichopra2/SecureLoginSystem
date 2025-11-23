import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import morgan from "morgan";
import {prisma} from "./config/db.js"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import xss from "xss-clean";
import authRoutes from "./routes/authRoutes.js"
import { loggers } from "winston";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.json({limit: "10kb"}));
app.use(xss())

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

app.use(helmet());

const limiter = rateLimit({
  windowMs : 15 * 60 * 1000,
  max : 100,
});

app.use(limiter);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);


const csrfProtection = csrf();
app.use(csrfProtection);

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use(morgan("dev"));

if(err.code === "EBADCSRFTOKEN"){
  logger.warn("CSRF failure from IP ${req.ip} ")
  return res.status(403).json({message:"Invalid CSRK Token"})
}

export default app;