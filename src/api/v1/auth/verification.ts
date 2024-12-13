import { Request, Response } from 'express';
import { redisClient } from '../../../common/config/redis';
import { verifyToken, generateTokens } from '../../../common/utils/jwt';
import { User } from '../../../common/models/User';
import { JWTPayload, VerificationSession } from '../../../types';
import { env } from '../../../common/utils/envConfig';
const { NODE_ENV } = env;
export const emailVerificationHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    if (!token) {
      res.status(400).json({ message: 'Missing token' });
      return;
    }

    const decoded = verifyToken(token, 'verification');
    if (!decoded) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    const { email } = decoded as JWTPayload;
    const sessionKey = `${email}:EmailVerification`;
    const existingSession = await redisClient.get(sessionKey);

    if (!existingSession) {
      res.status(400).json({ message: 'No session found for this verification request' });
      return;
    }

    const sessionData: (VerificationSession & { name: string; phone: string; user_type: 'user'|'agent'; address?: string }) = JSON.parse(existingSession);

    if (sessionData.token !== token) {
      res.status(400).json({ message: 'Token does not match the session' });
      return;
    }

    // insert user in db
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: sessionData.name,
        email,
        phone: sessionData.phone,
        user_type: sessionData.user_type,
        address: sessionData.user_type === 'agent' ? sessionData.address : undefined,
        email_verified: true,
        user_verified: sessionData.user_type === 'user' ? true : false
      });
      await user.save();
    } else {
      user.email_verified = true;
      if (sessionData.user_type === 'user') {
        user.user_verified = true;
      }
      await user.save();
    }

    // Clear session from Redis
    await redisClient.del(sessionKey);

    res.status(200).json({
      message: 'Email verified successfully.',
      user: {
        _id: user._id,
        email: user.email,
        user_type: user.user_type,
        email_verified: user.email_verified,
        user_verified: user.user_verified
      }
    });
    return;
  } catch (error: any) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
