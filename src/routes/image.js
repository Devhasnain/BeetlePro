import { Router } from 'express';
import serveImage from '../controllers/files/serveImage.js';
const router = Router();

router.get('/server/:id', serveImage);

export default router;