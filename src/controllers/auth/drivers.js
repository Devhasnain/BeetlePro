import bcrypt from 'bcrypt';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Drivers from '../../models/Driver.js';
import Files from '../../models/File.js';
import config from '../../../config.js';
import handleError from '../../utils/ReturnError.js';
import OTP_Email from '../../models/OtpEmail.js';
import transporter from '../../utils/emails/EmailSender.js';

const extractField = ['name', 'email', 'user_phone', 'role_type', '_id', 'createdAt', 'updatedAt', 'user_id', 'image'];
export const SignUpDriver = async (req, res) => {
    try {
        let file = req?.file;
        let userData = req.user;
        let password = await bcrypt.hash(userData.password.trim(), 12);
        let user_id = uuidv4();
        let newUser = {
            email: userData.email.trim(),
            ...userData,
            password,
            user_id,
            role_type: userData.role_type,
        }
        let registerUser = await Drivers.create(newUser);
        if (file) {
            let uploadImage = await Files.create({ user: registerUser._id, ...file });
            registerUser.image = `${config.domain}/auth/driver/image/${uploadImage._id}}`;
            await registerUser.save();
        }

        let user = _.pick(registerUser, extractField);
        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json(
            {
                ...user, token,
                status: true
            });


    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};

export const SignInDriver = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Bad request! Provide login credentails to login", status: false })
        }
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
        let resposne = handleError(error);
        return res.status(resposne.statusCode).json({ msg: resposne.body, status: false })
    }
};

export const UploadDriverDocs = async (req, res) => {
    try {
        let user = req.user;
        let id = user._id;
        const files = req.files;
        if (!files.length) {
            return res.status(401).json({ msg: "select files complete onboarding", status: false });
        }
        files.forEach(async (element) => {
            let uploadFile = await Files.create({
                ...element,
                isDriver: true,
                user: id
            });
            let fieldname = element.fieldname;
            let imageURL = `${config.domain}/auth/driver/image/${uploadFile._id}`;
            await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: imageURL } }, { new: true });
        });
        return res.status(200).json({ msg: "Files have been uploaded!", status: true })
    } catch (error) {
        let response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const generateOtpDriver = async (req, res) => {
    try {
        let { email } = req.body

        let user = await Drivers.findOne({ email });

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

export const verifyOtpDriver = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let user = await Drivers.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided email", status: false });
        }

        if (!otp) {
            return res.status(400).json({ msg: "Bad request", status: false })
        }

        let otpRecord = await OTP_Email.findOne({ user: user._id, otp });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP', status: false });
        }

        if (otpRecord.expiry < new Date()) {
            await OTP_Email.findOneAndDelete({ _id: otpRecord._id });
            return res.status(400).json({ message: 'OTP has expired', status: false });
        }

        await OTP_Email.findOneAndDelete({ _id: otpRecord._id });

        return res.status(200).json({ msg: "Otp verified successfuly", status: true })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};

export const resetPasswordDriver = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await Drivers.findOne({ email });
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

export const UpdateDriverCurrentPassword = async (req, res) => {
    try {
        let user = req.user;
        let { password, newPassword } = req.body;
        let driver = await Drivers.findOne({ _id: user._id });
        let matchPassword = await bcrypt.compare(password, driver.password);

        if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched!", status: false });
        }

        let hash = await bcrypt.hash(newPassword, 12);

        driver.password = hash;
        await driver.save();
        return res.status(200).json({ msg: "Password updated successfuly!", status: true });

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
}