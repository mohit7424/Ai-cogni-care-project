import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import dotenv from 'dotenv';
import * as userSchema from './schema/userschema.js';
import * as otpSchema from './schema/otpschema.js';
import * as refreshTokenSchema from './schema/refreshtokenschema.js';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/cognicare',
});

export const db = drizzle(pool, {
  schema: {
    ...userSchema,
    ...otpSchema,
    ...refreshTokenSchema,
  },
});

