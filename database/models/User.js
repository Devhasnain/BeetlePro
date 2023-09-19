const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String },
    password: { type: String, required: true },
    role_type: { type: String, required: true },
    id: { type: mongoose.Types.ObjectId }
},
    {
        timestamps: true
    }

);

const Users = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = Users;