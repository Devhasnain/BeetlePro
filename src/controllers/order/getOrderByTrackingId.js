import Orders from "../../database/models/Order.js";
import handleError from "../../utils/ReturnError.js";
import config from '../../../config.js';
import Drivers from "../../database/models/Driver.js";

const getOrderByTrackingId = async (req, res) => {
    try {

        let user = req.user;

        let { tracking_id } = req.body;

        if (!tracking_id) {
            return res.status(400).json({ msg: "Please provide order tracking id to get the order status", status: false })
        }

        let order = await Orders.findOne({ tracking_id, sender_id: user._id });

        if (order.order_status === config.order.completed) {
            return res.status(200).json({ msg: "The order has been completed!", status: true });
        }

        let driver = await Drivers.findOne({ _id: order?.driver_id }).select("-password");

        return res.status(200).json({ order, driver, status: true })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default getOrderByTrackingId;