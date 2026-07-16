import otpGenerator from 'otp-generator';
import { Otp } from '../models/Otp.model.js';
import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { oauth2Client } from '../config/googleConfig.js';
import mailSender from '../utils/mailSender.js';
import forgotPasswordTemplate from '../utils/forgotMail.js';
import { createOtpAndSendEmail } from '../services/otp.service.js';


const isSecureCookie = process.env.FRONTEND_URL?.startsWith("https://");

// Access token: short-lived (15 minutes)
const ACCESS_TOKEN_EXPIRY = '15m';
// Refresh token: long-lived (7 days)
const REFRESH_TOKEN_EXPIRY = '7d';

const accessCookieOptions = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes in ms
    sameSite: isSecureCookie ? "none" : "lax",
    secure: isSecureCookie,
};

const refreshCookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    sameSite: isSecureCookie ? "none" : "lax",
    secure: isSecureCookie,
};

/**
 * Creates access + refresh tokens, sets refresh token as httpOnly cookie,
 * returns access token as a string,
 * and persists the refresh token in the DB for revocation support.
 */
const generateTokens = async (user, res) => {
    const payload = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        id: user._id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    // Persist refresh token to DB so it can be invalidated on logout
    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    return accessToken;
};

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // 409 Conflict — user already registered (204 has no body, wrong choice here)
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        }).toString();

        await createOtpAndSendEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        console.log("Error in sendOtp: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const emailSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, otp } = req.body;
        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        }

        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        } else if (recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        const accessToken = await generateTokens(user, res);

        user.password = undefined;
        user.refreshToken = undefined;

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user,
            accessToken
        });
    } catch (error) {
        console.log("Error in emailSignup: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const emailLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Unauthorize'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'InvalidPassword'
            });
        }

        const accessToken = await generateTokens(user, res);

        user.password = undefined;
        user.refreshToken = undefined;

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
            accessToken
        });
    } catch (error) {
        console.log("Error in emailLogin: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const googleSignup = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Google authorization code is required",
            });
        }

        if (!process.env.Google_Client_id || !process.env.Google_secret_key) {
            return res.status(500).json({
                success: false,
                message: "Google OAuth is not configured",
            });
        }

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Fetch user info from Google userinfo API
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
        const data = await response.json();

        const email = data.email;
        const fullName = typeof data.name === 'string' ? data.name.trim() : '';
        const derivedFirstName = data.given_name || fullName.split(' ')[0] || 'User';
        const derivedLastName = data.family_name || fullName.split(' ').slice(1).join(' ') || 'Google';

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email: data.email,
                firstName: derivedFirstName,
                lastName: derivedLastName,
                imageUrl: data.picture,
                googleId: data.id
            });
        }

        const accessToken = await generateTokens(user, res);

        user.password = undefined;
        user.refreshToken = undefined;

        return res.status(user.createdAt === user.updatedAt ? 201 : 200).json({
            success: true,
            message: user.createdAt === user.updatedAt ? 'User created successfully' : 'User logged in successfully',
            user,
            accessToken
        });

    } catch (error) {
        console.log("Error in googleSignup: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in Google Signup',
            error: error
        });
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized — no refresh token'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized — invalid or expired refresh token'
            });
        }

        // Validate against DB (allows server-side revocation)
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized — refresh token revoked'
            });
        }

        // Issue new access + refresh tokens (rotation)
        const accessToken = await generateTokens(user, res);

        return res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            accessToken
        });
    } catch (error) {
        console.log("Error in refreshAccessToken: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const logout = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;

        // Revoke refresh token from DB if present
        if (incomingRefreshToken) {
            try {
                const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
                await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
            } catch {
                // Token already expired or invalid — still clear cookies
            }
        }

        const clearOptions = {
            httpOnly: true,
            sameSite: isSecureCookie ? "none" : "lax",
            secure: isSecureCookie,
        };

        res.clearCookie("refreshToken", clearOptions);

        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.log("Error in logout: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const sendMailForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '15m' });

        await mailSender(email, 'Forgot Password? Add a new One', forgotPasswordTemplate(token, email));

        return res.status(200).json({
            success: true,
            message: 'Forgot Password mail sent successfully'
        });

    } catch (error) {
        console.log("Error in sendMailForgotPassword: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Token verified successfully',
            decoded
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password, email, token } = req.body;
        if (!password || !email || !token) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required (password, email, token)'
            });
        }

        // Verify the forgot-password JWT before allowing reset
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Make sure token email matches the requested email
        if (decoded.email !== email) {
            return res.status(401).json({
                success: false,
                message: 'Token does not match the provided email'
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.log("Error in resetPassword: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
