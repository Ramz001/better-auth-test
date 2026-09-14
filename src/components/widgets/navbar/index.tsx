'use client';

import {
  ShieldCheckIcon,
  SignInIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/primitives/avatar';
import { Button } from '@/components/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/primitives/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/primitives/navigation-menu';
import { Skeleton } from '@/components/primitives/skeleton';
import { toast } from '@/components/primitives/toast';
import { useHydrated } from '@/hooks/use-hydrated';
import { signOut, useSession } from '@/lib/auth-client';

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/auth/sign-in', label: 'Sign in' },
];

const getInitials = (name?: string | null, email?: string | null) => {
  const source = name?.trim() || email?.trim() || '';
  return source.charAt(0).toUpperCase() || '?';
};

const Navbar = () => {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const { data: session, isPending } = useSession();
  const isLoading = !hydrated || isPending;

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.add({
        type: 'error',
        title: 'Sign out failed',
        description: error.message ?? 'The session could not be cleared.',
      });
      return;
    }

    toast.add({
      type: 'success',
      title: 'Signed out',
      description: 'The active session was cleared.',
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Button
          variant="ghost"
          render={<Link href="/" />}
          nativeButton={false}
          className="shrink-0"
        >
          <ShieldCheckIcon data-icon="inline-start" />
          Better Auth Test
        </Button>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="justify-start">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  active={pathname === item.href}
                  render={<Link href={item.href} />}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <Avatar>
                  <AvatarFallback>
                    {getInitials(session.user.name, session.user.email)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span className="truncate">{session.user.name}</span>
                    <span className="truncate">{session.user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <SignOutIcon />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button render={<Link href="/auth/sign-in" />} nativeButton={false}>
              <SignInIcon data-icon="inline-start" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
