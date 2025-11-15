import express from "express";
import dotenv from "dotenv";

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
