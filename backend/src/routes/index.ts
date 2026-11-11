import { Router } from 'express';
import authRoutes from '../features/auth/routes/authroutes.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'CogniCare API',
    timestamp: new Date().toISOString(),
  });
});

// Feature Routes
router.use('/auth', authRoutes);

export default router;

