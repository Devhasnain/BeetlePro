import config from "../../../config.js";
import Orders from "../../database/models/Order.js";

let { HttpStatusCodes } = config;

const getUserOrders = async (req, res) => {
    try {

        let user = req.user;

        let sender_id = user._id;

        let orders = await Orders.find({ sender_id });

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

export default getUserOrders;