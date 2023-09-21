const { HttpStatusCodes, driversCollection, usersCollection } = require("../../config");
const Drivers = require("../../database/models/Driver");
const Users = require("../../database/models/User");

const getUserData = (collection) => {
    return async (req, res) => {
        try {

            let { user_id } = req.params;

            if (!user_id) {
                return res.status(400).json({ msg: "Provide a user id to get the user data!" });
            }

            if (collection === driversCollection) {
                let user = await Drivers.findOne({ user_id }).select('-password');
                if (!user) {
                    return res.status(404).json({ msg: "User not found" })
                }
                return res.status(200).json(user);
            }

            if (collection === usersCollection) {
                let user = await Users.findOne({ user_id }).select('-password');
                if (!user) {
                    return res.status(404).json({ msg: "User not found" })
                }
                return res.status(200).json(user);
            }


        } catch (error) {
            return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Interanal Server Error" })
        }
    }
};

module.exports = getUserData;