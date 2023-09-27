import zod from 'zod';
import Users from '../../database/models/User.js';
import Drivers from '../../database/models/Driver.js';
import config from '../../../config.js';

let { roles } = config;

const requestBodyValidation = zod.object({
    name: zod.string().min(3),
    email: zod.string().email().min(13),
    user_phone: zod.string().min(11),
    password: zod.string().min(8),
    role_type: zod.number(),
})

const useCheckExistingEmail = async (req, res, next) => {
    try {

        const requestBody = await requestBodyValidation.safeParseAsync(req.body);

        if (!requestBody.success) {
            return res.status(401).json({ msg: `${requestBody.error.name}, data validation faild!`, status: false })
        }

        const { email, role_type } = requestBody.data;

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
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server Error", status: false })
    }
};

export default useCheckExistingEmail;