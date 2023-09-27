import jwt from 'jsonwebtoken';
import { destroyCookie } from 'nookies';
import _ from 'lodash';
import Users from '../../database/models/User.js';

const VerifyToken = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            next();
            return;
        }

        let { exp, _id, email } = jwt.verify(token, process.env.JWT_SECRET);

        if (!exp || !_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!", status: false });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (exp <= currentTime) {
            destroyCookie(req, 'token');
            return res.status(401).json({ message: 'Token has expired', status: false });
        }

        let user = await Users.findOne({ _id: _id }).select('-password');

        if (!user) {
            return res.status(404).json({ msg: "user not found", status: false })
        }

        return res.status(200).json({ ...user, token });


    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error', status: false })

    }
};

export default VerifyToken;