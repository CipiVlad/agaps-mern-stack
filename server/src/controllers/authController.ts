import { Request, Response } from 'express';
import User from "../models/User";

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

