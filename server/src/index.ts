// server/src/index.ts
const express = require('express');
import { Request, Response } from 'express';
import connectDB from './config/db';


//routes
import authRoutes from './routes/auth/authRoutes'
import courseRoutes from './routes/saveCourse/courseRoutes'
import singleModeRoutes from './routes/gameModes/single/singleModeRoutes'
import indexTeamModeRoutes from './routes/gameModes/index.router'
import peerRoutes from './routes/peers/peerRoutes'

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
app.use('/peers', peerRoutes)



// +----------------------------------------+
// |              STATS ROUTES               |
// +----------------------------------------+

//add stats
app.post('/stats/:id', async (req: Request, res: Response) => { });
// listener

app.listen(3000, () => {
    console.log(`The application is listening on ${port}!`);
})