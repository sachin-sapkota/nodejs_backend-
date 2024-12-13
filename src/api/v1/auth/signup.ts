import { Request, Response } from 'express';
import { User } from '../../../common/models/User';
import { redisClient } from '../../../common/config/redis';
import { generateTokens, generateVerificationToken } from '../../../common/utils/jwt';
import { sendVerificationEmail } from '../../../common/utils/emailService';
import { SignupRequestBody } from '../../../types';
import { env } from "@/common/utils/envConfig";
import { CronJob } from 'cron';
const { BASE_URL } = env;
import { validateSignup } from '../../../common/utils/authValidation';

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, user_type, address } = req.body as SignupRequestBody;
    const validationError = validateSignup(req);
    if (validationError.success === false) {
      res.status(400).json({ message: validationError });
      return;
    }
   
    const sessionKey = `${email}:EmailVerification`;
    const existingSession = await redisClient.get(sessionKey);

    if (existingSession) {
      const parsedSession = JSON.parse(existingSession);
      if (!parsedSession.email_verified) {
        const verificationUrl = `${BASE_URL || 'http://localhost:8090'}/api/v1/auth/verification/email/${parsedSession.token}`;
      

        const job = new CronJob('* * * * * *', async () => {
            await sendVerificationEmail(email, verificationUrl);
            job.stop(); 
        });
        job.start();

        res.status(200).json({ message: 'Verification link resent. Please check your email.' });
        return;
      } else {
        const userInDB = await User.findOne({ email });
        if (userInDB && userInDB.email_verified) {
          res.status(400).json({ message: 'User already verified and signed up.' });
          return;
        }
      }
    }

    let userInDB = await User.findOne({ email });
    if (userInDB && userInDB.email_verified) {
      res.status(400).json({ message: 'User already exists and verified.' });
      return;
    }

    const payload = { userId: '', email };
    const verificationToken = generateVerificationToken(payload);

    const sessionData = {
      email,
      token: verificationToken,
      user_verified: false,
      email_verified: false,
      name,
      phone,
      user_type,
      address
    };

    await redisClient.set(sessionKey, JSON.stringify(sessionData), { EX: 60 * 60 * 24 * 30 });

    const verificationUrl = `${BASE_URL || 'http://localhost:8090'}/api/v1/auth/verification/email/${verificationToken}`;
    const job = new CronJob('* * * * * *', async () => {
        await sendVerificationEmail(email, verificationUrl);
        job.stop(); 
    });
    job.start();

    res.status(200).json({ message: 'Signup initiated. Please verify your email.' });
    return;
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
