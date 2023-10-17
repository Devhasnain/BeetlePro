const express = require("express");
const multer = require('multer');
const dynamicFieldName = require("../middlewares/setFileName");
const router = express.Router();
const nodemailer = require("nodemailer");
const { getCustomersCollection, getCollectionByName } = require("../utils/database/queries");


const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadFields = upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }])

const singleFileUpload = upload.single('file' || 'files');

router.post('/', dynamicFieldName, async (req, res) => {
    try {

        upload.single(req.fieldName)(req, res, function (err) {

            if (err) {
                return res.status(400).json({ error: err.message });
            }

            res.send('File uploaded successfully');
        });

    } catch (error) {
        return res.status(500).json({ msg: "asdfadf" })
    }
})

router.get('/users', async (req, res) => {
    try {

        let Collection = await getCollectionByName('drivers');

        // let Customers = await Collection.find({});
        
        // return res.status(200).json({ msg: "email send", Customers })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "asdfadf" })

    }
})



module.exports = router;