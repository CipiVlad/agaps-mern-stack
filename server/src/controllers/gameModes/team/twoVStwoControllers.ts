import User from "../../../models/User";
import { Request, Response } from "express";
//add stroke play
export const addStrokePlay = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const { course, teamA, scoreA, teamB, scoreB } = req.body;

        if (!course || !teamA || !scoreA || !teamB || !scoreB) {
            return res.status(400).send({ message: 'Course, teamA, scoreA, teamB, and scoreB are required' });
        }

        const strokePlay = {
            course: course,
            teamScores: [
                {
                    teamA: teamA,
                    scoreA: scoreA.map((s: any) => ({
                        hole: s.hole,
                        score: s.score
                    })),
                    teamB: teamB,
                    scoreB: scoreB.map((s: any) => ({
                        hole: s.hole,
                        score: s.score
                    }))
                }
            ]
        };

        if (user.gameModes && user.gameModes.teamMode && user.gameModes.teamMode.twoVStwo) {
            user.gameModes.teamMode.twoVStwo.strokePlay = user.gameModes.teamMode.twoVStwo.strokePlay || [];
            user.gameModes.teamMode.twoVStwo.strokePlay.push(strokePlay);

            await user.save();
            return res.status(200).send(user);
        } else {
            return res.status(400).send({ message: 'teamMode.twoVStwo is not properly defined' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}