import mongoose, { ObjectId } from "mongoose";

const teamModeSchema = new mongoose.Schema({

    twoVStwo: {
        strokePlay: [
            {
                // id: { type: ObjectId, required: true },
                course: String,
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
                // id: { type: ObjectId, required: true },
                course: String,
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
                // id: { type: ObjectId, required: true },
                course: String,
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
    },
    singleScramble: [
        {
            // id: { type: ObjectId, required: true },
            course: String,
            scrambleScore: Number,
            teams: Array,
        },
        { timestamps: true }
    ]

},
)

export default teamModeSchema