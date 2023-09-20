const bcrypt = require('bcrypt');
const _ = require("lodash");
const Drivers = require('../../../database/models/Driver');
// const Files = require('../../../database/models/File');

const SignUp = async (req, res) => {
    try {

        let userData = req.user;

        if (!userData) {
            throw new Error('Unknow error occured while registration, please try again!')
        };

        let password = await bcrypt.hash(userData.password, 12);

        let newUser = {
            ...userData,
            password
        }

        let registerUser = await Drivers.create(newUser);

        let savedUser = await registerUser.save();

        if (!savedUser._doc) {
            return res.status(400).json({ msg: "Unknow error occured while registeration, please try again!" });
        }

        // for (const key in files) {
        //     let uploadFile = await Files.create({ ...files[key][0], user: savedUser._id })
        //     let saveFile = await uploadFile.save();
        //     let imageurl = `http://localhost:3000/image/`
        //     let fieldname = files[key][0].fieldname;
        //     let imagelink = { [fieldname]: `${imageurl}${saveFile._id}` }
        //     await Drivers.findByIdAndUpdate({ _id: savedUser._id }, { $set: { ...imagelink } })
        // }

        // let user = await Drivers.findOne({ _id: savedUser._id }).select('-password')
        let user = _.omit(savedUser._doc,['password']);

        return res.status(200).json(user);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = SignUp;