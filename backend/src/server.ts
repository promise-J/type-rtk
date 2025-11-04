import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import connectDB from "./config/db";

dotenv.config({override: false});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  connectDB();
});
