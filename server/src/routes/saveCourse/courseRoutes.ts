import express from 'express';
import { saveCourse, getSavedCourses } from '../../controllers/saveCourse/courseController';

const router = express.Router();


router.post('/save-new-course/:id', saveCourse);
router.get('/:id', getSavedCourses);

export default router;

