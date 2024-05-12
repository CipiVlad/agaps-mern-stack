"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const db_1 = __importDefault(require("./config/db"));
const User_1 = __importDefault(require("./models/User"));
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 3000 || process.env.PORT;
(0, db_1.default)();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// +----------------------------------------+
// |              AUTH ROUTES               |
// +----------------------------------------+
// // create a user
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSignUpObject = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const createNewUser = yield User_1.default.create(newSignUpObject);
        res.status(200).send(createNewUser);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}));
// // login a user
// app.post('/login', async (req: Request, res: Response) => {
//     try {
//         const loginObject = {
//             username: req.body.username,
//             password: req.body.password
//         }
//         const loginUser = await User.findOne({ username: loginObject.username })
//         if (loginUser) {
//             if (loginUser.password === loginObject.password) {
//                 res.status(200).send(loginUser)
//             }
//         } else {
//             res.status(404).send({ message: 'User not found' })
//         }
//     } catch (error: any) {
//         res.status(500).send({ message: error.message })
//         console.log(error);
//     }
// })
// listener
app.listen(3000, () => {
    console.log(`The application is listening on ${port}!`);
});
