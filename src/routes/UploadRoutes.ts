import express from 'express';
import controller from '../controllers/UploadController';

const router = express.Router();

router.post('/file', controller.storeFile);

export default router;