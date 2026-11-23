# CalcQuest architecture overview

CalcQuest is a Flutter app for Android, iOS and the web, written in Dart. It uses GetX for state and dependency injection, go_router with typed routes for navigation, Firebase for accounts, data, configuration and notifications, Cloud Functions for anything that must be trusted (duels and streak rewards), and RevenueCat for purchases. One codebase serves every platform.

## The stack

| Concern | Technology |
|---|---|
| App | Flutter (Dart), one codebase for Android, iOS and a web preview |
| State and dependency injection | GetX controllers, wired in one place at start-up |
| Navigation | go_router with typed, generated routes |
| Accounts | Firebase Authentication: phone number, Google and Apple sign-in |
| Data | Cloud Firestore for accounts, progress, friends, leaderboards and duels; on-device storage for guests and offline play |
| Server logic | Firebase Cloud Functions (TypeScript) |
| Configuration | Firebase Remote Config: Journey chapters, guest limits, duels, notifications, streak rewards |
| Notifications | Firebase Cloud Messaging for server pushes; reminders scheduled on the device, with daily and weekly caps and quiet hours |
| Purchases | RevenueCat for Premium and gem packs on both stores |
| Ads | Google AdMob, rewarded ads |
| Analytics and crashes | Mixpanel, Firebase Analytics, Firebase Crashlytics |
| Games services | Google Play Games achievements and leaderboards |
| Links | App Links and Universal Links on calcquest.app, with a deferred-link service for installs |
| Website | React and Vite, hosted on Vercel; these docs are built with VitePress |

## How the app is layered

```text
Screens and widgets          what the player sees
        |
Controllers (GetX)           app-wide: home, auth, purchases, XP, daily challenge, duels ...
                             per game: one shared base controller for every mini-game
        |
Repositories and services    user data, progress, streaks, leaderboards, links, notifications
        |
Firebase, RevenueCat, device storage, Play Games
```

Rules between layers keep the code healthy: widgets never talk to the database directly, controllers receive what they need through their constructors, and automated checks in CI stop new code from breaking these rules.

## One framework for 20+ games

Every mini-game extends a single base controller that handles the round loop, scoring, the clock, difficulty, hints, revives and results. A new game only adds its own board logic and its board UI. The same controller runs a game in Timed, Endless, Journey, daily challenge, duel and tutorial modes; only the mode setting changes. Calculator Classic, the original game, keeps its own controller.

## What runs on the server

Some decisions must not be made on the phone, where they could be changed:

| Function area | What the server decides |
|---|---|
| Duels | Creating a duel, recording results, ranking players, paying the winner's XP, ending and cleaning up duels |
| Streak rewards | Whether a player has reached a milestone, recording the claim, and switching on Premium |
| Social pushes | "Beat your time" notifications to friends, under a daily cap |
| Referrals and support | Checking invite codes, and the website's support and reward forms |

The app reads duel data but can only change it through these functions.

## Guest-first data

A guest's progress lives on the device. When the guest signs in, a new account is created from that progress at once. Streaks use an offline queue so a day played without a connection is never lost.

## Links

Every link from CalcQuest (invites, duels, games, profiles) uses the calcquest.app domain. With the app installed, the link opens the right screen directly; without it, the link goes to the store and the destination is kept through the install. A link that arrives before the app is ready is held until sign-in and loading are done.

## Quality

- A continuous-integration pipeline runs static analysis, the test suite (hundreds of Dart tests plus server-rule tests), a routes check and the architecture rules on every change.
- Releases are cut from version tags and built automatically for both stores.

Related: [Puzzle generation](puzzle-generation.md) · [State management](state-management.md)
