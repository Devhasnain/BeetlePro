import Drivers from "../../database/models/Driver.js";
import Orders from "../../database/models/Order.js";
import handleError from "../../utils/ReturnError.js";

const getUserOrders = async (req, res) => {
    try {
        let user = req.user;
        let sender_id = user._id;
        let orders = await Orders.find({ sender_id }).select(['sender_name','order_status', 'order_id', 'createdAt', 'order_subtotal_price', 'driver_id', 'tracking_id', 'order_dropoff_location','order_pickup_day']).lean().exec();

        if (orders.length < 1) {
            return res.status(200).json({ orders: [], status: true });
        }

        let orders_with_driver_details = [];

        for (let i = 0; i < orders.length; i++) {
            let driver = await Drivers.findOne({ _id: orders[i].driver_id }).select(['image', 'user_phone', 'name', 'email']).lean().exec();
            let data = {
                ...orders[i],
                driver: driver
            }
            orders_with_driver_details.push(data);
        }

        return res.status(200).json({ orders: orders_with_driver_details, status: true });

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export default getUserOrders;