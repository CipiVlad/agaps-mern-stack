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
    try {
        const newSignUpObject = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const newUser = new User(newSignUpObject)
        const savedUser = await newUser.save()
        res.status(200).send(savedUser)
    } catch (error: any) {
        res.status(500).send({ message: error.message })
        console.log(error);
    }
})


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
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (user) {
            user.savedCourses = [...user.savedCourses, req.body]
            await user.save();
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message })
        console.log(error);
    }
})

// grep user by id and copy singleMode to User.gameModes
app.post('/single-mode/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            // Create a new singleMode object with all the fields from the request body
            const newSingleMode = {
                course: req.body.course,
                agaps: req.body.agaps
            };

            // Push the new singleMode object to the singleMode array
            user.gameModes[0].singleMode.push(newSingleMode);
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
// add new peer

// ...

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