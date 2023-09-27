import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';
import Reviews from "../../../database/models/Review.js";
import Drivers from "../../../database/models/Driver.js";
import calculateTotalRating from "../../../utils/getTotalRating.js";

let { order } = config;

let { delivered } = order;

const createReview = async (req, res) => {

    try {

        let user = req.user;

        const { order_id, rating, text, driver_id } = req.body;

        let driver = await Drivers.findOne({ user_id: driver_id });

        if (!driver) {
            return res.status(404).json({ msg: `Driver connected to this order not found!` });
        }

        let order = await Orders.findOne({ order_id, sender_id: user._id, driver_id: driver._id });

        if (!order) {
            return res.status(404).json({ msg: `Order not found!` });
        }

        if (order.order_status !== delivered) {
            return res.status(400).json({ msg: `You can't write a review for this order ${order_id}, Or hasn't been delivered!` });
        }

        let review = await Reviews.find({ order_id: order._id, userRef: user._id, driver_id: driver._id });

        if (review.length) {
            return res.status(400).json({ msg: "You already have added review to this order!" });
        }

        let createReview = await Reviews.create({
            userRef: user._id,
            order_id: order._id,
            driver_id: driver._id,
            rating,
            text
        });

        let saveReview = await createReview.save();

        if (!saveReview) {
            return res.status(400).json({ msg: `Some error occured on the server, Unable to write a review for order:${order_id}` });
        }

        let driverReviews = await Reviews.find({ driver_id: driver._id });

        let driverTotalRatings = calculateTotalRating(driverReviews);

        let reviews = [...driverReviews, saveReview];

        await Drivers.findOneAndUpdate({ driver_id }, { $set: { reviews, total_ratings: driverTotalRatings } })

        return res.status(200).json({ msg: "Your Review was successfuly added!" })

    } catch (error) {
        console.log(error)
        const response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

export default createReview;