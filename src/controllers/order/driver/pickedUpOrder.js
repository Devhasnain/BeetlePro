import Orders from "../../../database/models/Order.js";
import handleError from "../../../utils/ReturnError.js"
import config from "../../../../config.js";

const { order } = config;

const pickedUpOrder = async (req, res) => {
    try {

        let user = req.user;

        const { order_id } = req.body;

        let getorder = await Orders.findOne({ order_id, driver_id: user._id });

        if (!getorder) {
            return res.status(404).json({ msg: "Order not found", status: false });
        };

        if (getorder.order_status !== order.accept) {
            return res.status(400).json({ msg: "Bad request", status: false });
        }

        getorder.order_status = order.picked_up;
        await getorder.save();

        return res.status(200).json({ msg: "Order Picked up successfuly", status: true })

    } catch (error) {
        let respose = handleError(error);
        return res.status(respose.statusCode).json({ msg: respose.body, status: false });
    }
};

export default pickedUpOrder;