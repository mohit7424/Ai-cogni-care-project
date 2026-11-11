import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from './userschema.js';

export const otps = pgTable('otps', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  otpCode: varchar('otp_code', { length: 10 }).notNull(),
  purpose: varchar('purpose', { length: 50 }).notNull().default('email_verification'),
  isUsed: boolean('is_used').notNull().default(false),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export type Otp = typeof otps.$inferSelect;
export type NewOtp = typeof otps.$inferInsert;

