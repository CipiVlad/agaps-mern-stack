// server/src/index.ts
const express = require('express');
import { Request, Response } from 'express';
import connectDB from './config/db';
import User from './models/User';
import { ObjectId } from 'mongodb';

//routes
import authRoutes from './routes/auth/authRoutes'
import courseRoutes from './routes/saveCourse/courseRoutes'
import singleModeRoutes from './routes/gameModes/single/singleModeRoutes'
import indexTeamModeRoutes from './routes/gameModes/index.router'
//server
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 3000 || process.env.PORT;
connectDB();

//config
dotenv.config();
app.use(cors());

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// +----------------------------------------+
// |              AUTH ROUTES               |
// +----------------------------------------+

// get all users --- This is only for admin
// create user --- This is for Userssingle/singleModeController
app.use('/', authRoutes);

// +----------------------------------------+
// |              COURSE ROUTES                |
// +----------------------------------------+

// save new course to user
app.use('/save-new-course', courseRoutes);


// +----------------------------------------+
// |              GAME ROUTES               |
// +----------------------------------------+


// single mode
app.use('/single-mode', singleModeRoutes)


// team mode
// team mode two vs two || single scramble
// stroke play || match play || combo play
app.use('/team-mode/', indexTeamModeRoutes)


// +----------------------------------------+
// |              PEER ROUTES                |
// +----------------------------------------+

//peer
app.post('/add-peer/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            user.peers.push({
                peerId: new ObjectId(req.body.peerId),
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
});


// +----------------------------------------+
// |              STATS ROUTES               |
// +----------------------------------------+

//add stats
app.post('/stats/:id', async (req: Request, res: Response) => { });
// listener

app.listen(3000, () => {
    console.log(`The application is listening on ${port}!`);
})