import config from "../../../config.js";
import Drivers from "../../database/models/Driver.js";
import Orders from "../../database/models/Order.js";
import { v4 as uuidv4 } from 'uuid';
import handleError from "../../utils/ReturnError.js";

let { order } = config;

const CreateOrder = async (req, res) => {
    try {

        let user = req.user;
        let data = req.body;
        let driver = await Drivers.findOne({ user_id: data.driver_id }).exec();
        if (!driver) {
            return res.status(404).json({ msg: `Driver not found with this id:${data.driver_id}` });
        }
        let order_id = uuidv4();
        let tracking_id = uuidv4();
        let createOrder = await Orders.create({
            ...data,
            order_id,
            driver_id: driver._id,
            sender_id: user._id,
            sender_order_status: order.accept,
            order_status: order.pending,
            tracking_id
        });
        await createOrder.save();
        return res.status(200).json({ msg: "Order Create Successfuly", status: true });
    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default CreateOrder;