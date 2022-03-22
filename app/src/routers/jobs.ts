import { Router } from 'express';
import { create, readAll, readOne } from '../controllers/jobs';
import { create as createApplication } from '../controllers/applications';

import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({ destination: process.cwd() + '/uploads' })
});

const router = Router();

router.get('/', readAll);
router.get('/:id', readOne);
router.post('/', create);
router.post('/:id/applications', upload.single('resume'), createApplication);

export default router; 