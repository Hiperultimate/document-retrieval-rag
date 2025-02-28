import { uploadDocument } from '../controller/uploadDocument';
import { documentTalk } from '../controller/documentTalk';
import { Router } from 'express';
import { listDocuments } from '../controller/listDocuments';
import multer from 'multer';

const router: Router = Router();
const upload = multer();

router.post('/upload',upload.single('file'), uploadDocument);
router.post('/talk', documentTalk);
router.get('/list', listDocuments);

export default router;
