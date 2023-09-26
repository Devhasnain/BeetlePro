const connectToDatabase = require('../../database/DBconnection');
const Users = require('../../database/models/User');

const GetUsers = async (req, res) => {
    try {

        if (req.method !== 'GET') {
            return res.status(400).json({ msg: "Method Not Allowed" })
        }

        await connectToDatabase();

        let users = await Users.find().select('-password');

        return res.status(200).json(users);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server error" })
    }
};

module.exports = GetUsers;