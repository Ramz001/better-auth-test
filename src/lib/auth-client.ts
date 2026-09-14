import { createAuthClient } from 'better-auth/react';
import type auth from './auth';

export type Session = typeof auth.$Infer.Session;

/**
 * No explicit `baseURL`: better-auth falls back to `BETTER_AUTH_URL` on the
 * server and `window.location.origin` in the browser. That keeps the
 * server-only env module out of client bundles.
 */
export const authClient = createAuthClient();

export const { signIn, signUp } = authClient;

/**
 * `signOut({})` is the same call as `signOut()` — the generated types of this
 * client require the (empty) context argument to be passed explicitly.
 */
export const signOut = () => authClient.signOut({});

/**
 * The generated client types collapse `useSession().data` to `never` with this
 * TypeScript version, so the hook is re-typed from the server schema.
 */
type ClientSessionState = ReturnType<typeof authClient.useSession>;

export type SessionState = Omit<ClientSessionState, 'data'> & {
  data: Session | null;
};

export const useSession =
  authClient.useSession as unknown as () => SessionState;
