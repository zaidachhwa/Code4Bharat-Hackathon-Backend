import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // no extra options needed

    console.log("MongoDB Connected ☑️");
  } catch (error) {
    console.log("DB Connection ERROR ❌", error);
    process.exit(1);
  }
};

export default connectDB;
