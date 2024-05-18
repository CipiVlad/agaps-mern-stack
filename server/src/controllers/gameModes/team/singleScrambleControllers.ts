import User from "../../../models/User";
import { Request, Response } from "express";

//add single scramble
export const addSingleScramble = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const singleScramble = {
                course: req.body.course,
                scrambleScore: req.body.scrambleScore.map((score: { hole: number; score: number }) => ({
                    hole: score.hole,
                    score: score.score
                })),
                team: req.body.team
            };

            if (user.gameModes && user.gameModes.teamMode && user.gameModes.teamMode.singleScramble) {
                user.gameModes.teamMode.singleScramble.push(singleScramble);
                await user.save();
                res.status(200).send(user.gameModes.teamMode.singleScramble);
            } else {
                res.status(400).send({ message: 'teamMode.singleScramble is not properly defined' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}