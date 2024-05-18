import { Request, Response } from 'express';
import User from "../../models/User";

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

    try {
        // Create a new user with default game modes and stats
        const newUser = new User({
            email,
            password,
            username,
            gameModes: { singleMode: [], teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
            stats: { singleMode: { holesPlayed: 0 }, teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}