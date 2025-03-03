import { Router } from 'express';
import { healthCheck, ConvertedAmount, deleteRecord } from '../controller/controller.js';

const router = Router();

router.get('/', healthCheck);
router.post('/convert', ConvertedAmount);
router.delete('/delete/:id', deleteRecord);


export default router;
