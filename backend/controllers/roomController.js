import mongoose from "mongoose";
import { Room } from "../models/Room.model.js";
import { User } from "../models/User.model.js";

export const createRoom = async (req, res) => {
    try {
        const { roomName, language, isVisible, isMsgEnable } = req.body;
        const adminId = req.user.id;

        if (!roomName || !language || !adminId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const admin = await User.findById(adminId);
        if(!admin){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const room = await Room.create({name:roomName, language: language, admin: admin._id, isVisible: isVisible, isMsgEnable: isMsgEnable})
        if(!room){
            return res.status(400).json({
                success: false,
                message: "Some error occured, can't create Room"
            });
        }

        admin.rooms.push(room._id);
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Room created successfully",
            room
        })

    } catch (error) {
        console.log("Error in createRoom");
    }

}

export const joinRoom = async (req, res) => {
    try{
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if(!mongoose.Types.ObjectId.isValid(roomId)){
            return res.status(400).json({
                success: false,
                message: "Room Id is not valid",
            });
        }

        const room = await Room.findById(roomId);
        if(!room){
            return res.status(400).json({
                success: false,
                message: "Room not found"
            });
        }

        const isPresent = room.members.includes(userId);
        if(isPresent){
            return res.status(400).json({
                success: false,
                message: "You are already in this room"
            });
        }

        if(!user.rooms.includes(roomId)){
            user.rooms.push(roomId);
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "Joined Room successfully",
            room
        })

    }catch(error){
        console.log("Error in joinRoom", error);
    }
}

export const addMember = async (data) => {
    try{
        const roomId = data.roomId;
        const email = data.email;

        const user = await User.findOne({email});
        await Room.findByIdAndUpdate(roomId, {$push:{members:user._id}});

    }catch(error){
        console.log("Error in addMember");
    }
}

export const removeMember = async (data) => {
    try{
        const roomId = data.roomId;
        const email = data.email;

        const user = await User.findOne({email});
        await Room.findByIdAndUpdate(roomId, {$pull:{members:user._id}});
        
    }catch(error){
        console.log("Error in removeMember");
    }
}

export const getMembers = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorize",
            })
        }

        const room = await Room.findById(roomId).populate("members");
        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found",
            })
        }

        const members = room.members;

        return res.status(200).json({
            success: true,
            message: "Members fetched successfully",
            members,
        })
    } catch (error) {
        console.log("Error in getMembers");
    }
}

export const getRoomDetails = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorize",
            })
        }

        const room = await Room.findById(roomId).populate("members");
        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Room details fetched successfully",
            room
        })
    } catch (error) {
        console.log("Error in getRoomDetails");
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Credentials are required"
            });
        }

        const room = await Room.findById(roomId);
        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found"
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        await Room.findByIdAndDelete(roomId);
        const updatedUser = await User.findByIdAndUpdate(userId, {$pull:{rooms:roomId}}, {new: true}).populate("rooms");
        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: "Some error occured, can't delete Room"
            });
        }

        const userRooms = updatedUser.rooms;

        return res.status(200).json({
            success: true,
            message: "Room deleted successfully",
            rooms: userRooms
        })
    } catch (error) {
        console.log("Error in deleteRoom");
    }
}    