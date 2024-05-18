import express from 'express';
import { addStrokePlay } from '../../../controllers/gameModes/team/twoVStwoControllers';

const router = express.Router();

router
    .route('/stroke-play/:id')
    .post(addStrokePlay)

router.
    route('/match-play/:id')

router.
    route('/combo-play/:id')

export default router