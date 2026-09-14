import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import {
  admin,
  anonymous,
  emailOTP,
  haveIBeenPwned,
  lastLoginMethod,
  magicLink,
  multiSession,
  openAPI,
  organization,
  testUtils,
  twoFactor,
} from 'better-auth/plugins';
import db from './db';

const auth = betterAuth({
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
export default auth;
