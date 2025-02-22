import { uploadDocument } from '../controller/uploadDocument';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/upload', uploadDocument);
// router.get('/document-talk', talk);

export default router;
