import Files from "../../database/models/File.js";
import handleError from "../../utils/ReturnError.js"

const serveImage = async (req, res) => {
    try {
        let { id } = req.params;
        let file = await Files.findOne({ _id: id });

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(file.buffer);
    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).body({ msg: response.statusCode, status: false })
    }
};


export default serveImage;