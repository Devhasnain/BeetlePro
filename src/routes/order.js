import express from "express";
import withMethodGuard from "../middlewares/withMethodGuard.js";
import driverApiGuard from '../middlewares/drivers/apiGuard.js';
import driverCancelOrder from '../controllers/order/driver/cancelOrder.js';
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
import pickedUpOrder from "../controllers/order/driver/pickedUpOrder.js";
import getOrderStatus from "../controllers/order/customers/getOrderStatus.js";
import getAllDrivers from "../controllers/order/getAllDrivers.js";
import scheduleOrder from "../controllers/order/customers/scheduleOrder.js";
import getDriverPendingOrders from "../controllers/order/driver/getPendingOrders.js";
import getCustomerPendingOrders from "../controllers/order/driver/getPendingOrders.js";
import getOrderByTrackingId from "../controllers/order/getOrderByTrackingId.js";


let { SUPPORTEDGETMETHOD, SUPPORTEDMETHOD, driversCollection, usersCollection } = config;

const router = express.Router();

router.get('/get-all-drivers', getAllDrivers); // get drivers list  done
router.get('/get-all-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getUserOrders);   // get user orders  done
router.get('/get/:id', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrderById); //get order by id  done
router.get('/get-canceled-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersCanceled(usersCollection));  // get customer canceled orders
router.get('/get-completed-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersCompleted(usersCollection)); // get customer completed orders
router.post('/create', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, CreateOrder);  // create order  done
router.post('/schedule-order', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, scheduleOrder);
router.post('/cancel-user-order', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, customerCancelOrder);  // cancel order
router.get('/get-order-status/:order_id', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrderStatus);   // get order status  done
router.post('/complete-order-by-user', withMethodGuard(SUPPORTEDMETHOD), customerapiGuard, completeUserOrderById);  // complete order by user  done
router.get('/get-inprogress-customer-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getOrdersInProgress(usersCollection)); // customer inprogress orders
router.get('/new-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getNewOrders);  // new driver orders  done
router.post('/accept-order-by-rider', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, acceptOrderById); // accept order > driver  done
router.post('/picked-up-order-by-rider', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, pickedUpOrder); // pick up > driver  done
router.post('/driver-order-complete-api', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, completeOrderById); // deliver order > driver  done
router.post('/cancel-driver-order', withMethodGuard(SUPPORTEDMETHOD), driverApiGuard, driverCancelOrder); // cancel order > driver
router.get('/get-inprogress-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersInProgress(driversCollection)); // inprogress driver orders
router.get('/get-completed-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersCompleted(driversCollection));  // get driver completed orders
router.get('/get-canceled-driver-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getOrdersCanceled(driversCollection)); // canceled driver orders
router.get('/get-driver-pending-orders', withMethodGuard(SUPPORTEDGETMETHOD), driverApiGuard, getDriverPendingOrders);
router.get('/get-customer-pending-orders', withMethodGuard(SUPPORTEDGETMETHOD), customerapiGuard, getCustomerPendingOrders);
router.get('/get-order-by-tracking-id', customerapiGuard, getOrderByTrackingId);

export default router;