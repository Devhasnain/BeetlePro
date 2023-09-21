const express = require("express");
const withMethodGuard = require("../middlewares/withMethodGuard");
const apiGuard = require("../middlewares/customers/apiGuard");
const CreateOrder = require("../controllers/order/createOrder");
const getOrderById = require("../controllers/order/getOrderById");
const getUserOrders = require("../controllers/order/getUserOrders");
const router = express.Router();

// order get routes 
router.get('/get', withMethodGuard, apiGuard, getUserOrders);
router.get('/get/:id', withMethodGuard, apiGuard, getOrderById);

router.post('/create', withMethodGuard, apiGuard, CreateOrder);





module.exports = router;