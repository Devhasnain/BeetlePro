const config = require('../config');

const withMethodGuard = (allowedMethod) => {
    return (req, res, next) => {
        try {

            let requestMethod = req.method;

            if (requestMethod === allowedMethod) {
                next();
                return;
            } else {
                return res.status(405).json({ error: 'Method Not Allowed' });
            }

        } catch (error) {
            return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Interanal Server Error" })
        }
    }
}


module.exports = withMethodGuard;