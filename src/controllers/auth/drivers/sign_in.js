import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Drivers from '../../../database/models/Driver.js';

const extractField = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'user_image'];

const requestBodyValidation = zod.object({
    email: zod.string().email().min(13),
    password: zod.string().min(8),
})

const SignIn = async (req, res) => {
    try {

        const requestBody = await requestBodyValidation.safeParseAsync(req.body);

        if (!requestBody.success) {
            return res.status(401).json({ msg: requestBody.error, status: false })
        }

        const { email, password } = requestBody.data;

        let user = await Drivers.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: `User not found with this email ${email}`, status: false })
        }

        let matchPassword = await bcrypt.compare(password, user?.password ?? "");

        if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched!", status: false });
        }

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);

        let userdata = _.pick(user, extractField);

        return res.status(200).json({ ...userdata, token, status: true })

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error', status: false })
    }
};

export default SignIn;