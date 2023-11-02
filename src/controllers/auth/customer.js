import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from 'lodash';
import Users from "../../models/User.js";
import { v4 as uuidv4 } from 'uuid';
import handleError from "../../utils/ReturnError.js";
import Files from "../../models/File.js";
import config from "../../../config.js";
import OTP_Email from "../../models/OtpEmail.js";
import transporter from "../../utils/emails/EmailSender.js";
import { stripe } from "../../utils/stripe.js";

const extractFields = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'user_image', 'customer_id'];
const supported_files = ['png', 'jpg', 'jpeg', 'svg'];
export const CustomerSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        email.trim();

        let user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: `User not found with this email ${email}`, status: false })
        }

        let matchPassword = await bcrypt.compare(password, user?.password ?? "");

        if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched!", status: false });
        }

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);

        let userdata = _.pick(user, extractFields);

        return res.status(200).json({ user: userdata, token, status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const CustomerSignUp = async (req, res) => {
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
            role_type: userData.role_type
        }

        let registerUser = await Users.create(newUser);

        let user = _.pick(registerUser, extractFields);

        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);

        return res.status(200).json({ user, token, status: true });

    } catch (error) {
        console.log(error)
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const UpdateCustomerProfile = async (req, res) => {
    try {
        let user = req.user;
        let userData = req.body ?? {};
        let profileImage = req?.file;
        let objectLength = Object?.keys(userData)?.length;

        if (objectLength < 1 && !profileImage) {
            return res.status(400).json({ msg: "Can't update profile with empty data!", status: false });
        }

        if (profileImage && !supported_files.includes(profileImage?.mimetype?.split("/")[1])) {
            return res.status(400).json({ msg: `File type "${profileImage?.mimetype?.split("/")[1]}" is not supported!`, status: false });
        }

        let User = await Users.findOne({ _id: user._id });

        if (profileImage) {
            if (User?.user_image) {
                await Files.findOneAndDelete({ user: user._id });
            }
            let uploadImage = await Files.create({ user: user._id, ...profileImage });
            User.user_image = `${config.domain}/auth/customer/image/${uploadImage._id}`;
            await User.save();
        }

        if (objectLength) {
            for (const key in userData) {
                if (key === "password") {
                    let hash = await bcrypt.hash(userData[key], 12);
                    User[key] = hash;
                    await User.save();
                } else {
                    User[key] = userData[key];
                    await User.save();
                }
            }
        }

        return res.status(200).json({ msg: "Profile Updated Successfuly!", status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
}

export const generateOtpCustomer = async (req, res) => {
    try {
        let { email } = req.body
        let user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found with this email!", status: false });
        };

        const existingCodes = [];
        function generateUniqueRandomCode(existingCodes) {
            let code;
            do {
                code = Math.floor(1000 + Math.random() * 9000);
            } while (existingCodes.includes(code));

            existingCodes.push(code);
            return code;
        }

        let otp = generateUniqueRandomCode(existingCodes);

        await OTP_Email.create({
            user: user._id,
            otp,
            expiry: new Date(Date.now() + 15 * 60 * 1000),
        });

        transporter.sendMail(
            {
                from: "BeetlePro",
                to: email,
                subject: "Password Reset OTP",
                text: `${user?.name ? user?.name : user?.email}, Your OTP for password reset is ${otp}`

            }
        ).catch((error) => {
            return res.status(500).json({ msg: "Unexpected error occured while sending email!", status: false });
        })
        return res.status(200).json({ msg: "An otp has been send to your email!", status: true })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const verifyOtpCustomer = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided email", status: false });
        }

        if (!otp) {
            return res.status(400).json({ msg: "Bad request", status: false })
        }

        let otpRecord = await OTP_Email.findOne({ user: user._id, otp });

        if (!otpRecord) {
            return res.status(400).json({ msg: 'Invalid OTP', status: false });
        }

        if (otpRecord.expiry < new Date()) {
            await OTP_Email.findOneAndDelete({ _id: otpRecord._id });
            return res.status(400).json({ msg: 'OTP has expired', status: false });
        }

        await OTP_Email.findOneAndDelete({ _id: otpRecord._id });

        return res.status(200).json({ msg: "Password reset sussessfuly", status: true })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const resetPasswordCustomer = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found", status: false });
        };
        let hash = await bcrypt.hash(password, 12);
        user.password = hash;
        await user.save();
        return res.status(200).json({ msg: "Password reset successfuly", status: true })
    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const UpdateCustomerCurrentPassword = async (req, res) => {
    try {
        let user = req.user;
        let { password, newPassword } = req.body;
        let customer = await Users.findOne({ _id: user._id });
        let matchPassword = await bcrypt.compare(password, customer.password);

        if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched!", status: false });
        }

        let hash = await bcrypt.hash(newPassword, 12);

        customer.password = hash;
        await customer.save();
        return res.status(200).json({ msg: "Password updated successfuly!", status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
}