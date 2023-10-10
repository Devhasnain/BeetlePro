import mongoose from "mongoose";
const OrdersSchema = new mongoose.Schema({
    itemcount: { type: String },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sendercity: { type: String },
    senderpostalcode: { type: String },
    senderhouseno: { type: String },
    receivercity: { type: String },
    recieverpostalcode: { type: String },
    recieverhouseno: { type: String },
    recieverfullname: { type: String },
    recieverphonenum: { type: String },
    recievercompleteaddress: { type: String },
    itemtype: { type: String },
    deliverytype: { type: String },
    weight: { type: String },
    order_pickup_location: { type: String },
    order_pickup_lat: { type: String },
    order_pickup_lng: { type: String },
    dropofflocation: { type: String },
    dropofflat: { type: String },
    dropofflng: { type: String },
    sender_order_status: { type: String },
    sender_order_cancellation_reason: { type: String },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
    driver_order_status: { type: String },
    order_status: { type: String },
    order_id: { type: String },
    scheduled_time: { type: Number }
},
    {
        timestamps: true
    }

);

const Orders = mongoose.models.Order || mongoose.model("Order", OrdersSchema);
export default Orders



