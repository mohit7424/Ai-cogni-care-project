import { Router } from 'express';
import { AuthController } from '../controller/authcontroller.js';
import { authMiddleware } from '../../../middleware/authmiddleware.js';

const router = Router();

// ================= PUBLIC AUTH ROUTES =================
// Registration & Verification
router.post('/register', AuthController.register);
router.post('/otp/verify', AuthController.verifyOtp);
router.post('/otp/send', AuthController.resendOtp); // frontend otpService calls /auth/otp/send
router.post('/otp/resend', AuthController.resendOtp); // frontend otpService calls /auth/otp/resend
router.post('/resend-verification', AuthController.resendOtp); // frontend registerService calls /auth/resend-verification
router.post('/verify-email', AuthController.verifyOtp); // frontend registerService calls /auth/verify-email

// Login & Session
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken); // frontend loginService calls /auth/refresh
router.post('/token/refresh', AuthController.refreshToken); // alias
router.post('/logout', AuthController.logout);

// Password Reset Flow
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/reset-password/validate', AuthController.validateResetToken);
router.post('/reset-password/validate', AuthController.validateResetToken); // frontend passwordService calls POST
router.post('/reset-password', AuthController.resetPassword);

// ================= PROTECTED AUTH ROUTES =================
router.post('/change-password', authMiddleware, AuthController.changePassword);
router.get('/me', authMiddleware, AuthController.getMe);

export default router;
