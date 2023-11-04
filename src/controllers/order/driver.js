import config from "../../../config.js";
import Drivers from "../../models/Driver.js";
import Orders from "../../models/Order.js";
import handleError from "../../utils/ReturnError.js";

let { order_status } = config;

export const DriverAcceptOrderById = async (req, res) => {
    try {

        let user = req.user;
        let { order_id } = req.body;
        let order = await Orders.findOne({ order_id: order_id, driver_id: user._id });
        if (!order) {
            return res.status(400).json({ status: false, msg: `Order not found with this id:${order_id}, for driver:${user.user_id}` });
        };
        if (order.order_status !== order_status.active) {
            return res.status(400).json({ status: false, msg: `Only order's can be accepted when your customer initially creates an order!` });
        }
        order.flag = 1;
        await order.save();


        return res.status(200).json({ msg: `Congrates ${user.name} you have successfuly accepted the order!`, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const DriverPickUpOrderById = async (req, res) => {
    try {

        let user = req.user;

        const { order_id } = req.body;

        let getorder = await Orders.findOne({ order_id, driver_id: user._id });

        if (!getorder) {
            return res.status(404).json({ msg: "Order not found", status: false });
        };

        if (getorder.order_status !== order_status.active) {
            if (getorder.order_status === order_status.picked_up) {
                return res.status(400).json({ msg: "Order has already been picked up!", status: false });
            } else if (getorder.order_status === order_status.delivered) {
                return res.status(400).json({ msg: "Order has been already delivered", status: false });
            } else if (getorder.order_status === order_status.completed) {
                return res.status(400).json({ msg: "Order has been completed", status: false });
            } else {
                return res.status(400).json({ msg: "The order can't be picked up at this time, Please contact customer care,", status: false });
            }
        }
        let status_analytics = [...getorder.status_analytics, { status: order_status.picked_up }]
        getorder.order_status = order_status.picked_up;
        getorder.status_analytics = status_analytics;
        await getorder.save();


        return res.status(200).json({ msg: "Order Picked up successfuly", status: true })

    } catch (error) {
        let respose = handleError(error);
        return res.status(respose.statusCode).json({ msg: respose.body, status: false });
    }
};

export const DriverDeliverOrderById = async (req, res) => {
    try {
        let user = req.user;
        let { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({ msg: "Bad request! Specify order id to update order status.", status: false });
        }
        let order = await Orders.findOne({ order_id, driver_id: user._id });
        if (!order) {
            return res.status(404).json({ msg: `Order not found with this id:${order_id}, for driver:${user.user_id}`, status: false });
        };
        if (order.order_status === order_status.delivered) {
            return res.status(400).json({ msg: `Order has already been delivered!`, status: false });
        }
        if (order.order_status !== order_status.picked_up) {
            return res.status(400).json({ msg: `Can't deliver an order before pickup!`, status: false });
        }

        let status_analytics = [...order.status_analytics, { status: order_status.delivered }]

        order.order_status = order_status.delivered;
        order.status_analytics = status_analytics;
        await order.save();

        return res.status(200).json({ msg: `Congrates ${user.name} you have successfuly delivered the order!`, status: true });


    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

let driver_info_fields = [
    'image',
    'name',
    'user_phone',
    'user_id',
    '_id',
    'total_ratings',
    'completed_orders',
    'createdAt',
    'vehicle_type',
    'vehicle_reg_number',
    'member_since',
];
export const GetDriverInfoById = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "Provide required data to get the driver data" });
        }

        let driver = await Drivers.findOne({ _id: id }).select(driver_info_fields).lean().exec();

        if (!driver) {
            return res.status(404).json({ msg: "Driver not found", status: false });
        }

        return res.status(200).json({ driver: { ...driver }, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let order_fields = [
    'sender_name',
    'sender_phonenumber',
    'order_subtotal_price',
    'recievercompleteaddress',
    'sender_address',
    'weight',
    'itemtype',
    'pickup_location',
    'dropofflocation',
    'tracking_id',
    'order_id',
    'sender_id',
    'driver_id',
];

export const getDriverNewOrders = async (req, res) => {
    try {
        let user = req.user;
        let newOrders = await Orders.find({
            driver_id: user._id,
            order_status: order_status.active,
            flag: 0
        }).select(order_fields);
        return res.status(200).json({ orders: newOrders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let comp_order_status_arr = [order_status.delivered, order_status.completed];
let comp_order_fields = [
    "tracking_id",
    "sender_address",
    "sender_phonenumber",
    "order_id",
    "itemtype",
    "deliverytype",
    "createdAt",
    "order_status",
    "order_subtotal_price",
    "dropofflocation",
    "pickup_location"
];

export const GetDriverCompletedOrders = async (req, res) => {
    try {
        let user = req.user;
        let orders = await Orders.find({ driver_id: user._id, order_status: { $in: comp_order_status_arr } }).select(comp_order_fields);
        return res.status(200).json({ orders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let inpro_order_status_arr = [order_status.active, order_status.picked_up];
let inpro_order_fields = [
    "tracking_id",
    "sender_address",
    "sender_phonenumber",
    "order_id",
    "itemtype",
    "deliverytype",
    "createdAt",
    "order_status",
    "order_subtotal_price",
    "dropofflocation",
    "pickup_location"
];

export const GetDriverInProgressOrders = async (req, res) => {
    try {
        let user = req.user;
        let orders = await Orders.find({ driver_id: user._id, order_status: { $in: inpro_order_status_arr } }).select(inpro_order_fields);
        return res.status(200).json({ orders, status: true });
    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};


let driver_profile_fields = [
    'order_id',
    'tracking_id',
    'createdAt',
    'itemtype',
    'order_subtotal_price',
    'order_status',
]
export const GetDriverProfile = async (req, res) => {
    try {
        let user = req.user;

        let orders = await Orders.find({ driver_id: user._id, order_status: config.order_status.completed }).select(driver_profile_fields);

        let balance = 0;
        for (let i = 0; i < orders?.length; i++) {
            balance += orders[i].order_subtotal_price
        }

        return res.status(200).json({ orders, user: { name: user.name, balance, email: user.email }, status: true })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
}