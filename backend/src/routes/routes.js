import { Router } from 'express';
import { healthCheck, convertedAmount, deleteRecord , getHistory} from '../controller/controller.js';

const router = Router();

router.get('/', healthCheck);
router.post('/convert', convertedAmount);
router.delete('/delete/:id', deleteRecord);
router.get('/history', getHistory);


export default router;
