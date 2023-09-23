import multer from "multer";
import dotenv from "dotenv";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI_UPLOADS,
    // options,
    // file: (request, file) => {
    //     const match = ["image/png", "image/jpg"];

    //     if (match.indexOf(file.mimetype) === -1)
    //         return `${Date.now()}-blog-${file.originalname}`;

    //     return {
    //         bucketName: "photos",
    //         filename: `${Date.now()}-blog-${file.originalname}`
    //     }
    // }
});

const uploads = multer({ storage }); 

module.exports = uploads