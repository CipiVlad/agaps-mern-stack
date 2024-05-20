import { Request, Response } from 'express';
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// refresh token
export const handleRefreshToken = (req: Request, res: Response) => {
    const cookies = req.cookies;

    //are there cookies in the request?
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

    console.log(cookies.jwt);

    //if there is a cookie
    const refreshToken = cookies.jwt;


    // Check if user exists
    const foundUser = User.find({ refreshToken });
    if (!foundUser) {
        return res.status(403).json({ error: 'Forbidden' }); // 403 = Forbidden
    }
    //evaluate password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            const username = decoded.username;
            const accessToken = jwt.sign(
                { username: username },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '45s' }
            );
            res.status(200).json({ accessToken });
        }
    )
}

// export const handleLogout = async (req: Request, res: Response) => {
//     //on client, also delete the accessToken
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content

//     const refreshToken = cookies.jwt;



//     //Is refresh token in db?
//     const foundUser = User.findOne({ refreshToken: cookies.jwt });
//     if (!foundUser) {
//         res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         return res.sendStatus(204); //
//     }

//     //Delete refreshToken in db
//     const currenUser = await User.findOne({ ...foundUser, refreshToken: cookies.jwt });

//     if (!currenUser) {
//         res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         return res.sendStatus(204); //
//     }
//     currenUser.refreshToken = '';
//     await currenUser.save();
//     res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });// secure: true - only on https not in dev
//     res.sendStatus(204);
// }