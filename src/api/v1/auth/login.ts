import { Request, Response } from 'express';
import { User } from '../../../common/models/User';
import { redisClient } from '../../../common/config/redis';
import { generateLoginToken, generateTokens, verifyToken } from '../../../common/utils/jwt';
import { sendLoginLinkEmail } from '../../../common/utils/emailService';
import { env } from '../../../common/utils/envConfig';
import { validateLogin, validateLoginVerify } from '../../../common/validations/authValidations/authValidation';
import { CronJob } from 'cron';
const { FRONTEND_URL } = env;
const isProduction = process.env.NODE_ENV === 'production';

export const loginInitHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const validationError = validateLogin(req);
    if (validationError.success === false) {
      res.status(400).json({ message: validationError });
      return;
    }
    const sessionKey = `${email}:LoginVerification`;
    const existingSession = await redisClient.get(sessionKey);

    if (existingSession) {
      const parsedSession = JSON.parse(existingSession);
      if (parsedSession && parsedSession.token) {
        const loginLink = `${FRONTEND_URL}/?token=${parsedSession.token}&email=${email}`;

        const job = new CronJob('* * * * * *', async () => {
            await sendLoginLinkEmail(email, loginLink);
            job.stop(); 
        });
        job.start();
        res.status(200).json({ message: 'Login link resent. Please check your email.' });
        return;
      }
    }

    const user = await User.findOne({ email });
    if (!user || !user.email_verified) {
      res.status(401).json({ message: 'No verified user found with this email.' });
      return;
    }

    const token = generateLoginToken(email);

    // Store in Redis
    const sessionData = { email, token };
    await redisClient.set(sessionKey, JSON.stringify(sessionData), { EX: 15 * 60 }); 

    const loginLink = `${FRONTEND_URL}/?token=${token}&email=${email}`;
    const job = new CronJob('* * * * * *', async () => {
        await sendLoginLinkEmail(email, loginLink);
        job.stop(); 
    });
    job.start();

    res.status(200).json({ message: 'Login link sent. Please check your email.' });
    return;
  } catch (error: any) {
    console.error('Login init error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};



export const loginVerifyHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, token } = req.body;
    
    if (!email || !token) {
      res.status(400).json({ message: 'Email and token are required' });
      return;
    }
    const validationError = validateLoginVerify(req);
    if (validationError.success === false) {
      res.status(400).json({ message: validationError });
      return;
    }


    const decoded = verifyToken(token, 'login');
    if (!decoded) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    // Check Redis session
    const sessionKey = `${email}:LoginVerification`;
    const existingSession = await redisClient.get(sessionKey);
    if (!existingSession) {
      res.status(400).json({ message: 'No session found or expired. Please request a new login link.' });
      return;
    }

    const parsedSession = JSON.parse(existingSession);
    if (!parsedSession || parsedSession.token !== token) {
      res.status(400).json({ message: 'Token does not match session' });
      return;
    }


    const user = await User.findOne({ email });
    if (!user || !user.email_verified) {
      res.status(401).json({ message: 'No verified user found. Cannot issue tokens.' });
      return;
    }

  
    const payload = { userId: user._id.toString(), email: user.email };
    const { accessToken, refreshToken } = generateTokens(payload);

 
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    await redisClient.del(sessionKey);

    res.status(200).json({ message: 'Login successful.' });
    return;
  } catch (error: any) {
    console.error('Login verify error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
