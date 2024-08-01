import mongoose from "mongoose";

export function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
  }
}
