const connectToDatabase = require('../../database/DBconnection');
const Drivers = require('../../database/models/Driver');
const Users = require('../../database/models/User');

const GetUsers = async (req, res) => {
    try {

        if (req.method !== 'GET') {
            return res.status(400).json({ msg: "Method Not Allowed" })
        }

        await connectToDatabase();

        let customers = await Users.find().select('-password');
        let drivers = await Drivers.find().select('-password');

        return res.status(200).json({customers,drivers});

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server error" })
    }
};

module.exports = GetUsers;