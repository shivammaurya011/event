import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.connect(process.env.DB_URL);

connection.then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

export default connection;
