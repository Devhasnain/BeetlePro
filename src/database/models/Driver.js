import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    vehicle_type: { type: String },
    vehicle_reg_number: { type: String },
    driver_license: { type: String },
    driver_gray_front: { type: String },
    driver_gray_back: { type: String },
    driver_insurance_front: { type: String },
    driver_insurance_back: { type: String },
    driver_other_document: { type: String },
    signup_type: { type: String },
    password: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_city: { type: String },
    user_state: { type: String },
    user_country: { type: String },
    user_verification: { type: String },
    flags: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_type: { type: Number, required: true },
    id: { type: mongoose.Types.ObjectId },
    user_id: { type: String },
    total_ratings: { type: Number },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
},
    {
        timestamps: true
    }

);

const Drivers = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
export default Drivers