import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

export const oauth2Client = new google.auth.OAuth2(
    process.env.Google_Client_id,
    process.env.Google_secret_key,
    "postmessage"
);