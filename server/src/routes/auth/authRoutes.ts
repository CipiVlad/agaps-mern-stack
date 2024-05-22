import express from 'express';
const router = express.Router();
import { createUser, getAllUsers, loginUser, handleLogout, deleteAllUsers } from '../../controllers/auth/authController';
import { handleRefreshToken } from '../../controllers/auth/refreshController';

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/refresh', handleRefreshToken)
router.get('/logout', handleLogout)
router.get('/users', getAllUsers);
router.delete('/users', deleteAllUsers);

export default router;