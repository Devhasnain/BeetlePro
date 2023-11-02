import jwt from "jsonwebtoken";
import Users from '../models/User.js'
import handleError from '../utils/ReturnError.js'
import config from "../../config.js";
import Drivers from "../models/Driver.js";
import OTP_Email from "../models/OtpEmail.js";

let { roles } = config;


export const customersApiGuard = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            return res.status(400).json({ msg: "Authentication faild!", status: false })
        };
        const { _id, email } = jwt.verify(token, process.env.JWT_SECRET);
        if (!_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }
        let user = await Users.findOne({ _id: _id }).select('-password').lean().exec();
        if (!user) {
            return res.status(404).json({ msg: "user not found", status: false })
        }
        req.user = user;
        next();

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const checkEmailCustomers = async (req, res, next) => {
    try {

        const { email, role_type } = req.body;
        email?.trim();
        let checkIfEmailinDrivers = await Drivers.findOne({ email });
        let checkIfEmailinCutomers = await Users.findOne({ email });

        if (checkIfEmailinCutomers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        }

        if (checkIfEmailinDrivers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        }

        let role = roles.find((item) => item.id === role_type);

        if (!role) {
            return res.status(404).json({ msg: `Role didn't found with id:${role_type}`, status: false })
        }

        req.user = req.body;
        req.user.role_type = role.id;
        next()

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const VerifyTokenCustomers = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            next();
            return;
        }

        let { _id, email } = jwt.verify(token, process.env.JWT_SECRET);

        if (!_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }

        let user = await Users.findOne({ _id: _id }).select('-password').lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "user not found", status: false })
        }

        return res.status(200).json({ ...user, token, status: true });

    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false })

    }
};

export const checkExistingUserWithEmail = async (req, res, next) => {
    try {
        let { email } = req.body;

        if (!email) {
            next();
            return;
        }
        email?.trim();
        let checkIfEmailinDrivers = await Drivers.findOne({ email });
        let checkIfEmailinCutomers = await Users.findOne({ email });

        if (checkIfEmailinCutomers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        }

        if (checkIfEmailinDrivers) {
            return res.status(400).json({ msg: "User already exists with this email!", status: false })
        }
        next();
    } catch (error) {
        let resposne = HandleError(error);
        return res.status(resposne.statusCode).json({ resposne, status: false });
    }
};

export const IsMailOtpSentToCustomer = async (req, res, next) => {
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