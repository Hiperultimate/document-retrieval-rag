import { healthCheck } from '../controller/healthCheck';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', healthCheck);

export default router;
