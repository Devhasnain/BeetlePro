const Files = require("../../database/models/File");


const ServeImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({ msg: "Bad request" })
        };

        let file = await Files.findOne({ _id: id });

        if (!file) {
            return res.status(400).json({ msg: "not found" })
        }

        let contentType = 'image/*'

        res.setHeader('Content-Type', contentType);
        res.send(file.buffer);

    } catch (error) {
        return res.status(500).json({ msg: "internal server error" })
    }
};

module.exports = ServeImage;