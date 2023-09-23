import config from '../../config.js';
import jwt from "jsonwebtoken";
import Users from '../../database/models/User.js';

let { HttpStatusCodes, roles } = config;

const apiGuard = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            return res.status(400).json({ msg: "Authentication faild!" })
        };

        const { exp, _id, email } = jwt.verify(token, process.env.JWT_SECRET);

        if (!exp || !_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!" });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (exp <= currentTime) {
            destroyCookie(req, 'token');
            return res.status(401).json({ message: 'Token has expired' });
        }

        let user = await Users.findOne({ _id }).select('-password').lean().exec();

        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        }

        if (Number(user?.role_type) !== roles[2].id) {
            return res.status(404).json({ msg: "You cannot create orders" })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

export default apiGuard;