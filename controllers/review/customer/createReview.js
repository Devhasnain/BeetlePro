import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../config.js';
import Reviews from "../../../database/models/Review.js";

let { order } = config;

let { delivered } = order;

const createReview = async (req, res) => {

    try {

        // let user = req.user;

        // let order = await Orders.findOne({ order_id, sender_id: user._id, driver_id });

        // if (!order) {
        //     return res.status(404).json({ msg: "Order not found!" });
        // };

        // if (order.order_status !== delivered) {
        //     return res.status(400).json({ msg: "Order has not yet been delivered!" });
        // }

        let id = ''

        const { order_id } = req.body;

        let order = await Orders.findOne({ order_id });

        // let getReviewByUserId = await Reviews.findOne({ userRef: "user db obj id will come here", order_id });

        if (!order) {
            return res.status(404).json({ msg: `Order:${order_id} not found!` });
        }

        if (order.order_status !== delivered) {
            return res.status(400).json({ msg: `You can't write a review for this order ${order_id}` });
        }

        if (order?.sender_order_review_id) {
            return res.status(404).json({ msg: `You already have added you'r review to this order! ${order_id}` });
        }

        let createReview = await Reviews.create({
            userRef: 'user id will come here',
            order_id: 'order_id will come here',
        });

        let saveReview = await createReview.save();

        if (!saveReview) {
            return res.status(400).json({ msg: `Some error occured on the server, Unable to write a review for order:${order_id}` });
        }

        let updateOrderReview = await Orders.findOneAndUpdate({ order_id }, { $set: { sender_order_review_id: saveReview._id } });

        // let review = await Reviews.create({
        //     driver: {
        //         driver_id,
        //         rating: 5,
        //         text: "testing review"
        //     },
        //     customer: {
        //         customer_id: user_id,
        //         rating: 5,
        //         text: "testing review"
        //     },
        //     order_id
        // });

        // await review.save();

        return res.status(200).json({ review })

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

module.exports = createReview;