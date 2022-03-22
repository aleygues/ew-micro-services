import { Router } from 'express';
import { readOne } from '../controllers/applications';

const router = Router();

router.get('/:id', readOne);

export default router; 