import mongoose from "mongoose";

const singleModeSchema = new mongoose.Schema({ // This defines an array of strings with a default value of an empty array

    course: String,
    agaps: [
        {
            hole: Number,
            par: Number,
            score: Number,
            fairway: Boolean,
            green: Boolean,
            approach: ["Chip", "Pitch", "Sand"],
            penalty: Number,
            putts: Number
        }
    ],
},
    { timestamps: true }

)
export default singleModeSchema