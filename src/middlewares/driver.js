import jwt from "jsonwebtoken";
import Drivers from "../models/Driver.js";
import handleError from '../utils/ReturnError.js';
import config from "../../config.js";
import Users from "../models/User.js";
import OTP_Email from "../models/OtpEmail.js";

export const drivresApiGuard = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            return res.status(400).json({ msg: "Authentication faild!", status: false })
        };

        const { _id, email } = jwt.verify(token, config.JWT_SECRET);

        if (!_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }

        let user = await Drivers.findOne({ _id }).select('-password').lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "Authentication faild, User not found", status: false })
        }

        req.user = user;
        next();

    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const checkEmailDrivers = async (req, res, next) => {
    try {

        const { email, role_type } = req.body;

        if (!email || !role_type) {
            return res.status(401).json({ msg: `Provide valid data to signup`, status: false })
        }

        let checkIfEmailinCutomers = await Users.findOne({ email });

        if (checkIfEmailinCutomers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        };

        let checkIfEmailinDrivers = await Drivers.findOne({ email });

        if (checkIfEmailinDrivers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        };

        let role = config.roles.find((item) => item.id === Number(role_type));

        if (!role) {
            return res.status(404).json({ msg: `Role didn't found with id:${role_type}`, status: false })
        }

        req.user = req.body;
        req.user.role_type = role.id;
        next();

    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const VerifyTokenDrivers = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            next();
            return;
        }
        const { _id, email } = jwt.verify(token, config.JWT_SECRET);
        if (!_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }
        let user = await Drivers.findOne({ _id, email }).select('-password').lean().exec();
        if (!user) {
            return res.status(404).json({ msg: "user not found", status: false })
        }
        return res.status(200).json({ ...user, token, status: true });
    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const IsMailOtpSentToDriver = async (req, res, next) => {
    try {
        let { email } = req.body
        let user = await Drivers.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found with this email!", status: false });
        };
        let otp = await OTP_Email.findOne({ user: user._id });

        if (!otp) {
            next();
            return;
        }

        if (otp.expiry > new Date()) {
            return res.status(400).json({ msg: "An otp has already been sent to your phone number!.", status: false });
        }

        next();

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
}