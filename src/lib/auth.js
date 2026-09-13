import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from './db';
import { nextCookies } from 'better-auth/next-js';
import { twoFactor } from 'better-auth/plugins';
import { anonymous } from 'better-auth/plugins';
import { magicLink } from 'better-auth/plugins';
import { emailOTP } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';
import { organization } from 'better-auth/plugins';
import { openAPI } from 'better-auth/plugins';
import { testUtils } from 'better-auth/plugins';
import { haveIBeenPwned } from 'better-auth/plugins';
import { lastLoginMethod } from 'better-auth/plugins';
import { multiSession } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    twoFactor(),
    admin(),
    emailOTP({
      // TODO: swap for a real email provider
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`[auth] ${type} OTP for ${email}: ${otp}`);
      },
    }),
    multiSession(),
    organization(),
    magicLink({
      // TODO: swap for a real email provider
      async sendMagicLink({ email, url }) {
        console.log(`[auth] Magic link for ${email}: ${url}`);
      },
    }),
    haveIBeenPwned(),
    lastLoginMethod(),
    openAPI(),
    testUtils(),
    anonymous(),
    nextCookies(),
  ],
});
