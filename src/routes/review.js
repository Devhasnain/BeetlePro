import express from 'express';
import apiGuardCustomers from '../middlewares/customers/apiGuard.js';
import createReview from '../controllers/review/customer/createReview.js';

const router = express.Router();

router.post('/customer-review-write', apiGuardCustomers, createReview);

export default router;