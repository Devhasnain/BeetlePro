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

const router = express.Router();

router.post('/driver/sign_in', withMethodGuard, VerifyTokenDrivers, SignInDrivers);
router.post('/driver/sign_up', withMethodGuard, useCheckExistingEmailDrivers, SignUpDrivers);
router.post('/customer/sign_in', withMethodGuard, VerifyTokenCustomers, SignInCustomers);
router.post('/customer/sign_up', withMethodGuard, useCheckExistingEmailCustomers, SignUpCustomers);


module.exports = router;