const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    vehicle_type: { type: String, required: true },
    vehicle_reg_number: { type: String, required: true },
    driver_license: { type: String, required: true },
    driver_gray_front: { type: String, required: true },
    driver_gray_back: { type: String, required: true },
    driver_insurance_front: { type: String, required: true },
    driver_insurance_back: { type: String, required: true },
    driver_other_document: { type: String, required: true },
    signup_type: { type: String, required: true },
    password: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_city: { type: String, required: true },
    user_state: { type: String, required: true },
    user_country: { type: String, required: true },
    user_verification: { type: String, required: true },
    flags: { type: String, required: true },
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