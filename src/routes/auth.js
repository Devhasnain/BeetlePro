import { Router } from 'express';
import {
    CustomerSignIn,
    CustomerSignUp,
    UpdateCustomerProfile,
    generateOtpCustomer,
    verifyOtpCustomer,
    resetPasswordCustomer,
    UpdateCustomerCurrentPassword
} from '../controllers/auth/customer.js';
import {
    SignUpDriver,
    SignInDriver,
    generateOtpDriver,
    verifyOtpDriver,
    resetPasswordDriver,
    UploadDriverDocs,
    UpdateDriverCurrentPassword
} from '../controllers/auth/drivers.js';
import { IsMailOtpSentToDriver, VerifyTokenDrivers, checkEmailDrivers, drivresApiGuard } from '../middlewares/driver.js';
import {
    IsMailOtpSentToCustomer,
    VerifyTokenCustomers,
    checkEmailCustomers,
    checkExistingUserWithEmail,
    customersApiGuard
} from '../middlewares/customer.js';
import { upload, uploadMultipleFiles } from '../utils/Multer.js';
import { serveImage } from '../utils/FileServer.js';

const router = Router();

// driver auth 
router.post('/driver/register', upload.single("image"), checkEmailDrivers, SignUpDriver);
router.post('/driver/login', VerifyTokenDrivers, SignInDriver);
router.post('/driver/generate-email-otp', IsMailOtpSentToDriver, generateOtpDriver);
router.post('/driver/verify-email-otp', verifyOtpDriver);
router.post('/driver/reset-password', resetPasswordDriver);
router.put('/driver/update-password', VerifyTokenDrivers, UpdateDriverCurrentPassword);
router.get('/driver/image/:id', serveImage);
// driver file uploads 
router.post('/driver/onboarding/v1', VerifyTokenDrivers, uploadMultipleFiles, UploadDriverDocs);


// customer auth
router.post('/customer/register', checkEmailCustomers, CustomerSignUp);
router.post('/customer/login', VerifyTokenCustomers, CustomerSignIn);
router.get('/customer/image/:id', serveImage);
router.post('/customer/update-profile', customersApiGuard, upload.single('user_image'), checkExistingUserWithEmail, UpdateCustomerProfile);

router.post('/customer/generate-email-otp', IsMailOtpSentToCustomer, generateOtpCustomer);
router.post('/customer/verify-email-otp', verifyOtpCustomer);
router.post('/customer/reset-password', resetPasswordCustomer);
router.put('/customer/update-password', VerifyTokenCustomers, UpdateCustomerCurrentPassword);

export default router;