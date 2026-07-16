import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    isVisible: {
        type: Boolean,
        required: true,
    },
    isMsgEnable: {
        type: Boolean,
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10800,
    }
});

export const Room = mongoose.model("Room", roomSchema);