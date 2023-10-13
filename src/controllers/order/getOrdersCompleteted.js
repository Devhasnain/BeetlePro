import Orders from "../../database/models/Order.js";
import handleError from "../../utils/ReturnError.js";
import config from '../../../config.js';

let { order } = config;

const getOrdersCompleted = async (req, res) => {
    try {
        let user = req.user;
        let orders = await Orders.find({ sender_id: user._id });
        let filter_orders = orders.map((item) => {
            if (item.order_status === order.completed) {
                let data = _.pick(item, [
                    "tracking_id",
                    "order_id",
                    "itemtype",
                    "deliverytype",
                    "createdAt",
                    "order_status",
                    "order_subtotal_price",
                    "dropofflocation"
                ])
                return {
                    ...data
                }
            }
        });

        return res.status(200).json({ orders: filter_orders, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default getOrdersCompleted;