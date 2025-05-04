import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected!");
  } catch (error) {
    console.error("MongoDb error: ", error);
    process.exit(1);
  }
};
