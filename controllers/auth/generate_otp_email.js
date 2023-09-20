const { HttpStatusCodes } = require("../../config")

const GenerateOtpForEmail = async (req, res) => {
    try {

    } catch (error) {
        return res.status(error?.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = GenerateOtpForEmail;