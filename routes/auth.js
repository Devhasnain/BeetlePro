const express = require("express");
const withMethodGuard = require("../middlewares/withMethodGuard");
const { uploadDriverFiles, uploadMultipleFiles } = require('../controllers/uploads/Upload');
const apiGuard = require("../middlewares/drivers/apiGuard");

// customers 
const useCheckCustomerEmail = require("../middlewares/customers/useCheckExistingEmail");
const VerifyCustomerToken = require("../middlewares/customers/verifyToken");
const CustomerSignIn = require("../controllers/auth/customers/sign_in");
const CustomerSignUp = require("../controllers/auth/customers/sign_up");

// drivers 
const useCheckDriverEmail = require("../middlewares/drivers/useCheckExistingEmail");
const VerifyDriverToken = require("../middlewares/drivers/verifyToken");
const DriverSignIn = require("../controllers/auth/drivers/sign_in");
const DriverSignUp = require("../controllers/auth/drivers/sign_up");
const { OnboardingV1, OnboardingV2, OnboardingV3 } = require("../controllers/auth/drivers/onboarding");
const dynamicFieldName = require("../middlewares/setFileName");

const router = express.Router();

router.post('/driver/register', withMethodGuard, useCheckDriverEmail, DriverSignUp);
router.post('/customer/register', withMethodGuard, useCheckCustomerEmail, CustomerSignUp);
router.post('/customer/login', withMethodGuard, VerifyCustomerToken, CustomerSignIn);
router.post('/driver/login', withMethodGuard, VerifyDriverToken, DriverSignIn);
router.post('/onboarding/v1', withMethodGuard, apiGuard, uploadMultipleFiles, OnboardingV1);
router.post('/onboarding/v2', withMethodGuard, apiGuard, uploadDriverFiles, OnboardingV2);
router.post('/onboarding/v3', withMethodGuard, apiGuard, dynamicFieldName, OnboardingV3);



module.exports = router;