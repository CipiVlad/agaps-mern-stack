import exporess from 'express';
const router = exporess.Router();
import { createUser, getAllUsers, loginUser, logoutUser } from '../../controllers/auth/authController';

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/users', getAllUsers);

export default router;