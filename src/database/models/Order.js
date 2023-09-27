import mongoose from "mongoose";
const OrdersSchema = new mongoose.Schema({
    tracking_code: { type: String },
    item_type: { type: String },
    item_value: { type: String },
    item_description: { type: String },
    order_type: { type: String },
    image: { type: String },
    order_type_categories: { type: String },
    package_weight: { type: String },
    package_size: { type: String },
    package_instructions: { type: String },
    order_pickup_day: { type: String },
    order_pickup_time: { type: String },
    order_dropoff_day: { type: String },
    order_dropoff_time: { type: String },
    order_pickup_location: { type: String },
    order_dropoff_location: { type: String },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sender_order_status: { type: String },
    sender_order_cancellation_reason: { type: String },
    sender_name: { type: String },
    sender_address: { type: String },
    sender_phonenumber: { type: String },
    receiver_name: { type: String },
    receiver_address: { type: String },
    receiver_phonenumber: { type: String },
    receiver_description: { type: String },
    order_estimated_price: { type: String },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
    driver_quotation: { type: String },
    driver_order_status: { type: String },
    driver_order_cancellation_reason: { type: String },
    order_shipping_assurance: { type: String },
    order_subtotal_price: { type: String },
    order_status: { type: String },
    order_id: { type: String },
    payment_status: { type: String },
    payment_response: { type: String },

},
    {
        timestamps: true
    }

);

const Orders = mongoose.models.Order || mongoose.model("Order", OrdersSchema);
export default Orders



