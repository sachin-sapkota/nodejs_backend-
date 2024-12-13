import jwt from 'jsonwebtoken';
import { JWTPayload } from '../../types';
import { env } from "@/common/utils/envConfig";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, VERIFICATION_TOKEN_SECRET, LOGIN_TOKEN_SECRET } = env


export const generateTokens = (payload: JWTPayload): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: 'login'|'access' | 'refresh' | 'verification' = 'access'): JWTPayload | null => {
  try {
    let secret = ACCESS_TOKEN_SECRET;
    if (type === 'refresh') secret = REFRESH_TOKEN_SECRET;
    if (type === 'verification') secret = VERIFICATION_TOKEN_SECRET;
    if (type === 'login') secret = LOGIN_TOKEN_SECRET;

    const decoded = jwt.verify(token, secret);
    return decoded as JWTPayload;
  } catch (e) {
    return null;
  }
};

export const generateVerificationToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, VERIFICATION_TOKEN_SECRET, { expiresIn: '30d' });
};

export const generateLoginToken = (email: string): string => {
    return jwt.sign({ email }, LOGIN_TOKEN_SECRET, { expiresIn: '60m' });
  };
  