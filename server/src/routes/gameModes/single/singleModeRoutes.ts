import express from 'express';
import { addSingleMode } from '../../../controllers/gameModes/single/singleModeControllers';

const router = express.Router();
router
    .post('/:id', addSingleMode);
export default router