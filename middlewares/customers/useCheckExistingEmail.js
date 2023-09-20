const Drivers = require("../../database/models/Driver");
const Users = require("../../database/models/User");


const useCheckExistingEmail = async (req, res, next) => {
    try {

        const { email, name, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword || !name) {
            return res.status(400).json({ msg: "Bad request" })
        }

        if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
            return res.status(400).json({ msg: "password and confirm password don't matched" })
        }

        let checkIfEmailinCutomers = await Users.findOne({ email });

        let checkIfEmailinDrivers = await Drivers.findOne({ email });

        if (checkIfEmailinCutomers) {
            return res.status(400).json({ msg: "User already exists with this email!" })
        }

        if (checkIfEmailinDrivers) {
            return res.status(400).json({ msg: "User already exists with this email!" })
        }

        req.user = req.body;
        next()

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Internal Server Error" })
    }
};

module.exports = useCheckExistingEmail;