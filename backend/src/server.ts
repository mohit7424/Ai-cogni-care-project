import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 CogniCare Backend Server running on:`);
  console.log(`👉 http://localhost:${PORT}/api/v1`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`===============================================`);
});

