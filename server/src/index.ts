const express = require('express');
import { Request, Response } from 'express';
import connectDB from './config/db';
import User from './models/User';
import { ObjectId } from 'mongodb';


const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 3000 || process.env.PORT;
connectDB();


dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// +----------------------------------------+
// |              AUTH ROUTES               |
// +----------------------------------------+

// create a user
app.post('/signup', async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    // Basic validation
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    try {
        // Create a new user with default game modes and stats
        const newUser = new User({
            email,
            password,
            username,
            gameModes: { singleMode: [], teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
            stats: { singleMode: { holesPlayed: 0 }, teamMode: { twoVStwo: { strokePlay: [], matchPlay: [], comboPlay: [] }, singleScramble: [] } },
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// +----------------------------------------+
// |              APP ROUTES                |
// +----------------------------------------+

// get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error: any) {
        res.status(500).send({ message: error.message })
        console.log(error);
    }
})

// grep user by id and copy savedCourses to User.savedCourses
app.post('/save-new-course/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const newCourse = req.body;

    // Validate newCourse structure here if necessary
    if (!newCourse || !newCourse.courseInfo) {
        return res.status(400).json({ error: 'Invalid course data' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new course to the savedCourses array
        user.savedCourses.push(newCourse);

        // Save the updated user document
        await user.save();

        // Respond with the updated user
        res.status(200).json(user);
    } catch (error) {
        console.error('Error saving new course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// grep user by id and copy singleMode to User.gameModes
app.post('/single-mode/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            // Create a new singleMode object with all the fields from the request body
            const newSingleMode = {
                course: req.body.course,
                agaps: req.body.agaps
            };

            // Push the new singleMode object to the singleMode array
            user.gameModes.singleMode.push(newSingleMode);
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


//add team mode
app.post('/team-mode/two-vs-two/:id', async (req: Request, res: Response) => {
    // try {
    //     const user = await User.findOne({ _id: req.params.id })
    //     if (user) {
    //         user?.gameModes[0].teamMode.push({
    //             twoVStwo: [
    //                 {
    //                     course: req.body.course
    //                 }
    //             ]
    //         })
    //         await user.save();
    //         res.status(200).send(user);
    //     } else {
    //         res.status(404).send({ message: 'User not found' });
    //     }

    // } catch (error: any) {
    //     res.status(500).send({ message: error.message });
    //     console.log(error);
    // }
})


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
// listener

app.listen(3000, () => {
    console.log(`The application is listening on ${port}!`);
})