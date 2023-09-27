import Orders from "../../../database/models/Order.js";
import config from '../../../../config.js'

let { order } = config;

const getDeliveredOrdersByRider = async (req, res) => {
    try {

        let user = req.user;

        let orders = await Orders.findOne({ _id: user._id, driver_order_status: order.delivered });

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

export default getDeliveredOrdersByRider;