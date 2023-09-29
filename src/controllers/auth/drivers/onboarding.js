import config from "../../../../config.js";
import Drivers from "../../../database/models/Driver.js";
import Files from "../../../database/models/File.js";
import { upload } from '../../uploads/Upload.js';

let { HttpStatusCodes } = config;

const OnboardingV1 = async (req, res) => {
    try {
        let id = '650a0c0c8b03a5dbe5294d14';
        const files = req.files;

        if (!files.length) {
            return res.status(401).json({ msg: "select files complete onboarding", status: false });
        }

        files.forEach(async (element) => {

            let uploadFile = await Files.create({
                ...element,
                isDriver: true,
                user: id
            });

            let fieldname = element.fieldname;

            await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: uploadFile._id } }, { new: true });
        });

        return res.status(200).json({ msg: "Files have been uploaded!", status: true })
    } catch (error) {
        return res.status(error.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "internal server error", status: false });
    }
};

const OnboardingV2 = async (req, res) => {
    try {
        let id = '650a0c0c8b03a5dbe5294d14';
        const files = req.files;

        if (Object.keys(files).length === 0) {

            return res.status(401).json({ msg: "select files complete onboarding", status: false });

        }

        let filesarry = [];

        for (const element in files) {

            // let uploadFile = await Files.create({
            //     ...files[element][0],
            //     user: id
            // });

            // let fieldname = files[element][0].fieldname;

            // await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: uploadFile._id } }, { new: true });

            filesarry.push({ ...files[element][0] });

        }

        filesarry.forEach(async (element) => {
            let uploadFile = await Files.create({
                ...element,
                isDriver: true,
                user: id
            });

            let fieldname = element.fieldname;
            await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: uploadFile._id } }, { new: true });
        });



        return res.status(200).json({ msg: "Files are uploaded!", status: true })
    } catch (error) {
        return res.status(error.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "internal server error", status: false });
    }
};

const OnboardingV3 = async (req, res) => {

    try {

        let id = '650a3918591f89b4365d1bda';
        upload.single(req.fieldName)(req, res, async function (err) {

            if (err) {
                return res.status(400).json({ error: err.message, status: false });
            }

            let uploadFile = await Files.create({
                ...req.file,
                isDriver: true,
                user: id,
            });

            let fieldname = req.file.fieldname;

            await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: uploadFile._id } }, { new: true });

            res.send({ msg: 'File uploaded successfully', status: true });
        });

    } catch (error) {
        return res.status(error.statusCode ?? HttpStatusCodes.internalServerError).json({ msg: error?.message ?? "internal server error", status:false });
    }
};

export { OnboardingV1, OnboardingV2, OnboardingV3 };