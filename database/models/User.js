const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    signup_type: { type: String },
    password: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_city: { type: String },
    user_state: { type: String },
    user_country: { type: String },
    user_verification: { type: String },
    flags: { type: String, },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_type: { type: String, required: true },
    id: { type: mongoose.Types.ObjectId },
    active: { type: Boolean },
    address: { type: String },
    device_token: { type: String },
    otp_id: { type: String },
    signup_type: { type: String },
    user_image: { type: String },
    user_id: { type: String }
},
    {
        timestamps: true
    }

);

const Users = mongoose.models.User || mongoose.model("User", UsersSchema);
module.exports = Users;