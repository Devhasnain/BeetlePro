const express = require("express");
const withMethodGuard = require("../middlewares/withMethodGuard");
const apiGuard = require("../middlewares/customers/apiGuard");
const CreateOrder = require("../controllers/order/createOrder");
const router = express.Router();


router.get('/orders', withMethodGuard);
router.post('/create', withMethodGuard, apiGuard, CreateOrder);




module.exports = router;