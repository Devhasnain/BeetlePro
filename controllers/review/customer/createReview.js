const Orders = require("../../../database/models/Order");
const handleError = require("../../../utils/ReturnError");
const { order } = require('../../../config');
const Reviews = require("../../../database/models/Review");
const { delivered } = order;

const createReview = async (req, res) => {

    try {

        // const { order_id, driver_id } = req.body;
        // let user = req.user;

        // let order = await Orders.findOne({ order_id, sender_id: user._id, driver_id });

        // if (!order) {
        //     return res.status(404).json({ msg: "Order not found!" });
        // };

        // if (order.order_status !== delivered) {
        //     return res.status(400).json({ msg: "Order has not yet been delivered!" });
        // }

        const { driver_id, user_id, order_id } = req.body;

        let review = await Reviews.findOne(
            {
                $and: [
                    { "driver.driver_id": driver_id },
                    { "customer.customer_id": user_id },
                    { "order_id": order_id }
                ]
            }
        );

        if(review){
            
        }

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