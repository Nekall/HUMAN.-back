import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.URI_MONGO_DB;

const database = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

export default database;
