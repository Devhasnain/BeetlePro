const { HttpStatusCodes } = require("../../config");
const Orders = require("../../database/models/Order");

const CreateOrder = async (req, res) => {
    try {

        let user = req.user;
        let data = req.body;

        let createOrder = await Orders.create({
            ...data,
            driver_id: data.driver_id,
            sender_id: user._id
        });

        await createOrder.save();

        return res.status(200).json({ msg: "Order Create Successfuly" })

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" });
    }
};

module.exports = CreateOrder;