import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Users from "./routes/user.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDb is connected"))
  .catch(() => console.log("MongoDb is not connected"));

app.get("/", (req, res) => {
  res.json("Servering is running");
});

app.use("/users", Users);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`${PORT} is loading`));
