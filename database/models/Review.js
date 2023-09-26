const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function () {
            if (this.isDriver) {
                return 'Driver';
            } else {
                return 'User';
            }
        },
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    rating: { type: Number },
    text: { type: String }

},
    {
        timestamps: true
    }

);

const Reviews = mongoose.models.Review || mongoose.model("Review", ReviewsSchema);
module.exports = Reviews;