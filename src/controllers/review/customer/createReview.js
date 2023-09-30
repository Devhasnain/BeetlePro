import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';
import Reviews from "../../../database/models/Review.js";
import Drivers from "../../../database/models/Driver.js";
import calculateTotalRating from "../../../utils/getTotalRating.js";

let { order } = config;

let { completed } = order;

const createReview = async (req, res) => {

    try {

        let user = req.user;

        const { order_id, rating, text, driver_id } = req.body;

        let driver = await Drivers.findOne({ user_id: driver_id });

        if (!driver) {
            return res.status(404).json({ msg: `Driver not found with this id:${driver_id}!` });
        }

        let order = await Orders.findOne({
            order_id,
            sender_id: user._id,
            driver_id: driver._id
        });

        if (!order) {
            return res.status(404).json({ msg: `Order not found!` });
        }

        if (order.order_status !== completed) {
            return res.status(400).json({ msg: `The order hasn't been completed! You can't add review to this order!` });
        }

        let review = await Reviews.findOne({ order_id: order._id });

        if (review) {
            return res.status(400).json({ msg: "You already have added review to this order!" });
        }

        let createReview = await Reviews.create({
            userRef: user_id,
            order_id: order._id,
            driver_id: driver._id,
            rating,
            text
        });

        let saveReview = await createReview.save();

        if (driver?.reviews?.length) {

            let driverReviews = [...driver?.reviews, saveReview];

            let total_ratings = calculateTotalRating(driverReviews);

            // driver.reviews = 

            // await Drivers.findByIdAndUpdate({ _id: driver._id }, { $push: { reviews: [saveReview._id] }, $set: { total_ratings } }, { new: true })

        }

        let driverReviews = await Reviews.find({});

        let total_ratings = calculateTotalRating(driverReviews);

        await Drivers.findByIdAndUpdate({ _id: driver._id }, { $set: { reviews: [saveReview._id], total_ratings } }, { new: true });

        return res.status(200).json({ msg: "Your Review was successfuly added!" })

    } catch (error) {
        console.log(error)
        const response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

export default createReview;