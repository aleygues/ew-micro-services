import { Router } from 'express';
import { create, readAll, readOne } from '../controllers/jobs';

const router = Router();

router.get('/', readAll);
router.get('/:id', readOne);
router.post('/', create);

export default router; 