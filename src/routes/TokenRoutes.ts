import express from 'express';
import controller from '../controllers/TokenController';

const router = express.Router();

router.get('/', controller.getToken);

export default router;