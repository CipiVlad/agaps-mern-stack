import { Request, Response } from 'express';
import User from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error: any) {
        res.status(500).send({ message: error.message })
        console.log(error);
    }
}

// create new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    // Basic validation
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    // Check if user already exists
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    // if not, create new user
    try {
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            gameModes: { singleMode: [], teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
            stats: { singleMode: { holesPlayed: 0 }, teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
        });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }

}

// login user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user exists
    const foundUser = await User.find({ username })
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid credentials' }); // 401 = Unauthorized
    }
    //evaluate password
    const match = await bcrypt.compare(password, foundUser[0].password);
    if (match) {
        //create JWT 
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        if (!accessTokenSecret || !refreshTokenSecret) {
            return res.status(500).json({ error: 'Missing JWT secret' });
        }

        const accessToken = jwt.sign(
            { username: foundUser[0].username },
            accessTokenSecret,
            { expiresIn: '45s' }
        );

        const refreshToken = jwt.sign(
            { username: foundUser[0].username },
            refreshTokenSecret,
            { expiresIn: '1d' }
        );

        const currentUser: any = { ...foundUser[0], refreshToken };
        // Saving refreshToken with current user
        currentUser.refreshToken = refreshToken;
        await User.updateOne({ username }, { refreshToken: refreshToken });
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}


export const handleLogout = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); // No content
    }

    // Delete refreshToken in db
    await User.updateOne({ refreshToken }, { $set: { refreshToken: '' } });

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });// secure: true - only on https not in dev
    res.sendStatus(204);
}
