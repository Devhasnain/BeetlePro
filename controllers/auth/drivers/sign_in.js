const zod = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const Drivers = require('../../../database/models/Driver');

const extractField = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'user_image'];

const requestBodyValidation = zod.object({
    email: zod.string().email().min(13),
    password: zod.string().min(8),
})

const SignIn = async (req, res) => {
    try {

        const requestBody = await requestBodyValidation.safeParseAsync(req.body);

        if (!requestBody.success) {
            return res.status(401).json({ msg: requestBody.error })
        }

        const { email, password } = requestBody.data;

        let user = await Drivers.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: `User not found with this email ${email}` })
        }

        let matchPassword = await bcrypt.compare(password, user?.password ?? "");

        if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched!" });
        }

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        let userdata = _.pick(user, extractField);

        return res.status(200).json({ ...userdata, token })

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = SignIn;