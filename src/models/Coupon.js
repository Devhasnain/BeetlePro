import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    image: { type: String },
    username: { type: String },
    description: { type: String },
    expiry: { type: String },
    coupon_id: { type: String },
    sheduled_time: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "Admin" }
}, {
    timestamps: true
}
)

const Coupons = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

export default Coupons;
