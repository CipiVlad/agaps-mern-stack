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

//only for development
//delete all users
export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.deleteMany()
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
        res.status(500).send({ message: error.message });
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
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // create JWT
    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: '7d' }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Create secure cookie with refresh token
    //!UNCOMMENT FOR PRODUCTION 
    //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ accessToken });
}


export const handleLogout = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;

    // Is refresh token in db?
    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204); // No content
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(204).json({ message: 'Logged out successfully' });
}
