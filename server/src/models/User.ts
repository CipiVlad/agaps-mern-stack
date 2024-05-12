import mongoose from "mongoose";




const userSchema = new mongoose.Schema({
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
    savedCourses: { type: Object },
    // gameModes: [
    //     {
    //         singleMode: [
    //             {
    //                 course: String,
    //                 agaps: [
    //                     {
    //                         hole: Number,
    //                         par: Number,
    //                         score: Number,
    //                         fairway: Boolean,
    //                         green: Boolean,
    //                         approach: ["Chip", "Pitch", "Sand"],
    //                         penalty: Number,
    //                         putts: Number
    //                     }
    //                 ],
    //                 timestamp: { type: Date, required: true }
    //             }
    //         ],
    //         teamMode: [
    //             {
    //                 twoVStwo: [{
    //                     strokePlay: [
    //                         {
    //                             course: Array,
    //                             teamScores: [{
    //                                 teamA: Array,
    //                                 teamScore: Array,
    //                             },
    //                             {
    //                                 teamB: Array,
    //                                 teamScore: Array,
    //                             }
    //                             ],
    //                         },
    //                         { timestamps: true }
    //                     ],
    //                     matchPlay: [
    //                         {
    //                             course: Array,
    //                             teamScores: [{
    //                                 teamA: Array,
    //                                 teamScore: Array,
    //                             },
    //                             {
    //                                 teamB: Array,
    //                                 teamScore: Array,
    //                             }
    //                             ],
    //                         },
    //                         { timestamps: true }
    //                     ],
    //                     comboPlay: [
    //                         {
    //                             course: Array,
    //                             teamScores: [{
    //                                 teamA: Array,
    //                                 teamScore: Array,
    //                             },
    //                             {
    //                                 teamB: Array,
    //                                 teamScore: Array,
    //                             }
    //                             ],
    //                         },
    //                         { timestamps: true }
    //                     ]
    //                 }],
    //                 singleScramble: [
    //                     {
    //                         course: Array,
    //                         scrambleScore: Number,
    //                         teams: Array,
    //                     },
    //                     { timestamps: true }
    //                 ],
    //             }
    //         ]
    //     }
    // ]
    // ,
    gameModes: {
        type: Object
    },
    peers: [{
        peerId: Number,
        peerName: String
    }]

},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User
