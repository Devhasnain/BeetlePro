import Orders from "../../database/models/Order.js";
import handleError from "../../utils/ReturnError.js";

const getUserOrders = async (req, res) => {
    try {
        let user = req.user;
        let sender_id = user._id;
        let orders = await Orders.find({ sender_id });
        return res.status(200).json({ orders, status: true });

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export default getUserOrders;