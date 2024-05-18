import exporess from 'express';
const router = exporess.Router();
import { createUser, getAllUsers } from '../../controllers/auth/authController';

router.post('/signup', createUser);
router.get('/users', getAllUsers);

export default router;