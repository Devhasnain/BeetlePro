import config from "../../../../config.js";
import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";

let { order } = config;

const { delivered, picked_up } = order;

const completeOrderById = async (req, res) => {
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
        if (order.order_status === delivered) {
            return res.status(400).json({ msg: `Order has already been delivered!`, status: false });
        }
        if (order.order_status !== picked_up) {
            return res.status(400).json({ msg: `Can't deliver an order before pickup!`, status: false });
        }

        order.driver_order_status = delivered;
        order.order_status = delivered;
        await order.save();

        return res.status(200).json({ msg: `Congrates ${user.name} you have successfuly accepted the order!`, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export default completeOrderById;