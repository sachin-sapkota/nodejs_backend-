import { env } from "@/common/utils/envConfig";
import { Resend } from 'resend';
const { EMAIL_API_KEY, EMAIL_SENDER } = env;
export const sendVerificationEmail = async (email: string, verificationUrl: string): Promise<void> => {
    const resend = new Resend(EMAIL_API_KEY);
    console.log('sending email to:', email);
    resend.emails.send({
        from: EMAIL_SENDER,
        to: email,
        subject: 'Signup Verification',
        html: `<p>your verification url for signup is <a href="${verificationUrl}">${verificationUrl}</a></p>`
    });
}

export const sendLoginLinkEmail = async (email: string, loginUrl: string): Promise<void> => {
    const resend = new Resend(EMAIL_API_KEY);
    console.log('sending email to:', email);
    resend.emails.send({
        from: EMAIL_SENDER,
        to: email,
        subject: 'Login verification',
        html: `<p>your verification url for login is <a href="${loginUrl}">${loginUrl}</a></p>`
    });
}