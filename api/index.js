import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import signupRoutes from './routes/auth.route.js'


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

app.use(express.json());

app.use('/testAPI',userRoutes);
app.use('/testAPI',signupRoutes);
