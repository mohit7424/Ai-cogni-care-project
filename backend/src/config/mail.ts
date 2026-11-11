import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export const mailConfig = {
  from: process.env.SMTP_FROM || '"CogniCare" <no-reply@cognicare.com>',
  isConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
};

