import config from "../../../config.js";
import Orders from "../../../database/models/Order.js";

let { HttpStatusCodes, order } = config;

const { accept, delivered, cancel } = order;

const completeOrderById = async (req, res) => {
    try {

        let user = req.user;

        let { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({ msg: "Bad request! Specify order id to update order status." });
        }

        let order = await Orders.findOne({ order_id: order_id, driver_id: user._id });

        if (!order) {
            return res.status(404).json({ msg: `Order not found with this id:${order_id}, for driver:${user.user_id}` });
        };

        if (order.order_status === cancel) {
            return res.status(400).json({ msg: `Order ${order.order_id} has been canceled` });
        }

        if (order.order_status !== accept) {
            return res.status(400).json({ msg: `Order ${order.order_id} is not yet accepted!` });
        }

        if (order.order_status === delivered) {
            return res.status(400).json({ msg: `Order ${order.order_id} has already been delivered!` });
        }

        await Orders.findOneAndUpdate({ _id: order._id }, { $set: { driver_order_status: delivered } }, { new: true });

        return res.status(200).json({ msg: `Congrates ${user.name} you have successfuly accepted the order!` });

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

export default completeOrderById;