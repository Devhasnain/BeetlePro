const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    driver: {
        driver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
        },
        rating: { type: Number },
        text: { type: String }
    },
    customer: {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: { type: Number },
        text: { type: String }
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

},
    {
        timestamps: true
    }

);

const Reviews = mongoose.models.Review || mongoose.model("Review", ReviewsSchema);
module.exports = Reviews;