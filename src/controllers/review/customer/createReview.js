import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../../config.js';
import Reviews from "../../../database/models/Review.js";
import Drivers from "../../../database/models/Driver.js";
// import calculateTotalRating from "../../../utils/getTotalRating.js";


const createReview = async (req, res) => {

    try {
        let user = req.user;

        let { order_id, text, rating } = req.body;

        let order = await Orders.findOne({ order_id });


        if (!order) {
            return res.status(404).json({ msg: "Order not found!" });
        };

        let driver = await Drivers.findOne({ _id: order.driver_id });

        if (!driver) {
            return res.status(404).json({ msg: "Driver not found!" });
        }

        let findReviewIfExists = await Reviews.findOne({ userRef: user._id, order_id: order._id });

        if (findReviewIfExists) {
            return res.status(400).json({ msg: "You already have added review to this order!", status: false });
        };

        if (order.order_status !== config.order.completed) {
            return res.status(400).json({ msg: "Order hasn't yet been completed", status: false })
        }

        let review = await Reviews.create(
            {
                userRef: { id: user._id, ...user },
                orderRef: order._id,
                driverRef: { id: driver._id, ...driver },
                text,
                rating
            });
        await review.save();

        return res.status(200).json({ msg: "Review added successfuly" })

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default createReview;