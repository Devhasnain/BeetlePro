import config from "../../config.js";
import Drivers from "../../database/models/Driver.js";
import Orders from "../../database/models/Order.js";
import { v4 as uuidv4 } from 'uuid';

let { HttpStatusCodes, order, sender_order_status } = config;

const CreateOrder = async (req, res) => {
    try {

        let user = req.user;
        let data = req.body;

        let driver = await Drivers.findOne({ user_id: data.driver_id }).exec();

        if (!driver) {
            return res.status(404).json({ msg: `Driver not found with this id:${data.driver_id}` });
        }

        let order_id = uuidv4();

        let createOrder = await Orders.create({
            ...data,
            order_id,
            driver_id: driver._id,
            sender_id: user._id,
            sender_order_status: sender_order_status.active,
            order_status: order.pending
        });

        await createOrder.save();

        return res.status(200).json({ msg: "Order Create Successfuly" })

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" });
    }
};

export default CreateOrder;