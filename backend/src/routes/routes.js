import { Router } from 'express';
import { healthCheck, ConvertedAmount } from '../controller/controller.js';

const router = Router();

router.get('/', healthCheck);
router.post('/convert', ConvertedAmount);


export default router;
