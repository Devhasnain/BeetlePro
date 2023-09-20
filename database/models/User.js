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
    image: { type: String }
},
    {
        timestamps: true
    }

);

const Users = mongoose.models.User || mongoose.model("User", UsersSchema);
module.exports = Users;