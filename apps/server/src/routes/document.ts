import { uploadDocument } from '../controller/uploadDocument';
import { documentTalk } from '../controller/documentTalk';
import { Router } from 'express';
import { listDocuments } from '../controller/listDocuments';

const router: Router = Router();

router.post('/upload', uploadDocument);
router.post('/talk', documentTalk);
router.get('/list', listDocuments);

export default router;
