import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL)
    return console.log("MONGODB_URL is not connected.");
  if (isConnected) return console.log("Already connected.");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
