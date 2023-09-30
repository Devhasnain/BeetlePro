import Faqs from "../../database/models/Faqs.js";
import handleError from "../../utils/ReturnError.js"

const getFaqById = async (req, res) => {
    try {

        let { faq_id } = req.params;

        console.log(faq_id)

        let faq = await Faqs.findOne({ faq_id });

        if (!faq) {
            return res.status(404).json({ msg: "Not found", status: false });
        };

        return res.status(200).json({ faq, status: true })

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });

    }
};

export default getFaqById;