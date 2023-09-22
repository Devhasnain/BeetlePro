const { roles } = require("../../config");
const Drivers = require("../../database/models/Driver");
const Users = require("../../database/models/User");
const zod = require('zod');

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
            return res.status(401).json({ msg: `${requestBody.error.name}, data validation faild!` })
        }

        const { email, role_type } = requestBody.data;

        let checkIfEmailinCutomers = await Users.findOne({ email });

        if (checkIfEmailinCutomers) {
            return res.status(400).json({ msg: "User already exists with this email!" })
        };

        let checkIfEmailinDrivers = await Drivers.findOne({ email });

        if (checkIfEmailinDrivers) {
            return res.status(400).json({ msg: "User already exists with this email!" })
        };

        let role = roles.find((item) => item.id === role_type);

        if (!role) {
            return res.status(404).json({ msg: `Role didn't found with id:${role_type}` })
        }

        req.user = req.body;
        req.user.role_type = role.id;

        req.user = requestBody.data;
        next();

    } catch (error) {
        console.log(error)
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

module.exports = useCheckExistingEmail;