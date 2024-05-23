import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';


export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { username: string };

        // Check if user exists with the provided refresh token
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser || foundUser.username !== decoded.username) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        // Create a new access token
        const newAccessToken = jwt.sign(
            { "userId": foundUser._id, "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Forbidden' });
    }
};
