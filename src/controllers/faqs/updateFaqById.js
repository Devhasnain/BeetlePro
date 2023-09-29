import Faqs from "../../database/models/Faqs";
import handleError from "../../utils/ReturnError"

const getFaqById = async (req, res) => {
    try {

        let { faq_id, title, paragraph } = req.body;

        await Faqs.findByIdAndUpdate({ faq_id }, { $set: { title: title, paragraph: paragraph } }, { new: true });

        return res.status(200).json({ msg: "Faq Updated successfuly", status: true })

    } catch (error) {
        const response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });

    }
};

export default getFaqById;