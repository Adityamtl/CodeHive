import { Otp } from "../models/Otp.model.js";
import mailSender from "../utils/mailSender.js";
import mailTemplateCode from "../utils/mailTemplate.js";

const OTP_EMAIL_SUBJECT = "Verification Email From CodeHive";

export const createOtpAndSendEmail = async (email, otp) => {
    const otpRecord = await Otp.create({ email, otp });
    await mailSender(email, OTP_EMAIL_SUBJECT, mailTemplateCode(otp, email));
    return otpRecord;
};
