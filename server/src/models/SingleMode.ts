import mongoose from "mongoose";

const singleModeSchema = new mongoose.Schema({
    course: String,
    agaps: [
        {
            hole: Number,
            par: Number,
            score: Number,
            fairway: Boolean,
            green: Boolean,
            approach: String,
            penalty: Number,
            putts: Number
        }
    ],
},
    { timestamps: true }

)
export default singleModeSchema