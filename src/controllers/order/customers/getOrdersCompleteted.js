import Orders from "../../../models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';
import _ from 'lodash';

let { order } = config;

const getOrdersCompleted = async (req, res) => {
    try {
        let user = req.user;
        let orders = await Orders.find({ sender_id: user._id });
      
        if (orders.length < 1) {
            return res.status(200).json({ orders: [], status: true })
        }

        let filter_orders = [];

        for (let i = 0; i < orders?.length; i++) {
            if (orders[i].order_status === order.completed) {
                let data = _.pick(orders[i], [
                    "tracking_id",
                    "order_id",
                    "itemtype",
                    "deliverytype",
                    "createdAt",
                    "order_status",
                    "order_subtotal_price",
                    "dropofflocation"
                ])
                filter_orders.push(data);
            }
        }

        return res.status(200).json({ orders: filter_orders, status: true });

    } catch (error) {
        console.log(error)
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default getOrdersCompleted;