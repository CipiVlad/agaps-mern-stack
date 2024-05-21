import { ObjectId } from "mongodb";
import User from "../../models/User";
import { Request, Response } from "express";

// add new peer
export const addPeer = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            user.peers.push({
                // peerId: new ObjectId(req.body.peerId),
                peerName: req.body.peerName
            });
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

// add new team
//create new team to show stats for the team
export const addTeam = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            user.peers.push({
                teamName: req.body.teamName
            })
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