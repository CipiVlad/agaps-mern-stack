import express from 'express';
import { saveCourse, getSavedCourses, deleteSavedCourse } from '../../controllers/saveCourse/courseController';

const router = express.Router();


router.post('/save-new-course/:id', saveCourse);
router.get('/:id', getSavedCourses);
router.delete('/:id', deleteSavedCourse);

export default router;

