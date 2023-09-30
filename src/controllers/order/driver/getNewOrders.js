import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';

let { order } = config;
let { pending, accept } = order;

const getNewOrders = async (req, res) => {
    try {
        let user = req.user;
        let newOrders = await Orders.find({
            driver_id: user._id,
            order_status: pending,
            sender_order_status: accept
        });
        return res.status(200).json({ orders: newOrders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default getNewOrders;