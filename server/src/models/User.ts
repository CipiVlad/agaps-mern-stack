import mongoose from "mongoose";
import peersSchema from "./Peers";
import singleModeSchema from "./SingleMode";
import teamModeSchema from "./TeamMode";

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
    savedCourses: [{ type: Object }],
    // gameModes: GameModes,
    gameModes: {
        type: [{
            singleMode: { type: [singleModeSchema], default: [] },
            teamMode: { type: [teamModeSchema], default: [] }
        }],
        default: [{
            singleMode: [],
            teamMode: []
        }]
    },

    peers: [peersSchema],


},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User
