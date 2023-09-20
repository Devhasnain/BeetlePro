const mongoose = require("mongoose");

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
    role_type: { type: String, required: true },
    id: { type: mongoose.Types.ObjectId }
},
    {
        timestamps: true
    }

);

const Drivers = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
module.exports = Drivers;