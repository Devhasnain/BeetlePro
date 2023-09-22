const express = require("express");
const withMethodGuard = require("../middlewares/withMethodGuard");
const { uploadDriverFiles, uploadMultipleFiles, upload } = require('../controllers/uploads/Upload');

// customers 
const useCheckCustomerEmail = require("../middlewares/customers/useCheckExistingEmail");
const VerifyCustomerToken = require("../middlewares/customers/verifyToken");
const CustomerSignIn = require("../controllers/auth/customers/sign_in");
const CustomerSignUp = require("../controllers/auth/customers/sign_up");

// drivers 
const apiGuardDrivers = require("../middlewares/drivers/apiGuard");
const useCheckDriverEmail = require("../middlewares/drivers/useCheckExistingEmail");
const VerifyDriverToken = require("../middlewares/drivers/verifyToken");
const DriverSignIn = require("../controllers/auth/drivers/sign_in");
const DriverSignUp = require("../controllers/auth/drivers/sign_up");
const DriverSignUpOnboard = require("../controllers/auth/drivers/sign_up_test");

const { OnboardingV1, OnboardingV2, OnboardingV3 } = require("../controllers/auth/drivers/onboarding");
const dynamicFieldName = require("../middlewares/setFileName");
const resetPassword = require("../controllers/auth/resetpassword");
const updateCurrentPassword = require("../controllers/auth/updateCurrentPassword");
const { usersCollection, driversCollection, SUPPORTEDMETHOD } = require("../config");
const apiGuard = require("../middlewares/customers/apiGuard");
const getUserData = require("../controllers/auth/getUserData");
const updateUserProfile = require("../controllers/auth/customers/updateProfile");

const router = express.Router();


// driver auth 
router.get('/driver/:user_id', getUserData(driversCollection));
router.post('/driver/sign_up', withMethodGuard, uploadMultipleFiles, useCheckDriverEmail, DriverSignUpOnboard);
router.post('/driver/register', withMethodGuard(SUPPORTEDMETHOD), useCheckDriverEmail, DriverSignUp);
router.post('/driver/login', withMethodGuard(SUPPORTEDMETHOD), VerifyDriverToken, DriverSignIn);
router.post('/driver/user-forget-password-reset', withMethodGuard(SUPPORTEDMETHOD), resetPassword(driversCollection));
router.post('/driver/update-password', withMethodGuard(SUPPORTEDMETHOD), apiGuardDrivers, updateCurrentPassword(driversCollection));

// driver file uploads 
router.post('/driver/onboarding/v1', withMethodGuard(SUPPORTEDMETHOD), apiGuard, uploadMultipleFiles, OnboardingV1);
router.post('/driver/onboarding/v2', withMethodGuard(SUPPORTEDMETHOD), apiGuard, uploadDriverFiles, OnboardingV2);
router.post('/driver/onboarding/v3', withMethodGuard(SUPPORTEDMETHOD), apiGuard, dynamicFieldName, OnboardingV3);

// customer auth
router.get('/customer/:user_id', getUserData(usersCollection));
router.post('/customer/register', withMethodGuard(SUPPORTEDMETHOD), useCheckCustomerEmail, CustomerSignUp);
router.post('/customer/login', withMethodGuard(SUPPORTEDMETHOD), VerifyCustomerToken, CustomerSignIn);
router.post('/customer/update-profile', withMethodGuard(SUPPORTEDMETHOD), apiGuard, upload.single('image'), updateUserProfile);
router.post('/customer/user-forget-password-reset', withMethodGuard(SUPPORTEDMETHOD), resetPassword(usersCollection));
router.post('/customer/update-password', withMethodGuard(SUPPORTEDMETHOD), apiGuard, updateCurrentPassword(usersCollection));

module.exports = router;