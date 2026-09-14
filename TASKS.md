# Better Auth — feature to-do list

Every plugin is already switched on in the server config, but most of them have
nowhere in the app to actually be used. This list is about *building those
features* so each one can be clicked, tried and verified.

Legend: `[ ]` to do · `[~]` in progress · `[x]` done · `[!]` blocked

---

## 0. First things first (small unblockers)

- [ ] **Turn on the sign-in features in the browser.** Almost every item below
      can't be clicked yet because the client-side auth setup only knows the
      basics. Biggest blocker — do this first.
- [ ] **Get a real email sender.** Invites, magic links and one-time codes
      currently only print to the server console, so nothing can actually be
      received.
- [ ] **Two small database additions.** Store "last sign-in method" per user, and
      add tables for teams and custom roles (needed for §4).
- [ ] **Set up the test setup.** A test runner plus a test-only auth config, so
      features can be checked automatically instead of only by hand.
- [ ] **Take the testing helper out of the live config.** It's meant for test
      runs only and exposes ways to create users and sessions.
- [ ] **Fix the redirect for protected pages.** It currently sends visitors to a
      page that doesn't exist, and it doesn't match any real page either.
- [ ] **Build a real sign-in page** (there's a placeholder there now).

---

## 1. Accounts (the basics)

- [ ] Sign up with email + password
- [ ] Sign in / sign out
- [ ] See who's signed in
- [ ] Profile page: name, email, avatar
- [ ] Change name / avatar
- [ ] Change password
- [ ] Delete my account
- [ ] "Forgot password" — send a reset email
- [ ] Verify email after signing up
- [ ] Sign in with GitHub
- [ ] Link or unlink a GitHub account
- [ ] Friendly message when a password is too weak or has been leaked

## 2. Easier ways to sign in

- [ ] Magic link — an emailed link that signs you in
- [ ] One-time code sent to your email
- [ ] Use an emailed code to reset a forgotten password
- [ ] Continue as a guest (try the app before signing up)
- [ ] Turn a guest into a real account without losing what they did as a guest
- [ ] Show "last time you signed in with …" on the sign-in page

## 3. Account security

- [ ] Two-factor: set up with an authenticator app (QR code)
- [ ] Show backup codes, let me download them, each usable once
- [ ] Turn 2FA off again
- [ ] Extra step at sign-in when 2FA is on
- [ ] Temporarily lock out after too many wrong codes
- [ ] Devices list: where am I signed in, sign out one device, sign out everywhere
- [ ] Use two accounts at the same time and switch between them

## 4. Organizations

**Getting started**
- [ ] Create an organization (name, logo, short URL name)
- [ ] Switch between my organizations
- [ ] Organization settings: rename, change logo, delete
- [ ] Show the current organization in the header

**People**
- [ ] See the member list
- [ ] Invite someone by email, with an invitation email
- [ ] Accept or decline an invite
- [ ] Cancel a pending invite / invite again
- [ ] Change someone's role
- [ ] Remove a member
- [ ] Leave an organization
- [ ] Protect the last owner (can't be removed or demoted)

**Roles & permissions**
- [ ] Default roles: owner, admin, member
- [ ] Decide what each role is allowed to do (e.g. only admins can delete projects)
- [ ] Custom permissions for our own features, not just the built-in ones
- [ ] Hide or disable what someone can't do — *and* block it on the server too
- [ ] Custom roles: create a role with its own permissions, per organization
- [ ] Changing someone's role takes effect right away

**Teams**
- [ ] Create teams inside an organization
- [ ] Add and remove team members, view team members
- [ ] A team lead / team-level permissions
- [ ] Invite someone straight into a team

**Limits**
- [ ] Max organizations per person, with a clear "you've reached your limit" message
- [ ] Max members per organization, same kind of message

## 5. Admin tools

- [ ] Admin area, visible only to admins
- [ ] User list with search and paging
- [ ] Create a user from the admin area
- [ ] Change a user's role
- [ ] Ban / unban a user, with a reason and optional end date
- [ ] Banned user sees why they can't sign in
- [ ] Reset a user's password
- [ ] See a user's sessions and sign them out
- [ ] Delete a user
- [ ] "Sign in as this user" to help them, with a clear banner and an exit button

## 6. Nice to have

- [ ] API reference page (handy for testing and for other developers)
- [ ] One dev-only page where every feature can be poked at and its result inspected
- [ ] Helpful error messages everywhere, instead of raw errors
- [ ] Protection against hammering sign-in / email sending (rate limits)
- [ ] Check that sessions stop working quickly after signing out
- [ ] Go through everything once in a production build with real cookies

---

## Notes

- Order of work suggestion: §0 → §1 → §3 → §4 → §2 → §5 → §6.
- Organizations (§4) is the biggest chunk and the most used — treat
  "roles & permissions" as its own milestone.

## Findings

> One line per surprise: `date — what happened — what fixed it`.

-
