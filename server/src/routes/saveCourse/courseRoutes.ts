import express from 'express';
import { saveCourse } from '../../controllers/saveCourse/courseController';

const router = express.Router();


router.post('/:id', saveCourse);

export default router;

