// import { Request, Response } from 'express';
// import { User } from '../../../common/models/User';
// import { verifyToken, generateTokens } from '../../../common/utils/jwt';

// export const refreshHandler = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       res.status(400).json({ message: 'Refresh token is required' });
//       return;
//     }

//     const decoded = verifyToken(refreshToken, 'refresh');
//     if (!decoded) {
//       res.status(401).json({ message: 'Invalid or expired refresh token' });
//       return;
//     }

//     const { userId, email } = decoded;
//     const user = await User.findOne({ _id: userId, email });
//     if (!user) {
//       res.status(401).json({ message: 'User not found' });
//       return;
//     }

//     const tokenIndex = user.refreshToken.indexOf(refreshToken);
//     if (tokenIndex === -1) {
//       res.status(401).json({ message: 'Refresh token not recognized' });
//       return;
//     }

//     user.refreshToken.splice(tokenIndex, 1);

//     const payload = { userId: user._id.toString(), email: user.email };
//     const { accessToken, newRefreshToken } = generateTokens(payload);

//     user.refreshToken.push(newRefreshToken);
//     await user.save();

//     const isProduction = process.env.NODE_ENV === 'production';

//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: 'strict',
//     });

//     res.status(200).json({ accessToken, refreshToken: newRefreshToken });
//   } catch (error) {
//     console.error('Refresh token error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };