import { ObjectId } from "mongodb";
import mongoose from "mongoose"


const gameModesSchema = new mongoose.Schema({
    gameModes: [
        {
            singleMode: [
                {
                    id: { type: ObjectId, required: true },
                    course: String,
                    agaps: [
                        {
                            hole: Number,
                            par: Number,
                            score: Number,
                            fairway: Boolean,
                            green: Boolean,
                            approach: ["Chip", "Pitch", "Sand"],
                            penalty: Number,
                            putts: Number
                        }
                    ],
                    timestamp: { type: Date, required: true }
                }
            ],
            teamMode: [
                {
                    twoVStwo: [{
                        strokePlay: [
                            {
                                id: { type: ObjectId, required: true },
                                course: Array,
                                teamScores: [{
                                    teamA: Array,
                                    teamScore: Array,
                                },
                                {
                                    teamB: Array,
                                    teamScore: Array,
                                }
                                ],
                            },
                            { timestamps: true }
                        ],
                        matchPlay: [
                            {
                                id: { type: ObjectId, required: true },
                                course: Array,
                                teamScores: [{
                                    teamA: Array,
                                    teamScore: Array,
                                },
                                {
                                    teamB: Array,
                                    teamScore: Array,
                                }
                                ],
                            },
                            { timestamps: true }
                        ],
                        comboPlay: [
                            {
                                id: { type: ObjectId, required: true },
                                course: Array,
                                teamScores: [{
                                    teamA: Array,
                                    teamScore: Array,
                                },
                                {
                                    teamB: Array,
                                    teamScore: Array,
                                }
                                ],
                            },
                            { timestamps: true }
                        ]
                    }],
                    singleScramble: [
                        {
                            id: { type: ObjectId, required: true },
                            course: Array,
                            scrambleScore: Number,
                            teams: Array,
                        },
                        { timestamps: true }
                    ],
                }
            ]
        }
    ]

}, {
    timestamps: true
})

export default gameModesSchema
