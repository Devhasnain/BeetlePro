import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../config.js';

let { order, sender_order_status } = config;

const getNewOrders = async (req, res) => {
    try {

        let user = req.user;

        let newOrders = await Orders.find({ driver_id: user._id, order_status: order.pending, sender_order_status: sender_order_status.active });

        return res.status(200).json(newOrders);

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

export default getNewOrders;