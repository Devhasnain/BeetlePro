const express = require('express');
const CheckIfOtpSent = require('../middlewares/mails/checkIfOtpAlreadySent.JS');
const router = express.Router();

router.post('/verfiy-email', CheckIfOtpSent);

