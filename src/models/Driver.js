import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    vehicle_type: { type: String },
    model_number: { type: String },
    vehicle_color: { type: String },
    vehicle_reg_number: { type: String },
    driver_license: { type: String },
    driver_gray_front: { type: String },
    driver_gray_back: { type: String },
    driver_insurance_front: { type: String },
    driver_insurance_back: { type: String },
    driver_other_document: { type: String },
    signup_type: { type: String },
    password: { type: String, required: true },
    user_phone: { type: String },
    user_city: { type: String },
    user_state: { type: String },
    user_country: { type: String },
    user_verification: { type: String },
    user_address: { type: String },
    flags: { type: String },
    active: { type: Boolean },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    role_type: { type: Number, required: true },
    user_id: { type: String },
    total_ratings: { type: Number },
    member_since: { type: Date, default: Date.now },
    reviews: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
            rating: { type: Number },
            text: { type: String }
        }],
    number_of_orders: { type: Number },
    completed_orders: { type: Number },
    canceled_orders: { type: Number },
    image: { type: String },
    last_logged_in: { type: Date, default: Date.now }
},
    {
        timestamps: true
    }

);

const Drivers = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
export default Drivers