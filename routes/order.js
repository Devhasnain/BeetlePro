const express = require("express");
const withMethodGuard = require("../middlewares/withMethodGuard");
// driver functions 
const driverApiGuard = require('../middlewares/drivers/apiGuard');

// customer functions 
const apiGuard = require("../middlewares/customers/apiGuard");

const CreateOrder = require("../controllers/order/createOrder");
const getOrderById = require("../controllers/order/getOrderById");
const getUserOrders = require("../controllers/order/getUserOrders");
const { SUPPORTEDGETMETHOD, SUPPORTEDMETHOD, driversCollection, usersCollection } = require("../config");
const acceptOrderById = require("../controllers/order/driver/acceptOrderById");
const completeOrderById = require("../controllers/order/driver/completeOrderById");
const getOrdersInProgress = require("../controllers/order/getOrdersInProgress");
const getOrdersCanceled = require("../controllers/order/getOrdersCanceled");
const getOrdersCompleted = require("../controllers/order/getOrdersCompleteted");

const router = express.Router();

// order get routes 
router.get('/get', withMethodGuard(SUPPORTEDGETMETHOD), apiGuard, getUserOrders);
router.get('/get/:id', withMethodGuard(SUPPORTEDGETMETHOD), apiGuard, getOrderById);


// order post routes 

// customers 
router.post('/create', withMethodGuard(SUPPORTEDMETHOD), apiGuard, CreateOrder);
router.get('/get-inprogress-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), apiGuard, getOrdersInProgress(usersCollection));
router.get('/get-canceled-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), apiGuard, getOrdersCanceled(usersCollection));
router.get('/get-completed-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), apiGuard, getOrdersCompleted(usersCollection));


// drivers 
router.post('/accept-order-by-rider', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, acceptOrderById);
router.post('/driver-order-complete-api', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, completeOrderById);
router.get('/get-inprogress-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersInProgress(driversCollection));




module.exports = router;