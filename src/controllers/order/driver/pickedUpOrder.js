import Orders from "../../../models/Order.js";
import handleError from "../../../utils/ReturnError.js"
import config from "../../../../config.js";
import getDate from "../../../utils/getDate.js";

const { order_status } = config;

const pickedUpOrder = async (req, res) => {
    try {

        let user = req.user;

        const { order_id } = req.body;

        let getorder = await Orders.findOne({ order_id, driver_id: user._id });

        if (!getorder) {
            return res.status(404).json({ msg: "Order not found", status: false });
        };

        if (getorder.order_status !== order_status.active) {
            return res.status(400).json({ msg: "Bad request", status: false });
        }
        let time = getDate().toString();

        let status_analytics = [...getorder.status_analytics, { status: order_status.picked_up, time }]

        getorder.order_status = order_status.picked_up;
        getorder.status_analytics = status_analytics;
        await getorder.save();

        return res.status(200).json({ msg: "Order Picked up successfuly", status: true })

    } catch (error) {
        let respose = handleError(error);
        return res.status(respose.statusCode).json({ msg: respose.body, status: false });
    }
};

export default pickedUpOrder;