import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        //Bearer token
        console.log(authHeader);

        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
            (err: any, decoded: any) => {
                if (err) return res.sendStatus(403); //invalid token
                req.body.username = decoded.username;
                next();
            }
        )
    } else {
        return res.sendStatus(401);
    }
}