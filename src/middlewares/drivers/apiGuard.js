import config from '../../../config.js';
import jwt from "jsonwebtoken";
import Drivers from '../../database/models/Driver.js';

const { HttpStatusCodes } = config;
const apiGuard = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            return res.status(400).json({ msg: "Authentication faild!", status: false })
        };

        const { exp, _id, email } = jwt.verify(token, process.env.JWT_SECRET);

        if (!exp || !_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (exp <= currentTime) {
            destroyCookie(req, 'token');
            return res.status(401).json({ msg: 'Token has expired', status: false });
        }

        let user = await Drivers.findOne({ _id }).select('-password').lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "Authentication faild, User not found", status: false })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error", status: false })
    }
};

export default apiGuard;
