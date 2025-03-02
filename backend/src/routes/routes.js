import { Router } from 'express';
import { healthCheck } from '../controller/controller.js';

const router = Router();

router.get('/', healthCheck);

export default router;
