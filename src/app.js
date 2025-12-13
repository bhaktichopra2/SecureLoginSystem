import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import morgan from "morgan";
import {prisma} from "./config/db.js"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import xss from "xss-clean";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import { loggers } from "winston";

const app = express();
app.use(express.json());
app.use(express.json({limit: "10kb"}));
app.use(xss())

app.use(
  helmet({
    contentSecurityPolicy:{   //blocks injected scripts
      directives:{
        defaultSrc:["'self'"],
        scriptSrc:["'self'"],
        styleSrc:["'self'", "'unsafe-inline'"],
        imgSrc:["'self", "'data'"],
        frameAncestors: ["'none'"],
        connectSrc:["'self'","http://localhost:5173"],
        fontSrc:["'self'"],
      },
    },
    frameguard: { action: "deny"}, //stops clickjacking
    referrerPolicy: {policy: "no-referrer"}, //no url leakage
    crossOriginEmbedderPolicy: false, //prevents react crash
  }));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


dotenv.config();

app.use(
  session({
    name : "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);



// test route
app.get("/", (req, res) => {
  res.send("Secure Login System Backend Running");
});


(async () => {
  try{
    await prisma.$connect();
    console.log("DB connected successfully");
  }catch(error){
    console.error("DB connection error", error);
  }
})();



const csrfProtection = csrf();
app.use(csrfProtection);

app.use("/api/auth", authRoutes);

app.use(morgan("dev"));

app.use((err, req, res, next) => {
  if(err.code === "EBADCSRFTOKEN"){
  logger.warn("CSRF failure from IP ${req.ip} ")
  return res.status(403).json({message:"Invalid CSRK Token"})
}
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Too many attempts. Try again later." });
});

export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
