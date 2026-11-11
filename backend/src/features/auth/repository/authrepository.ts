import { eq, and, gt, desc } from 'drizzle-orm';
import { db } from '../../../DB/index.js';
import { users, type User, type NewUser } from '../../../DB/schema/userschema.js';
import { otps, type Otp, type NewOtp } from '../../../DB/schema/otpschema.js';
import { refreshTokens, type RefreshToken, type NewRefreshToken } from '../../../DB/schema/refreshtokenschema.js';

export class AuthRepository {
  // ================= USERS =================

  static async findUserByEmail(email: string): Promise<User | null> {
    const results = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
    return results[0] || null;
  }

  static async findUserById(id: string): Promise<User | null> {
    const results = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return results[0] || null;
  }

  static async findUserByGoogleId(googleId: string): Promise<User | null> {
    const results = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);
    return results[0] || null;
  }

  static async createUser(userData: NewUser): Promise<User> {
    const results = await db
      .insert(users)
      .values({
        ...userData,
        email: userData.email.toLowerCase().trim(),
      })
      .returning();
    return results[0];
  }

  static async updateUser(id: string, updates: Partial<NewUser>): Promise<User | null> {
    const results = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return results[0] || null;
  }

  static async markUserEmailVerified(userId: string): Promise<User | null> {
    const results = await db
      .update(users)
      .set({
        isEmailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return results[0] || null;
  }

  static async updateUserPassword(userId: string, passwordHash: string): Promise<User | null> {
    const results = await db
      .update(users)
      .set({
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return results[0] || null;
  }

  // ================= OTPS =================

  static async createOtp(otpData: NewOtp): Promise<Otp> {
    const results = await db.insert(otps).values(otpData).returning();
    return results[0];
  }

  static async findValidOtp(email: string | undefined, otpCode: string, purpose: string): Promise<Otp | null> {
    const conditions = [
      eq(otps.otpCode, otpCode.trim()),
      eq(otps.purpose, purpose),
      eq(otps.isUsed, false),
      gt(otps.expiresAt, new Date()),
    ];

    if (email && email.trim().length > 0) {
      conditions.push(eq(otps.email, email.toLowerCase().trim()));
    }

    const results = await db
      .select()
      .from(otps)
      .where(and(...conditions))
      .orderBy(desc(otps.createdAt))
      .limit(1);

    return results[0] || null;
  }

  static async markOtpUsed(id: string): Promise<void> {
    await db.update(otps).set({ isUsed: true }).where(eq(otps.id, id));
  }

  static async invalidatePreviousOtps(email: string, purpose: string): Promise<void> {
    await db
      .update(otps)
      .set({ isUsed: true })
      .where(
        and(
          eq(otps.email, email.toLowerCase().trim()),
          eq(otps.purpose, purpose),
          eq(otps.isUsed, false)
        )
      );
  }

  // ================= REFRESH TOKENS =================

  static async createRefreshToken(tokenData: NewRefreshToken): Promise<RefreshToken> {
    const results = await db.insert(refreshTokens).values(tokenData).returning();
    return results[0];
  }

  static async findRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
    const results = await db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          eq(refreshTokens.isRevoked, false),
          gt(refreshTokens.expiresAt, new Date())
        )
      )
      .limit(1);

    return results[0] || null;
  }

  static async revokeRefreshToken(tokenHash: string): Promise<void> {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.tokenHash, tokenHash));
  }

  static async revokeAllUserTokens(userId: string): Promise<void> {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.userId, userId));
  }
}

