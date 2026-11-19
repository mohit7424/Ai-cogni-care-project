import { getTransporter, mailConfig } from '../config/mail.js';

export class EmailService {
  /**
   * Send an OTP email for account verification or password reset
   */
  static async sendOtpEmail(to: string, otp: string, purpose: string = 'email_verification'): Promise<boolean> {
    const isVerification = purpose === 'email_verification';
    const subject = isVerification ? 'Verify your CogniCare Account' : 'CogniCare Password Reset Code';
    const title = isVerification ? 'Account Verification' : 'Password Reset Request';
    const description = isVerification
      ? 'Please use the following 6-digit code to complete your registration.'
      : 'We received a request to reset your password. Use the code below to proceed.';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0f766e; margin: 0; font-size: 26px;">CogniCare</h1>
          <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Next-Gen Cognitive & Neurological Care</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; text-align: center;">
          <h2 style="color: #1e293b; font-size: 20px; margin-top: 0;">${title}</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.5;">${description}</p>
          <div style="margin: 24px 0;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0f766e; background: #e6fffa; padding: 12px 24px; border-radius: 8px; border: 1px dashed #0d9488;">
              ${otp}
            </span>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">This code is valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 24px;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `;

    // Always log to console for development and instant inspection
    console.log(`\n======================================================`);
    console.log(`[EmailService] Dispatched to: ${to} | Purpose: ${purpose}`);
    console.log(`[EmailService] OTP Code: >>> ${otp} <<<`);
    console.log(`======================================================\n`);

    if (!mailConfig.isConfigured) {
      console.log(`[EmailService] (Notice: SMTP credentials not loaded in current process. OTP logged in console above)`);
      return true;
    }

    try {
      const transporter = getTransporter();
      const info = await transporter.sendMail({
        from: mailConfig.from,
        to,
        subject,
        html: htmlContent,
      });
      console.log(`[EmailService] ✅ Email delivered via SMTP! MessageId: ${info.messageId}`);
      return true;
    } catch (error: any) {
      console.error(`[EmailService] ❌ Failed to send email via SMTP (${error.message}). Code is still valid: ${otp}`);
      return true;
    }
  }

  /**
   * Send a welcome email after successful verification
   */
  static async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    console.log(`[EmailService] Welcome email queued for: ${to} (${name})`);
    if (!mailConfig.isConfigured) return true;

    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: mailConfig.from,
        to,
        subject: 'Welcome to CogniCare!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #0f766e;">Welcome to CogniCare, ${name}!</h2>
            <p>Your CogniCare account is now fully active. You can now access your cognitive health assessment dashboard.</p>
          </div>
        `,
      });
      return true;
    } catch (error: any) {
      console.error(`[EmailService] ❌ Failed to send welcome email via SMTP: ${error.message}`);
      return true;
    }
  }
}
