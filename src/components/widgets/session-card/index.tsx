'use client';

import { FingerprintIcon, SignInIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/primitives/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/primitives/empty';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/primitives/item';
import { Skeleton } from '@/components/primitives/skeleton';
import { useHydrated } from '@/hooks/use-hydrated';
import { useSession } from '@/lib/auth-client';

const SessionCard = () => {
  const hydrated = useHydrated();
  const { data: session, isPending } = useSession();
  const isLoading = !hydrated || isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current session</CardTitle>
        <CardDescription>
          Live output of the session returned by the better-auth React client.
        </CardDescription>
        <CardAction>
          <Badge variant={!isLoading && session ? 'secondary' : 'outline'}>
            {isLoading ? 'Loading' : session ? 'Signed in' : 'Guest'}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        ) : session ? (
          <ItemGroup>
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>{session.user.name}</ItemTitle>
                <ItemDescription>Name</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>{session.user.email}</ItemTitle>
                <ItemDescription>Email</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle className="truncate">{session.user.id}</ItemTitle>
                <ItemDescription>User ID</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>
                  {new Date(session.session.expiresAt).toLocaleString()}
                </ItemTitle>
                <ItemDescription>Session expires at</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FingerprintIcon />
              </EmptyMedia>
              <EmptyTitle>No active session</EmptyTitle>
              <EmptyDescription>
                Sign in to create a session cookie and inspect the payload it
                carries.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                render={<Link href="/auth/sign-in" />}
                nativeButton={false}
              >
                <SignInIcon data-icon="inline-start" />
                Go to sign in
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionCard;
