const { HttpStatusCodes, order } = require("../../config");
const Drivers = require("../../database/models/Driver");
const Orders = require("../../database/models/Order");
const { v4: uuidv4 } = require('uuid');


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
            order_status: order.pending
        });

        await createOrder.save();

        return res.status(200).json({ msg: "Order Create Successfuly" })

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" });
    }
};

module.exports = CreateOrder;