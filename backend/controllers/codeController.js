import { Room } from "../models/Room.model.js";
import { User } from "../models/User.model.js";
import { Code } from "../models/Code.model.js";
import axios from "axios";

export const codeSave = async (data) => {
    try {
        const { code, userId, language, roomId } = data;

        if (code === null || code === undefined || !language || !roomId || !userId) {
            return ;
        }

        const user = await User.findById(userId);
        if (!user) {
            return;
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return;
        }

        const codeModel = await Code.findOneAndUpdate(
            { user: user._id, roomId}, 
            { user: user._id, language, roomId, code },
            { upsert: true, new: true }
        );
        
        if (!codeModel) {
            return;
        }

    } catch (error) {
        console.log("Error occured in codeSave");
    }
}

export const getCode = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if (!userId || !roomId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found",
            });
        }

        const code = await Code.findOne({ user: user._id, roomId });
        if (!code) {
            return res.status(204).json({
                success: false,
                message: "Code not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Code get successfully",
            code
        })

    } catch (error) {
        console.log("Error in getCode");
    }
}

export const getRemoteCode = async (req, res) => {
    try {
        const { roomId, userId } = req.body;

        if (!userId || !roomId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found",
            });
        }

        const code = await Code.findOne({ user: user._id, roomId });
        if (!code) {
            return res.status(204).json({
                success: false,
                message: "Code not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Code get successfully",
            code
        })

    } catch (error) {
        console.log("Error in getCode");
    }
}

export const reviewCode = async (req, res) => {
    try {
        const { code, language } = req.body;
        const userId = req.user.id;

        if (!userId || !code || !language) {
            return res.status(400).json({
                success: false,
                message: "Code and language are required",
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Groq API key is not configured",
            });
        }

        const prompt = `Review this ${language} code for a student developer.

Return concise, practical feedback in markdown with these sections:
1. Summary
2. Bugs or edge cases
3. Code quality improvements
4. Security or performance notes
5. Suggested next steps

Focus on actionable review comments. Do not rewrite the entire program unless a small snippet is necessary.

Code:
\`\`\`${language}
${code}
\`\`\``;

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are a careful senior code reviewer. Be helpful, specific, and concise.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.2,
                max_tokens: 1200,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            }
        );

        const review = response.data?.choices?.[0]?.message?.content;

        if (!review) {
            return res.status(502).json({
                success: false,
                message: "AI review response was empty",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Code reviewed successfully",
            review,
        });
    } catch (error) {
        console.log("Error in reviewCode: ", error?.response?.data || error?.message);
        return res.status(500).json({
            success: false,
            message: "Unable to review code right now",
        });
    }
}
