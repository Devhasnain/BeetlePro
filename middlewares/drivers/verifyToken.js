const jwt = require('jsonwebtoken');
const { destroyCookie } = require('nookies');
const _ = require('lodash');
const Drivers = require('../../database/models/Driver');

const VerifyToken = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            next();
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }

            const { exp, _id, email } = decoded;

            const currentTime = Math.floor(Date.now() / 1000);

            if (exp <= currentTime) {
                destroyCookie(req, 'token');
                return res.status(401).json({ message: 'Token has expired' });
            }

            let user = await Drivers.findOne({ _id }).select('-password');

            if (!user) {
                return res.status(404).json({ msg: "user not found" })
            }

            return res.status(200).json({ ...user, token });

        });


    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })

    }
};

module.exports = VerifyToken;