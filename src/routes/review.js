import express from 'express';
import {CustomerCreateReview} from '../controllers/review/customer.js'
import {DriverCreateReview} from '../controllers/review/driver.js'
import { customersApiGuard } from '../middlewares/customer.js';
import { drivresApiGuard } from '../middlewares/driver.js';

const router = express.Router();

router.post('/customer-write-review', customersApiGuard, CustomerCreateReview);
router.post('/driver-write-review', drivresApiGuard, DriverCreateReview);


export default router;