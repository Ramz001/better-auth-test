'use client';

import {
  ArrowRightIcon,
  BuildingsIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  FingerprintIcon,
  GithubLogoIcon,
  KeyIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/primitives/card';
import SessionCard from '@/components/widgets/session-card';

const testAreas = [
  {
    title: 'Email & password',
    description:
      'signIn.email and signUp.email flows driven from the sign-in page.',
    status: 'Wired',
    variant: 'secondary' as const,
    icon: KeyIcon,
  },
  {
    title: 'Sessions',
    description:
      'The card above and the account menu in the navbar both read the session.',
    status: 'Wired',
    variant: 'secondary' as const,
    icon: FingerprintIcon,
  },
  {
    title: 'Drizzle schema',
    description:
      'Auth tables are defined in src/db/schema.ts. Run auth:generate and db:migrate before testing.',
    status: 'Migrate first',
    variant: 'outline' as const,
    icon: DatabaseIcon,
  },
  {
    title: 'Social providers',
    description:
      'auth.ts reads GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to enable signIn.social.',
    status: 'Needs credentials',
    variant: 'outline' as const,
    icon: GithubLogoIcon,
  },
  {
    title: 'Two-factor',
    description:
      'The twoFactor plugin runs on the server; the client needs twoFactorClient and a setup UI.',
    status: 'Server only',
    variant: 'outline' as const,
    icon: ShieldCheckIcon,
  },
  {
    title: 'Organizations',
    description:
      'Same split: the organization plugin is enabled server-side, organizationClient is not wired up.',
    status: 'Server only',
    variant: 'outline' as const,
    icon: BuildingsIcon,
  },
  {
    title: 'Email OTP & magic links',
    description:
      'emailOTP and magicLink are enabled; both log their message to the dev server console.',
    status: 'Logs to console',
    variant: 'outline' as const,
    icon: EnvelopeSimpleIcon,
  },
  {
    title: 'Admin & multi-session',
    description:
      'admin, anonymous, multiSession, lastLoginMethod and testUtils are all enabled server-side.',
    status: 'Server only',
    variant: 'outline' as const,
    icon: UserCircleIcon,
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:py-16">
      <section className="flex flex-col gap-5">
        <Badge variant="secondary" className="w-fit">
          <SparkleIcon data-icon="inline-start" />
          better-auth playground
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Exercise better-auth flows in a real Next.js app
        </h1>
        <p className="max-w-2xl text-sm/relaxed text-muted-foreground sm:text-base/relaxed">
          The server handler is mounted at /api/auth/[...all] and backed by the
          Drizzle adapter. Use this page to confirm what the client knows about
          the current session, then drive the individual flows from the routes
          below.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button render={<Link href="/auth/sign-in" />} nativeButton={false}>
            Open sign-in page
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            render={
              <a
                href="https://www.better-auth.com/docs"
                target="_blank"
                rel="noreferrer"
              />
            }
            nativeButton={false}
          >
            better-auth docs
          </Button>
        </div>
      </section>

      <SessionCard />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Test areas
          </h2>
          <p className="text-sm text-muted-foreground">
            Each card maps to a surface that is already wired up or waiting on
            configuration.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testAreas.map(
            ({ title, description, status, variant, icon: AreaIcon }) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AreaIcon size={20} aria-hidden="true" />
                    {title}
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                  <CardAction>
                    <Badge variant={variant}>{status}</Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
