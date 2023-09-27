import express from 'express';
import apiGuardCustomers from '../middlewares/customers/apiGuard.js';
import createReview from '../controllers/review/customer/createReview.js';

const router = express.Router();

// customer 
router.post('/customer-write-review', createReview);


export default router;