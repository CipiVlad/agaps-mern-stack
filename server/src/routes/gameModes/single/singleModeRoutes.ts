import express from 'express';
import { addSingleMode, getSingleMode } from '../../../controllers/gameModes/single/singleModeControllers';

const router = express.Router();
router
    .get('/:id', getSingleMode)
    .post('/:id', addSingleMode);
export default router