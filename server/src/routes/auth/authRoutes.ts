import exporess from 'express';
const router = exporess.Router();
import { createUser, getAllUsers, loginUser, handleLogout } from '../../controllers/auth/authController';
import { handleRefreshToken } from '../../controllers/auth/refreshController';


router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/refresh', handleRefreshToken)
router.get('/logout', handleLogout)
router.get('/users', getAllUsers);

export default router;