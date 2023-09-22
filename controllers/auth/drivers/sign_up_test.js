const bcrypt = require('bcrypt');
const _ = require("lodash");
const Drivers = require('../../../database/models/Driver');
const Files = require('../../../database/models/File');
// const Files = require('../../../database/models/File');
const {imageURL} = require('../../../config');

let url = imageURL

const SignUpTest = async (req, res) => {
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

        let files = req.files;

        let id = savedUser._id;

        let user = _.omit(savedUser._doc, ['password']);

        if (files.length) {

            files.forEach(async (element) => {

                let uploadFile = await Files.create({
                    ...element,
                    isDriver: true,
                    user: id
                });

                let fieldname = element.fieldname;

                let imageUrl = `${url}/${uploadFile._id}`

                await Drivers.findByIdAndUpdate({ _id: id }, { $set: { [fieldname]: imageUrl } }, { new: true });
            });

            return res.status(200).json({user,status:true});

        }


        return res.status(200).json(user);

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? 'Internal Server Error' })
    }
};

module.exports = SignUpTest;