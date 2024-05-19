import User from "../../../models/User";
import { Request, Response } from "express";


// add new single mode
export const addSingleMode = async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            // Create a new singleMode object with all the fields from the request body
            const newSingleMode = {
                course: req.body.course,
                agaps: req.body.agaps
            };

            // Push the new singleMode object to the singleMode array
            user.gameModes.singleMode.push(newSingleMode);
            await user.save();

            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}

export const getSingleMode = async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            res.status(200).send(user.gameModes.singleMode);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}