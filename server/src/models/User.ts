import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Sub-schemas
const holeSchema = new Schema({
    hole: { type: Number, required: true },
    par: { type: Number, required: true },
});

const courseDataSchema = new Schema({
    courseName: { type: String, required: true },
    courseData: { type: [holeSchema], default: [] },
});

const savedCourseSchema = new Schema({
    courseInfo: { type: [courseDataSchema], default: [] },
});

const singleModeSchema = new Schema({
    hole: { type: Number, required: true },
    par: { type: Number, required: true },
    score: { type: Number, required: true },
    fairway: { type: Boolean, required: true },
    green: { type: Boolean, required: true },
    approach: { type: String, required: true, enum: ['Pitch', 'Chip', 'Sand'] },
    penalty: { type: Number, required: true },
    putts: { type: Number, required: true },
});

const singleGameModeSchema = new Schema({
    course: { type: String, required: true },
    agaps: { type: [singleModeSchema], default: [] },
}, { timestamps: true });

const teamScoreSchema = new Schema({
    hole: { type: Number, required: true },
    score: { type: Number, required: true },
});

const teamSchema = new Schema({
    teamA: { type: [String], default: [] },
    scoreA: { type: [teamScoreSchema], default: [] },
    teamB: { type: [String], default: [] },
    scoreB: { type: [teamScoreSchema], default: [] },
});

const teamModeSchema = new Schema({
    course: { type: String, required: true },
    teamScores: { type: [teamSchema], default: [] },
});

const singleScrambleSchema = new Schema({
    course: { type: String, required: true },
    scrambleScore: { type: [teamScoreSchema], default: [] },
    team: { type: [String], default: [] },
});

const teamGameModeSchema = new Schema({
    twoVStwo: {
        strokePlay: { type: [teamModeSchema], default: [] },
        matchPlay: { type: [teamModeSchema], default: [] },
        comboPlay: { type: [teamModeSchema], default: [] },
    },
    singleScramble: { type: [singleScrambleSchema], default: [] },
});

const gameModesSchema = new Schema({
    singleMode: { type: [singleGameModeSchema], default: [] },
    teamMode: { type: teamGameModeSchema, default: () => ({}) },
});

const peerSchema = new Schema({
    peerName: { type: String, required: true },
}, { timestamps: true });

const teamStatsSchema = new Schema({
    gamesPlayed: { type: Number, required: true },
    teamA: {
        wins: { type: Number, required: true },
        losses: { type: Number, required: true },
        ties: { type: Number, required: true },
    },
    teamB: {
        wins: { type: Number, required: true },
        losses: { type: Number, required: true },
        ties: { type: Number, required: true },
    },
});

const comboStatsSchema = new Schema({
    gamesPlayed: { type: Number, required: true },
    teamA: {
        strokeWins: { type: Number, required: true },
        strokeLosses: { type: Number, required: true },
        strokeTies: { type: Number, required: true },
        matchWins: { type: Number, required: true },
        matchLosses: { type: Number, required: true },
        matchTies: { type: Number, required: true },
    },
    teamB: {
        strokeWins: { type: Number, required: true },
        strokeLosses: { type: Number, required: true },
        strokeTies: { type: Number, required: true },
        matchWins: { type: Number, required: true },
        matchLosses: { type: Number, required: true },
        matchTies: { type: Number, required: true },
    },
});

const statsSchema = new Schema({
    singleMode: {
        holesPlayed: { type: Number, required: true },
    },
    teamMode: {
        twoVStwo: {
            strokePlay: { type: [teamStatsSchema], default: [] },
            matchPlay: { type: [teamStatsSchema], default: [] },
            comboPlay: { type: [comboStatsSchema], default: [] },
        },
    },
}, { timestamps: true });

// Main schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    savedCourses: { type: [savedCourseSchema], default: [] },
    gameModes: { type: gameModesSchema, default: () => ({}) },
    peers: { type: [peerSchema], default: [] },
    stats: { type: statsSchema, default: () => ({ singleMode: { holesPlayed: 0 }, teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } }) },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User
