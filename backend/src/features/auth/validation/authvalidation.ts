export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
const OTP_REGEX = /^\d{6}$/;

export function validateRegister(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data?.password || typeof data.password !== 'string') {
    errors.password = 'Password is required';
  } else if (!PASSWORD_REGEX.test(data.password)) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }

  if (!data?.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!data?.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  const allowedRoles = ['caregiver', 'doctor', 'patient', 'admin'];
  if (data?.role && !allowedRoles.includes(data.role)) {
    errors.role = `Role must be one of: ${allowedRoles.join(', ')}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLogin(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data?.password || typeof data.password !== 'string' || data.password.length === 0) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateVerifyOtp(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  // Frontend might send 'otp' or 'token'
  const otpCode = data?.otp || data?.token;
  if (!otpCode || typeof otpCode !== 'string' || !OTP_REGEX.test(otpCode.trim())) {
    errors.otp = 'Verification code must be exactly 6 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateResendOtp(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateForgotPassword(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateResetPassword(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  const token = data?.token || data?.otp;
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    errors.token = 'Reset token or code is required';
  }

  const password = data?.newPassword || data?.password;
  if (!password || typeof password !== 'string') {
    errors.newPassword = 'New password is required';
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.newPassword =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }

  if (data?.confirmPassword !== undefined && data?.confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateChangePassword(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data?.currentPassword || typeof data.currentPassword !== 'string') {
    errors.currentPassword = 'Current password is required';
  }

  if (!data?.newPassword || typeof data.newPassword !== 'string') {
    errors.newPassword = 'New password is required';
  } else if (!PASSWORD_REGEX.test(data.newPassword)) {
    errors.newPassword =
      'New password must be at least 8 characters with uppercase, lowercase, number, and special character';
  }

  if (data?.confirmPassword !== undefined && data?.confirmPassword !== data?.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

