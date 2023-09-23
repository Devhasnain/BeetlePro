import Files from "../../../database/models/File.js";
import handleError from "../../../utils/ReturnError.js";
import config from '../../../config.js';
import Users from "../../../database/models/User.js";
import Drivers from "../../../database/models/Driver.js";

let { imageURL } = config;

const updateUserProfile = async (req, res) => {
    try {

        let user = req.user;
        let data = req.body;
        let file = req.file ?? null;
        let { email } = data;

        if (!data) {
            return res.status(400).json({ msg: "Please provide data to update profile" });
        }

        if (email) {
            let user = await Users.findOne({ email: email });

            if (user) {
                return res.status(400).json({ msg: `This email:${email} is already in use!` });
            } else {
                let driver = await Drivers.findOne({ email: email });
                if (driver) {
                    return res.status(400).json({ msg: `This email:${email} is already in use!` });
                }
            }
        }

        if (file) {

            let Image = await Files.create({ ...file, user: user._id });
            let savedImage = await Image.save();

            let imagelink = `${imageURL}/${savedImage._id}`;

            for (const key in data) {
                await Users.findByIdAndUpdate({ _id: user._id }, { $set: { [key]: data[key], user_image: imagelink } }, { new: true });
            }

            let updatedUser = await Users.findById(user._id).select('-password').lean().exec();

            return res.status(200).json({ msg: "Profile updated successfuly", user: updatedUser })

        }

        for (const key in data) {
            await Users.findByIdAndUpdate({ _id: user._id }, { $set: { [key]: data[key] } }, { new: true });
        }

        let updatedUser = await Users.findById(user._id).select('-password').lean().exec();

        return res.status(200).json({ msg: "Profile updated successfuly", user: updatedUser })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
};

export default updateUserProfile;
