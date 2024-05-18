import express from 'express';
import twoVStwo from './team/twoVStwoRoutes'
import singleScrambleRoutes from './team/singleScrambleRoutes'

const router = express.Router();
router.use('/two-vs-two/', twoVStwo)
router.use('/single-scramble/', singleScrambleRoutes)


export default router