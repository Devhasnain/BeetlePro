const express = require("express");
const multer = require('multer');
const dynamicFieldName = require("../middlewares/setFileName");
const router = express.Router();
const nodemailer = require("nodemailer");
const { getCustomersCollection, getCollectionByName } = require("../utils/database/queries");
const { scheduleOrderJob } = require("../utils/scheduleOrder.js");


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

router.get('/corn', (req, res) => {
    try {
        scheduleOrderJob();
        return res.status(200).json({ msg: "done" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
});

// Define the cron expression to run the job at a specific time
const cronExpression = '0 10 * * *'; // Example: This expression schedules the job to run at 10:00 AM daily

let scheduledJob = null; // Initialize the scheduled job variable

// Create an API route to schedule the order and set up the cron job
router.post('/schedule-order', (req, res) => {
    try {
        const scheduled_time = new Date();
        scheduled_time.setMinutes(scheduled_time.getMinutes() + 1);

        console.log(scheduled_time)
        // Your code to create the order and obtain the scheduled time from req.body
        // const scheduledTime = req.body.scheduledTime;
        // Calculate the date and time components for the cron expression
        const scheduledDate = new Date(scheduled_time);
        const year = scheduledDate.getFullYear();
        const month = scheduledDate.getMonth() + 1; // Month is zero-indexed
        const day = scheduledDate.getDate();
        const hour = scheduledDate.getHours();
        const minute = scheduledDate.getMinutes();

        // Create the cron expression based on the order's scheduled time
        const cronExpression = `${minute} ${hour} ${day} ${month} ? ${year}`;

        // Schedule the job to run at the order's scheduled time
        scheduledJob = schedule.scheduleJob('my_scheduled_job', cronExpression, () => {
            // Your code to execute at the scheduled time
            console.log('Cron job executed at the specified time.');

            // Cancel the job after it runs once
            if (scheduledJob) {
                scheduledJob.cancel();
                console.log('Cron job has been canceled.');
            }
        });

        res.status(201).json({ message: 'Order scheduled successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




module.exports = router;