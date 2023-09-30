import config from "../../../../config.js";
import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";


let { order } = config;

const { pending, accept } = order;

const acceptOrderById = async (req, res) => {
    try {

        let user = req.user;
        let { order_id } = req.body;
        let order = await Orders.findOne({ order_id: order_id, driver_id: user._id });
        if (!order) {
            return res.status(400).json({ status: false, msg: `Order not found with this id:${order_id}, for driver:${user.user_id}` });
        };
        if (order.order_status !== pending) {
            return res.status(400).json({ status: false, msg: `Ony order's can be accepted when your customer initially creates and order!` });
        }
        order.order_status = accept;
        order.driver_order_status = accept;
        await order.save();

        return res.status(200).json({ msg: `Congrates ${user.name} you have successfuly accepted the order!`, status: true });

    } catch (error) {
        let response = handleError(error);
        console.log(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export default acceptOrderById;