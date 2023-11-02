import Files from "../models/File.js";
import handleError from "./ReturnError.js";

export const serveImage = async (req, res) => {
    try {
        let { id } = req.params;
        let file = await Files.findOne({ _id: id });
        let mimetype = file.mimetype ?? 'image/jpeg';
        res.setHeader('Content-Type', mimetype);
        res.send(file.buffer);
    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false })
    }
};
