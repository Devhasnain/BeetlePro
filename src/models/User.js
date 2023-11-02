import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    signup_type: { type: String },
    password: { type: String, required: true },
    user_phone: { type: String },
    user_city: { type: String },
    user_state: { type: String },
    user_country: { type: String },
    user_verification: { type: String },
    flags: { type: String, },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    role_type: { type: Number, required: true },
    active: { type: Boolean },
    address: { type: String },
    device_token: { type: String },
    user_image: { type: String },
    user_id: { type: String },
    member_since: { type: String },
    total_ratings: { type: Number },
    reviews: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
            rating: { type: Number },
            text: { type: String }
        }],
    customer_id: { type: String },
    number_of_orders: { type: Number },
    completed_orders: { type: Number },
    canceled_orders: { type: Number }
},
    {
        timestamps: true
    }

);

const Users = mongoose.models.User || mongoose.model("User", UsersSchema);
export default Users