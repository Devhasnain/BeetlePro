import express from 'express';
import withMethodGuard from '../middlewares/withMethodGuard.js';
import { uploadDriverFiles, uploadMultipleFiles, upload } from '../controllers/uploads/Upload.js';
import useCheckCustomerEmail from '../middlewares/customers/useCheckExistingEmail.js';
import VerifyCustomerToken from '../middlewares/customers/verifyToken.js';
import CustomerSignIn from '../controllers/auth/customers/sign_in.js';
import CustomerSignUp from '../controllers/auth/customers/sign_up.js';
import apiGuardDrivers from '../middlewares/drivers/apiGuard.js';
import useCheckDriverEmail from '../middlewares/drivers/useCheckExistingEmail.js';
import VerifyDriverToken from '../middlewares/drivers/verifyToken.js';
import DriverSignIn from '../controllers/auth/drivers/sign_in.js';
import DriverSignUp from '../controllers/auth/drivers/sign_up.js';
import DriverSignUpOnboard from '../controllers/auth/drivers/sign_up_test.js';

import { OnboardingV1, OnboardingV2, OnboardingV3 } from '../controllers/auth/drivers/onboarding.js';
import dynamicFieldName from '../middlewares/setFileName.js';
import resetPassword from '../controllers/auth/resetpassword.js';
import updateCurrentPassword from '../controllers/auth/updateCurrentPassword.js';
import config from '../../config.js';
import apiGuard from '../middlewares/customers/apiGuard.js';
import getUserData from '../controllers/auth/getUserData.js';
import updateUserProfile from '../controllers/auth/customers/updateProfile.js';

let { usersCollection, driversCollection, SUPPORTEDMETHOD } = config;

const router = express.Router();


// driver auth 
router.get('/driver/:user_id', getUserData(driversCollection));
router.post('/driver/sign_up', withMethodGuard(SUPPORTEDMETHOD), uploadMultipleFiles, useCheckDriverEmail, DriverSignUpOnboard);
router.post('/driver/register', withMethodGuard(SUPPORTEDMETHOD), uploadMultipleFiles, useCheckDriverEmail, DriverSignUp);
router.post('/driver/login', withMethodGuard(SUPPORTEDMETHOD), VerifyDriverToken, DriverSignIn);
router.post('/driver/user-forget-password-reset', withMethodGuard(SUPPORTEDMETHOD), resetPassword(driversCollection));
router.post('/driver/update-password', withMethodGuard(SUPPORTEDMETHOD), apiGuardDrivers, updateCurrentPassword(driversCollection));

// driver file uploads 
router.post('/driver/onboarding/v1', withMethodGuard(SUPPORTEDMETHOD), apiGuardDrivers, uploadMultipleFiles, OnboardingV1);
router.post('/driver/onboarding/v2', withMethodGuard(SUPPORTEDMETHOD), apiGuardDrivers, uploadDriverFiles, OnboardingV2);
router.post('/driver/onboarding/v3', withMethodGuard(SUPPORTEDMETHOD), apiGuardDrivers, dynamicFieldName, OnboardingV3);

// customer auth
router.get('/customer/:user_id', getUserData(usersCollection));
router.post('/customer/register', withMethodGuard(SUPPORTEDMETHOD), useCheckCustomerEmail, CustomerSignUp);
router.post('/customer/login', withMethodGuard(SUPPORTEDMETHOD), VerifyCustomerToken, CustomerSignIn);
router.post('/customer/update-profile', withMethodGuard(SUPPORTEDMETHOD), apiGuard, upload.single('image'), updateUserProfile);
router.post('/customer/user-forget-password-reset', withMethodGuard(SUPPORTEDMETHOD), resetPassword(usersCollection));
router.post('/customer/update-password', withMethodGuard(SUPPORTEDMETHOD), apiGuard, updateCurrentPassword(usersCollection));

export default router;