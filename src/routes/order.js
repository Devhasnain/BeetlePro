import express from "express";
import withMethodGuard from "../middlewares/withMethodGuard.js";
// driver functions 
import driverApiGuard from '../middlewares/drivers/apiGuard.js';
import driverCancelOrder from '../controllers/order/driver/cancelOrder.js';

// customer functions 
import customerapiGuard from "../middlewares/customers/apiGuard.js";
import customerCancelOrder from '../controllers/order/customers/cancelOrder.js';
import completeUserOrderById from "../controllers/order/customers/completeOrder.js";


import CreateOrder from "../controllers/order/createOrder.js";
import getOrderById from "../controllers/order/getOrderById.js";
import getUserOrders from "../controllers/order/getUserOrders.js";
import config from "../../config.js";
import acceptOrderById from "../controllers/order/driver/acceptOrderById.js";
import completeOrderById from "../controllers/order/driver/completeOrderById.js";
import getOrdersInProgress from "../controllers/order/getOrdersInProgress.js";
import getOrdersCanceled from "../controllers/order/getOrdersCanceled.js";
import getOrdersCompleted from "../controllers/order/getOrdersCompleteted.js";
import getNewOrders from "../controllers/order/driver/getNewOrders.js";

let { SUPPORTEDGETMETHOD, SUPPORTEDMETHOD, driversCollection, usersCollection } = config;

const router = express.Router();

// order get routes 
router.get('/get', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getUserOrders);
router.get('/get/:id', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrderById);


// order post routes 

// customers get routes
router.get('/get-inprogress-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersInProgress(usersCollection));
router.get('/get-canceled-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersCanceled(usersCollection));
router.get('/get-completed-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersCompleted(usersCollection));

// customers post routes 
router.post('/create', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, CreateOrder);
router.post('/cancel-user-order', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, customerCancelOrder);
router.post('/complete-user-order', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, completeUserOrderById);


// drivers get routes
router.get('/get-inprogress-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersInProgress(driversCollection));
router.get('/new-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getNewOrders);
router.get('/get-completed-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersCompleted(driversCollection));
router.get('/get-canceled-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersCanceled(driversCollection));

// drivers post routes 
router.post('/accept-order-by-rider', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, acceptOrderById);
router.post('/driver-order-complete-api', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, completeOrderById);
router.post('/cancel-driver-order', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, driverCancelOrder);



export default router;