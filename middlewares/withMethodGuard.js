const config = require('../config');

const withMethodGuard = async (req, res, next) => {
    try {
        
        let requestMethod = req.method;

        if(!config.httpMethods.includes(requestMethod)){
            return res.status(400).json({msg:"Method Not Allowed"});
        }


        next();

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Interanal Server Error" })
    }
};

module.exports = withMethodGuard;