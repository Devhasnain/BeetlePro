const express = require("express");
const SignUpDrivers = require("../functions/auth/drivers/sign_up");
const SignInDrivers = require("../functions/auth/drivers/sign_in");
const SignUpCustomers = require("../functions/auth/customers/sign_up");
const SignInCustomers = require("../functions/auth/customers/sign_in");
const useCheckExistingEmailCustomers = require("../middlewares/customers/useCheckExistingEmail");
const useCheckExistingEmailDrivers = require("../middlewares/drivers/useCheckExistingEmail");
const withMethodGuard = require("../middlewares/withMethodGuard");
const VerifyTokenDrivers = require("../middlewares/drivers/verifyToken");
const VerifyTokenCustomers = require("../middlewares/customers/verifyToken");
const Upload = require('../functions/uploads/Upload');

const router = express.Router();

// apis for drivers 
router.post('/driver/auto_sign_in',VerifyTokenDrivers);
router.post('/driver/sign_in', withMethodGuard, SignInDrivers);
router.post('/driver/sign_up', withMethodGuard, useCheckExistingEmailDrivers, SignUpDrivers);

// apis for customers
router.post('/customer/auto_sign_in',VerifyTokenCustomers);
router.post('/customer/sign_in', withMethodGuard, SignInCustomers);
router.post('/customer/sign_up', withMethodGuard, useCheckExistingEmailCustomers,SignUpCustomers);


module.exports = router;