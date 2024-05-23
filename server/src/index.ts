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
import { verifyJWT } from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';
import corsOptions from './config/corsOptions';

//server
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 3000 || process.env.PORT;

connectDB();

//config
dotenv.config();


//Cross Origin Resource Sharing
app.use(credentials)
app.use(cors(corsOptions))

//middleware
//built-in middleware for json to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
//built-in middleware for json
app.use(express.json());
//built-in middleware for cookies
app.use(cookieParser());


// +----------------------------------------+
// |              AUTH ROUTES               |
// +----------------------------------------+

// get all users --- This is only for admin
// create user --- This is for Userssingle/singleModeController
app.use('/', authRoutes);

// refresh token
// app.use('/refresh', refreshRoute)

// every route should be verified after this line
app.use(verifyJWT);

// +----------------------------------------+
// |              COURSE ROUTES             |
// +----------------------------------------+

// add/edit/delete course inside user
app.use('/courses', courseRoutes);


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
// |              PEER ROUTES               |
// +----------------------------------------+
app.use('/peers', peerRoutes)



// +----------------------------------------+
// |              STATS ROUTES              |
// +----------------------------------------+

//add stats
//TODO: write logic for stats
app.post('/stats/:id', async (req: Request, res: Response) => { });
// listener

app.listen(port, () => {
    console.log(`The application is listening on ${port}!`);
})