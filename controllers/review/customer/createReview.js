import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../config.js';
import Reviews from "../../../database/models/Review.js";

let { order } = config;

let { delivered } = order;

const createReview = async (req, res) => {

    try {

        let user = req.user;

        const { order_id, rating, text } = req.body;

        let order = await Orders.findOne({ order_id, sender_id: user._id });

        if (!order) {
            return res.status(404).json({ msg: `Order:${order_id} not found!` });
        }

        if (order.order_status !== delivered) {
            return res.status(400).json({ msg: `You can't write a review for this order ${order_id}, Or hasn't been delivered!` });
        }

        if (order?.sender_order_review_id) {
            return res.status(404).json({ msg: `You already have added you'r review to this order! ${order_id}` });
        }

        let createReview = await Reviews.create({
            isDriver: false,
            userRef: user._id,
            order_id: order._id,
            rating,
            text
        });

        let saveReview = await createReview.save();

        if (!saveReview) {
            return res.status(400).json({ msg: `Some error occured on the server, Unable to write a review for order:${order_id}` });
        }

        let updatedOrder = await Orders.findOneAndUpdate({ order_id }, { $set: { sender_order_review_id: saveReview._id } });

        return res.status(200).json({ updatedOrder })

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

module.exports = createReview;