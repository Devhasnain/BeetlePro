// const zod = require('zod');
const Users = require('../../database/models/User');

// const requestBodyValidation = zod.object({
//     name: zod.string().min(3),
//     email: zod.string().email().min(13),
//     number: zod.string().min(11),
//     password: zod.string().min(8),
//     role_type: zod.string(),
// })

const useCheckExistingEmail = async (req, res, next) => {
    try {

        // const requestBody = await requestBodyValidation.safeParseAsync(req.body);

        // if (!requestBody.success) {
        //     return res.status(401).json({ msg: requestBody.error })
        // }

        const { email } = req.body;

        let checkIfEmailExists = await Users.findOne({ email });

        if (checkIfEmailExists) {
            return res.status(400).json({ msg: "User already exists with this email!" })
        }

        req.user = req.body;
        next()

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

module.exports = useCheckExistingEmail;