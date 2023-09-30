import Drivers from "../../database/models/Driver.js";
import handleError from "../../utils/ReturnError.js"

const getAllDrivers = async (req, res) => {
    try {
        let drivers = await Drivers.find({});
        return res.status(200).json({ drivers, status: true });
    } catch (error) {
        const response = handleError(error)
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
};


export default getAllDrivers;