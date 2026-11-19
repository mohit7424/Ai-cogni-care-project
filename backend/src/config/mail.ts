import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded regardless of the working directory
dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') }); // root .env
dotenv.config();

export function getTransporter() {
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const isGmail = host.includes('gmail') || user.endsWith('@gmail.com');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: { user, pass },
  });
}

export const transporter = getTransporter();

export const mailConfig = {
  get from() {
    return process.env.SMTP_FROM || `"CogniCare" <${process.env.SMTP_USER || 'no-reply@cognicare.com'}>`;
  },
  get isConfigured() {
    return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  },
};
