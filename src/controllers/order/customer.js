import config from "../../../config.js";
import Drivers from "../../models/Driver.js";
import Orders from "../../models/Order.js";
import Users from "../../models/User.js";
import handleError from "../../utils/ReturnError.js";
import generateRandomId from "../../utils/generateRandomId.js";

let { order_status } = config;

export const CreateOrder = async (req, res) => {
    try {
        let user = req.user;
        let data = req.body;
        let driver = await Drivers.findOne({ user_id: data.driver_id });
        if (!driver) {
            return res.status(404).json({ msg: `Driver not found with this id:${data.driver_id}` });
        }
        let order_id = generateRandomId();
        let tracking_id = generateRandomId();
        await Orders.create({
            ...data,
            order_id,
            driver_id: driver._id,
            sender_id: user._id,
            order_status: order_status.active,
            status_analytics: [{ status: order_status.active }],
            tracking_id,
            flag: 0

        });
        let userOrders = user?.number_of_orders ? user.number_of_orders + 1 : 1;
        driver.number_of_orders = driver?.number_of_orders ? driver.number_of_orders + 1 : 1;
        await driver.save();
        await Users.findOneAndUpdate({ _id: user._id }, { $set: { number_of_orders: userOrders } });

        res.status(200).json({ msg: "Order Create Successfuly", status: true });

    } catch (error) {
        console.log(error)
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const UserCompleteOrderById = async (req, res) => {
    try {

        let user = req.user;

        let { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({ msg: "Bad request! Specify order id to update order status.", status: false });
        }

        let order = await Orders.findOne({ order_id: order_id, sender_id: user._id });

        if (!order) {
            return res.status(404).json({ msg: `Order not found with this id:${order_id}, for driver:${user.user_id}`, status: false });
        };

        let driver = await Drivers.findOne({ _id: order.driver_id });

        if (!driver) {
            return res.status(404).json({ msg: `Unable to find the driver connected to this order`, status: false });
        }

        if (order.order_status !== order_status.delivered) {
            if (order.order_status === order_status.completed) {
                return res.status(400).json({ msg: `Order has already been completed!`, status: false });
            } else {
                return res.status(400).json({ msg: `Order hasn't been delivered yet by the rider!`, status: false });
            }
        }

        let status_analytics = [...order.status_analytics, { status: order_status.completed }]

        order.order_status = order_status.completed;
        order.status_analytics = status_analytics;

        await order.save();

        let user_completed_orders = user.completed_orders ? user.completed_orders + 1 : 1;

        let driver_completed_orders = driver.completed_orders ? driver.completed_orders + 1 : 1;

        await Users.findOneAndUpdate({ _id: user._id }, {
            $set: {
                completed_orders: user_completed_orders
            }
        })

        await Drivers.findOneAndUpdate({ _id: driver._id }, {
            $set: {
                completed_orders: driver_completed_orders
            }
        });

        return res.status(200).json({ msg: `Order has been accepted`, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

let completed_order_status_arr = [order_status.delivered, order_status.completed];
let completed_order_fields = [
    "tracking_id",
    "order_id",
    "itemtype",
    "deliverytype",
    "createdAt",
    "order_status",
    "status_analytics",
    "order_subtotal_price",
    "driver_id",
    "dropofflocation"
]
export const GetUserCompletedOrders = async (req, res) => {
    try {
        let user = req.user;
        let orders = await Orders.find({ sender_id: user._id, order_status: { $in: completed_order_status_arr } }).select(completed_order_fields);

        return res.status(200).json({ orders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};


let inprogress_order_status_arr = [order_status.active, order_status.picked_up];
let inporogress_order_fields = [
    "tracking_id",
    "order_id",
    "itemtype",
    "deliverytype",
    "createdAt",
    "driver_id",
    "order_status",
    "status_analytics",
    "order_subtotal_price",
    "dropofflocation"
]
export const GetUserInProgressOrders = async (req, res) => {
    try {

        let user = req.user;

        let orders = await Orders.find({ sender_id: user._id, order_status: { $in: inprogress_order_status_arr } }).select(inporogress_order_fields);

        return res.status(200).json({ orders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};


let track_id_order_fields = [
    "itemtype",
    "order_id",
    "deliverytype",
    "tracking_id",
    "order_status",
    "status_analytics"
];
let track_id_order_driver_fields = [
    "image",
    "email",
    "name",
    "user_id",
    "user_phone",
    "user_address",
    "user_city",
    "user_country",
    "user_state"
]
export const GetUserOrderByTrackId = async (req, res) => {
    try {

        let user = req.user;

        let { tracking_id } = req.params;

        if (!tracking_id) {
            return res.status(400).json({ msg: "Please provide order tracking id to get the order status", status: false })
        }

        let order = await Orders.findOne({ tracking_id, sender_id: user._id }).select(track_id_order_fields);

        if (!order) {
            return res.status(404).json({ msg: "Order not found!", status: false })
        }

        if (order?.order_status === config.order.completed) {
            return res.status(200).json({ msg: "The order has been completed!", status: true });
        }

        let driver = await Drivers.findOne({ _id: order?.driver_id }).select(track_id_order_driver_fields);

        return res.status(200).json({ order, driver, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let order_data_fields = [
    "itemtype",
    "order_id",
    "deliverytype",
    "tracking_id",
    "order_status",
    "createdAt",
    "order_subtotal_price",
    "status_analytics"
]
export const GetUserOrderDataByTracking = async (req, res) => {
    try {

        let user = req.user;

        let { tracking_id } = req.params;

        if (!tracking_id) {
            return res.status(400).json({ msg: "Please provide order tracking id to get the order status", status: false })
        }

        let order = await Orders.findOne({ tracking_id, sender_id: user._id }).select(order_data_fields);

        if (!order) {
            return res.status(404).json({ msg: "Order not found!", status: false })
        }

        if (order?.order_status !== config.order_status.completed) {
            return res.status(400).json({ msg: "The order hasn't been completed!", status: false });
        }

        return res.status(200).json({
            order,
            status: true
        })

    } catch (error) {
        console.log(error)
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};


let user_info_fields = [
    'user_image',
    'name',
    'user_phone',
    'user_id',
    '_id',
    'total_ratings',
    'completed_orders',
    'createdAt',
    'member_since',
]

export const GetUserInfoById = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "Provide required data to get the driver data" });
        }

        let user = await Users.findOne({ _id: id }).select(user_info_fields).lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "Driver not found", status: false });
        }

        return res.status(200).json({
            user: {
                ...user,
            }, status: true
        });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let driver_fields = [
    'user_address',
    'user',
    "name",
    "total_ratings",
    "email",
    "user_id",
    "_id",
    "user_phone",
    "vehicle_type",
    "vehicle_reg_number",
    "vehicle_color",
    'model_number',
    "completed_orders",
];
export const getAllDrivers = async (req, res) => {
    try {
        let drivers = await Drivers.find().select(driver_fields);
        return res.status(200).json({ drivers, status: true });
    } catch (error) {
        const response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

let all_order_fields = [
    'itemtype',
    'package_size',
    'package_instructions',
    'order_shipping_assurance',
    'sender_name',
    'order_status',
    'recieverfullname',
    'recieverphonenum',
    'recievercompleteaddress',
    'order_id',
    'createdAt',
    'order_subtotal_price',
    'driver_id',
    'tracking_id',
    'order_dropoff_location',
    'order_pickup_day',
    'status_analytics',
    '_id'
];

let all_order_driver_fields = [
    'image',
    'user_phone',
    'name',
    'email',
    'user_address',
    'user_city',
    'user_country',
    'user_state',
    'completed_orders',
    'vehicle_reg_number',
    'total_ratings'
]

export const getAllUserOrders = async (req, res) => {
    try {
        let user = req.user;
        let sender_id = user._id;
        let orders = await Orders.find({ sender_id }).select(all_order_fields).lean().exec();

        if (orders.length < 1) {
            return res.status(200).json({ orders: [], status: true });
        }

        let orders_with_driver_details = [];

        for (let i = 0; i < orders.length; i++) {
            let driver = await Drivers.findOne({ _id: orders[i].driver_id }).select(all_order_driver_fields).lean().exec();
            let driver_address = driver.user_address ? driver?.user_address : `${driver.user_city} ${driver.user_state} ${driver.user_country}`;
            let data = {
                ...orders[i],
                driver: { ...driver, driver_address: driver_address ? driver_address : "Driver address is missing" }
            }
            orders_with_driver_details.push(data);
        }

        return res.status(200).json({ orders: orders_with_driver_details, status: true });

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};