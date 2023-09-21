const bcrypt = require('bcrypt');
const _ = require("lodash");
const Users = require('../../../database/models/User');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const extractField = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'user_image'];

const SignUp = async (req, res) => {
    try {

        let userData = req.user;

        if (!userData) {
            throw new Error('Unknow error occured while registration, please try again!')
        };

        let password = await bcrypt.hash(userData.password, 12);

        let user_id = uuidv4();

        let newUser = {
            ...userData,
            password,
            user_id,
        }

        let registerUser = await Users.create(newUser);

        let savedUser = await registerUser.save();

        if (!savedUser) {
            return res.status(400).json({ msg: "Unknow error occured while registeration, please try again!" });
        }

        let user = _.pick(savedUser, extractField);

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ user, token });

    } catch (error) {
        console.log(error)
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = SignUp;