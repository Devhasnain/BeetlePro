const express = require('express');
const apiGuard = require('../middlewares/customers/apiGuard');
const createReview = require('../controllers/review/customer/createReview');

const router = express.Router();

router.post('/customer/write', createReview);

module.exports = router;