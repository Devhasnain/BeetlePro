import Users from "../../../models/User.js";
import handleError from "../../../utils/ReturnError.js";

let selectFields = ['image',
    'name',
    'user_phone',
    'user_id',
    '_id',
    'total_ratings',
    'completed_orders',
    'createdAt',
    'member_since',
]

const getCustomerInfo = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "Provide required data to get the driver data" });
        }

        let user = await Users.findOne({ _id: id }).select(selectFields).lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "Driver not found", status: false });
        }

        let member_since;

        if (!user.member_since) {
            let date = new Date(driver.createdAt);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let getdate = date.getDate();
            member_since = `${getdate}/${month}/${year}`;
        }

        return res.status(200).json({ driver: { ...user, member_since: user.member_since ? user.member_since : member_since }, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export default getCustomerInfo;