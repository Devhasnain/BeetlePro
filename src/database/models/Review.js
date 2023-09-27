import mongoose from "mongoose";
const ReviewsSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    rating: { type: Number },
    text: { type: String },
},
    {
        timestamps: true
    }

);

const Reviews = mongoose.models.Review || mongoose.model("Review", ReviewsSchema);
export default Reviews;