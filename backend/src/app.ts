
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index.js';

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://frontend-sage-seven-18.vercel.app',
  'http://localhost:3000',
].filter((origin): origin is string => Boolean(origin));

// Middleware setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend API is running successfully 🚀',
  });
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
  });
});

// Mount API routes
app.use('/api/v1', apiRoutes);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error]', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
