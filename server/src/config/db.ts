import mongoose from "mongoose";
import { config } from 'dotenv';

config();

const connectDB = async () => {
    try {
        if (!process.env.DATABASE_URI) {
            throw new Error("DATABASE_URI is not defined");
        }

        const connect = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`MongoDB connection: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;