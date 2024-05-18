import express from 'express';
import { addSingleScramble } from '../../../controllers/gameModes/team/singleScrambleControllers';

const router = express.Router();

router
    .route('/:id')
    .post(addSingleScramble)



export default router