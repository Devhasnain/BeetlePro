import bcrypt from 'bcrypt';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Drivers from '../../../database/models/Driver.js';

const extractField = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'user_image'];

const SignUp = async (req, res) => {
    try {

        let userData = req.user;

        let password = await bcrypt.hash(userData.password, 12);

        let user_id = uuidv4();

        let newUser = {
            ...userData,
            password,
            user_id,
            role_type: userData.role_type,
        }

        let registerUser = await Drivers.create(newUser);

        let savedUser = await registerUser.save();

        if (!savedUser) {
            return res.status(400).json({ msg: "Unknow error occured while registeration, please try again!", status: false });
        }

        let user = _.pick(savedUser, extractField);

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '5h' });

        return res.status(200).json({ ...user, token, status: true });

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error', status: false })
    }
};

export default SignUp;