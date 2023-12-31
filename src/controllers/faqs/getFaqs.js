import Faqs from "../../models/Faqs.js";
import handleError from "../../utils/ReturnError.js"

const getFaqs = async (req, res) => {
    try {
        let faqs = await Faqs.find();
        if (!faqs.length) {
            return res.status(200).json({ faqs: [], status: true });
        }
        return res.status(200).json({ faqs, status: true })
    } catch (error) {
        console.log(error)
        let response = handleError(error);
        return res.status(response.statusCode).json({ response, status: false });
    }
};

export default getFaqs;