import express from 'express';
import { addPeer, addTeam, getPeers } from '../../controllers/peers/peerControllers';

const router = express.Router();
//get peerName and teamName
router
    .get('/peer/:id', getPeers)
//add peerName 
router
    .post('/peer/:id', addPeer)
//add teamName
router
    .post('/team/:id', addTeam)


export default router