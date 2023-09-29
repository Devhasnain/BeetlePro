import express from 'express';
import saveFaqs from '../controllers/public/saveFaqs';
import getFaqs from '../controllers/public/getFaqs';
import getFaqById from '../controllers/public/getFaqById';
// import ServeImage from '../controllers/public/ServeImage';
const router = express.Router();

// router.get('/image/:id', ServeImage);
router.get('/get-faqs', getFaqs);
router.post('/save-faqs', saveFaqs);
router.get('/get-faq-by-id/:id', getFaqById);
router.post('/update-faq-by-id/:id', getFaqById);


export default router;