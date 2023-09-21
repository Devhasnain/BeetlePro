const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role_type: { type: String, required: true },
    id: { type: mongoose.Types.ObjectId },
    image: { type: String },
    user_phone: { type: String },
    user_city: { type: String },
    user_state: { type: String },
    signup_type: { type: String },
    user_country: { type: String },
    user_verification: { type: String },
    user_status: { type: String },
    flags: { type: String }
},
    {
        timestamps: true
    }

);

const Users = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = Users;