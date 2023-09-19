const bcrypt = require('bcrypt');
const _ = require("lodash");
const connectToDatabase = require("../../../database/DBconnection");
const Users = require('../../../database/models/User');

const extractField = ['name', 'email', 'number', 'role_type', '_id', 'createdAt', 'updatedAt'];

const SignUp = async (req, res) => {
    try {

        let userData = req.user;

        if (!userData) {
            throw new Error('Unknow error occured while registration, please try again!')
        };

        let password = await bcrypt.hash(userData.password, 12);

        let newUser = {
            ...userData,
            password
        }

        await connectToDatabase();

        let registerUser = await Users.create(newUser);

        let savedUser = await registerUser.save();

        if (!savedUser) {
            return res.status(400).json({ msg: "Unknow error occured while registeration, please try again!" });
        }

        let user = _.pick(savedUser, extractField);

        return res.status(200).json(user);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = SignUp;