import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';

let { order, driver_order_status } = config;

let { delivered, cancel } = order;

const cancelOrder = async (req, res) => {
    try {

        let user = req.user;
        let { order_id, driver_order_cancellation_reason } = req.body;

        let order = await Orders.findOne({ order_id, driver_id: user._id });

        if (!order) {
            return res.status(404).json({ msg: `Order not found with this id:${order_id}` });
        }

        if (order.order_status === delivered) {
            return res.status(400).json({ msg: `Bad request: Order:${order_id} has already been delivered!` });
        }

        if (order.sender_order_status === cancel) {
            return res.status(200).json({ msg: `Order:${order_id} has already been canceled by the customer`, reason: `${order.sender_order_cancellation_reason}` });
        }

        if (order?.driver_order_status === cancel) {
            return res.status(200).json({ msg: `Order:${order_id} has already been canceled!`, reason: `${order.driver_order_cancellation_reason}` });
        }

        if (order.order_status === cancel) {
            return res.status(400).json({ msg: `Bad request: Order:${order_id} has already been canceled!` });
        }

        await Orders.findByIdAndUpdate({ _id: order._id }, {
            $set:
            {
                order_status: cancel,
                driver_order_status: driver_order_status.canceled,
                driver_order_cancellation_reason: driver_order_cancellation_reason ?? "No cancellation reason provided!"
            }
        })

        return res.status(200).json({ msg: `Order:${order_id} has been canceled successfuly.` })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

export default cancelOrder;