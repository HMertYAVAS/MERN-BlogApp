import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

mongoose
  .connect(
    process.env.MONGO_CON
  )
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
