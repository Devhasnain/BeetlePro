const Orders = require("../../database/models/Order");
const handleError = require("../../utils/ReturnError")
const { order, driversCollection, usersCollection } = require('../../config');

const getOrdersCompleted = (collection) => {
    return async (req, res) => {
        try {

            let user = req.user;

            if (collection === usersCollection) {

                let orders = await Orders.find({ order_status: order.delivered, sender_id: user._id });
                return res.status(200).json(orders);
            }

            if (collection === driversCollection) {

                let orders = await Orders.find({ order_status: order.delivered, driver_id: user._id });
                return res.status(200).json(orders);

            }


        } catch (error) {
            let response = handleError(error);
            return res.status(response.statusCode).json(response.body);
        }
    };
};

module.exports = getOrdersCompleted;