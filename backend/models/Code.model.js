import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    code: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10800,
    }
})

export const Code = mongoose.model("Code", codeSchema);