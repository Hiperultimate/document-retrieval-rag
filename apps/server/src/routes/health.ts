import { healthCheck } from '../controller/healthCheck';
import { Router } from 'express';

const router: Router = Router();

router.get('/', healthCheck);

export default router;
