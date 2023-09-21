const { HttpStatusCodes } = require("../../config");
const Drivers = require("../../database/models/Driver");
const bcrypt = require("bcrypt");
const Users = require("../../database/models/User");
const { usersCollection, driversCollection } = require('../../config');

const resetPassword = (collection) => {
    return async (req, res) => {
        try {
            const { password, confirmpassword, user_id } = req.body;
            if (password !== confirmpassword) {
                return res.status(400).json({ msg: "Bad request" });
            }
            const hashPassword = await bcrypt.hash(password, 12);

            if (collection === driversCollection) {
                await Drivers.findOneAndUpdate({ user_id: user_id }, { $set: { password: hashPassword } });
                return res.status(200).json({ msg: "New password set successfuly" });
            }

            if (collection === usersCollection) {
                await Users.findOneAndUpdate({ user_id: user_id }, { $set: { password: hashPassword } });
                return res.status(200).json({ msg: "New password set successfuly" });
            }

        } catch (error) {
            return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Interanal Server Error" })
        }
    };
};

module.exports = resetPassword;