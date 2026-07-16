import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    password: String,
    imageUrl: String,
    googleId: String,
    refreshToken: String,
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
},{ timestamps: true });

export const User = mongoose.model('User', userSchema);