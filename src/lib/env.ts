import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // Server
  PORT: z.coerce
    .number({ error: 'PORT must be a number' })
    .int('PORT must be an integer')
    .positive('PORT must be a positive integer')
    .max(65535, 'PORT must be between 1 and 65535')
    .default(3000),

  // Database — must be a Postgres connection string
  DATABASE_URL: z
    .string({ error: 'DATABASE_URL is required' })
    .min(1, 'DATABASE_URL cannot be empty')
    .refine(
      (value) => /^postgres(ql)?:\/\/.+/i.test(value),
      'DATABASE_URL must be a valid postgres:// or postgresql:// connection string',
    ),
  // Better Auth URL
  BETTER_AUTH_URL: z
    .url({ error: 'BETTER_AUTH_URL is required' })
    .min(1, 'BETTER_AUTH_URL cannot be empty'),

  // Better Auth Secret
  BETTER_AUTH_SECRET: z
    .string({ error: 'BETTER_AUTH_SECRET is required' })
    .min(1, 'BETTER_AUTH_SECRET cannot be empty'),
});

const { data: env, error } = envSchema.safeParse(process.env);

if (error) {
  console.error(`❌ Invalid environment variables:\n${z.prettifyError(error)}`);
  process.exit(1);
}

export default env;
