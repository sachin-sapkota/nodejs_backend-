import { Request, Response } from 'express';
import { verifyToken, generateTokens } from '../../../common/utils/jwt';
import { env } from '../../../common/utils/envConfig';
const { NODE_ENV } = env;
const isProduction = NODE_ENV === 'production';

export const refreshHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cookies } = req;
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: 'Refresh token missing. Please log in again.' });
      return;
    }

    const decoded = verifyToken(refreshToken, 'refresh');
    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired refresh token. Please log in again.' });
      return;
    }

    const { userId, email, exp } = decoded as { userId: string; email: string; exp?: number };

    if (exp && Date.now() >= exp * 1000) {
      res.status(401).json({ message: 'Refresh token expired. Please log in again.' });
      return;
    }

    const { accessToken } = generateTokens({ userId, email });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Access token refreshed successfully.' });
    return;

  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};