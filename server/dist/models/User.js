"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    savedCourses: [
        {
            "id": 1,
            "courseInfo": [
                {
                    "id": 1,
                    "courseName": "GCK",
                    "courseData": [
                        {
                            "hole": 1,
                            "par": 4
                        },
                        {
                            "hole": 2,
                            "par": 5
                        },
                        {
                            "hole": 3,
                            "par": 4
                        },
                        {
                            "hole": 4,
                            "par": 4
                        },
                        {
                            "hole": 5,
                            "par": 3
                        },
                        {
                            "hole": 6,
                            "par": 5
                        },
                        {
                            "hole": 7,
                            "par": 4
                        },
                        {
                            "hole": 8,
                            "par": 3
                        },
                        {
                            "hole": 9,
                            "par": 4
                        },
                        {
                            "hole": 10,
                            "par": 4
                        },
                        {
                            "hole": 11,
                            "par": 3
                        },
                        {
                            "hole": 12,
                            "par": 5
                        },
                        {
                            "hole": 13,
                            "par": 4
                        },
                        {
                            "hole": 14,
                            "par": 4
                        },
                        {
                            "hole": 15,
                            "par": 4
                        },
                        {
                            "hole": 16,
                            "par": 5
                        },
                        {
                            "hole": 17,
                            "par": 3
                        },
                        {
                            "hole": 18,
                            "par": 4
                        }
                    ]
                }
            ],
            timestamp: { type: Date, required: true }
        },
    ],
    gameModes: [
        {
            singleMode: [
                {
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
                            course: Array,
                            scrambleScore: Number,
                            teams: Array,
                        },
                        { timestamps: true }
                    ],
                }
            ]
        }
    ],
    peers: [{
            peerId: Number,
            peerName: String
        }]
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
