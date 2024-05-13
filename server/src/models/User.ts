import mongoose from "mongoose";
import peersSchema from "./Peers";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    savedCourses: { type: Object },
    // gameModes: GameModes,
    peers: [peersSchema],


},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User
