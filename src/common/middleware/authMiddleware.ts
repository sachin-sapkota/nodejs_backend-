import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface CustomRequest extends Request {
  user?: any;
}
import { env } from '../utils/envConfig';
const {ACCESS_TOKEN_SECRET} = env

export const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: 'Access token is missing' });
    return
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    console.log(req.body)
    console.log(decoded)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired access token' });
    return 
  }
}

