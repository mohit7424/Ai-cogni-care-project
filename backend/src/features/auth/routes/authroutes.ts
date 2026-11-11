import { Router } from 'express';
import { AuthController } from '../controller/authcontroller.js';
import { authMiddleware } from '../../../middleware/authmiddleware.js';

const router = Router();

// ================= PUBLIC AUTH ROUTES =================
// Registration & Verification
router.post('/register', AuthController.register);
router.post('/otp/verify', AuthController.verifyOtp);
router.post('/otp/resend', AuthController.resendOtp);

// Login & Session
router.post('/login', AuthController.login);
router.post('/token/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

// Password Reset Flow
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/reset-password/validate', AuthController.validateResetToken);
router.post('/reset-password', AuthController.resetPassword);

// ================= PROTECTED AUTH ROUTES =================
router.get('/me', authMiddleware, AuthController.getMe);

export default router;

