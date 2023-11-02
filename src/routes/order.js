import express from "express";
import { drivresApiGuard } from '../middlewares/driver.js';
import {
    CreateOrder,
    GetUserInfoById,
    UserCompleteOrderById,
    GetUserCompletedOrders,
    GetUserInProgressOrders,
    GetUserOrderByTrackId,
    GetUserOrderDataByTracking,
    getAllDrivers,
    getAllUserOrders
} from "../controllers/order/customer.js";
import { customersApiGuard } from "../middlewares/customer.js";
import {
    DriverAcceptOrderById,
    DriverDeliverOrderById,
    DriverPickUpOrderById,
    GetDriverInfoById,
    GetDriverCompletedOrders,
    GetDriverInProgressOrders,
    getDriverNewOrders,
    GetDriverProfile
} from "../controllers/order/driver.js";

const router = express.Router();

router.post('/create', customersApiGuard, CreateOrder);  // create order  done
router.get('/get-inprogress-customer-orders', customersApiGuard, GetUserInProgressOrders); // customer inprogress orders

router.post('/complete-order-by-user', customersApiGuard, UserCompleteOrderById);  // complete order by user  done
router.get('/get-completed-customer-orders', customersApiGuard, GetUserCompletedOrders); // get customer completed orders

router.get('/new-driver-orders', drivresApiGuard, getDriverNewOrders);  // new driver orders  done

router.post('/accept-order-by-rider', drivresApiGuard, DriverAcceptOrderById); // accept order > driver  done
router.post('/picked-up-order-by-rider', drivresApiGuard, DriverPickUpOrderById); // pick up > driver  done

router.get('/get-driver-inprogress-orders', drivresApiGuard, GetDriverInProgressOrders);

router.post('/driver-order-complete-api', drivresApiGuard, DriverDeliverOrderById); // deliver order > driver  done
router.get('/get-driver-completed-orders', drivresApiGuard, GetDriverCompletedOrders);

router.get('/get-order-by-tracking-id/:tracking_id', customersApiGuard, GetUserOrderByTrackId); // done
router.get('/get-order-data-by-tracking-id/:tracking_id', customersApiGuard, GetUserOrderDataByTracking); // done

router.get('/get-driver-info/:id', GetDriverInfoById);  //done
router.get('/get-customer-info/:id', GetUserInfoById);  //done

router.get('/get-all-drivers', getAllDrivers); //done drivers list

router.get('/get-all-orders', customersApiGuard, getAllUserOrders);   // get user orders  done


router.get('/driver-profile', drivresApiGuard, GetDriverProfile);

export default router;