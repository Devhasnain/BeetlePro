import config from "../../../config.js";
import Orders from "../../database/models/Order.js";

let  { HttpStatusCodes } = config;

const getOrderById = async (req, res) => {
    try {

        const { id } = req.params;
        const user = req.user;

        if (!id) {
            return res.status(400).json({ msg: "Bad request" });
        }

        let order = await Orders.findOne({ _id: id });

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        return res.status(200).json(order);

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" });
    }
};

export default getOrderById;