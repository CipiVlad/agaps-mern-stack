import exporess from 'express';
import { getAllUsers } from '../controllers/authController';

const router = exporess.Router();


router.route('/')
    .get(getAllUsers)

export default router;