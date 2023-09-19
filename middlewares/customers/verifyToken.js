const jwt = require('jsonwebtoken');
const { destroyCookie } = require('nookies');
const Users = require('../../database/models/User');
const _ = require('lodash');
const connectToDatabase = require('../../database/DBconnection');

const extractFields = ['name', 'email', 'number', 'role_type', '_id', 'createdAt', 'updatedAt'];

const VerifyToken = async (req, res, next) => {

    const token = req.headers.authorization;

    try {

        if (!token) {
            next();
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

            await connectToDatabase();

            let user = await Users.findOne({ _id, email });

            if (!user) {
                return res.status(404).json({ msg: "user not found" })
            }

            let userData = _.pick(user, extractFields);

            return res.status(200).json({ ...userData, token });

        });


    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })

    }
};

module.exports = VerifyToken;