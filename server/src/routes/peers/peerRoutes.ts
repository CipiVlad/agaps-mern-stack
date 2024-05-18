import express from 'express';
import { addPeer, addTeam } from '../../controllers/peers/peerControllers';

const router = express.Router();
router
    .route('/peer/:id')
    .post(addPeer)

router
    .route('/team/:id')
    .post(addTeam)


export default router