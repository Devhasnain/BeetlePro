const Drivers = require('../../database/models/Driver');

const GetUsers = async (req, res) => {
    try {

        if (req.method !== 'GET') {
            return res.status(400).json({ msg: "Method Not Allowed" })
        }

        let users = await Drivers.find().select('-password');

        return res.status(200).json(users);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server error" })
    }
};

module.exports = GetUsers;