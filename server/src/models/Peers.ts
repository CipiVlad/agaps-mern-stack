import mongoose from "mongoose";

const peersSchema = new mongoose.Schema({
    peerName: String,
},
    { timestamps: true }
)
export default peersSchema;