const jwt = require('jsonwebtoken');
const { destroyCookie } = require('nookies');
const _ = require('lodash');
const Users = require('../../database/models/User');

const VerifyToken = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            next();
            return;
        }

        let { exp, _id, email } = jwt.verify(token, process.env.JWT_SECRET);

        if (!exp || !_id || !email) {
            return res.status(400).json({ msg: "Authentication faild!" });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (exp <= currentTime) {
            destroyCookie(req, 'token');
            return res.status(401).json({ message: 'Token has expired' });
        }

        let user = await Users.findOne({ _id, email }).select('-password');

        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        }

        return res.status(200).json({ ...userData, token });


    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })

    }
};

module.exports = VerifyToken;