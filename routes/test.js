const express = require("express");
const multer = require('multer');
const dynamicFieldName = require("../middlewares/setFileName");
const router = express.Router();
const nodemailer = require("nodemailer");


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

router.post('/email', async (req, res) => {
    try {


        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'hasnainalam1166@gmail.com',
                pass: 'xwon cogc cnfa wpgz'
            }
        });

        const mailOptions = {
            from: "beetlepro@gmail.com",
            to: "5454asdfadsfad5asd5fads4fad",
            subject: "Hello from NodeMailer",
            text: "This is a test email sent from Node.js using NodeMailer.",
        };

       let sendEmail = await transporter.sendMail(mailOptions);

    //    if(sendEmail.rejected){
    //     return res.status(500).json({ msg: "asdfadf" })
    //    }

        return res.status(200).json({ msg: "email send", sendEmail })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "asdfadf" })

    }
})



module.exports = router;