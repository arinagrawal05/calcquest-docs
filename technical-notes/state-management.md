# State management in CalcQuest

CalcQuest manages state with GetX controllers that are created in one place at start-up and receive their dependencies through their constructors. Each piece of data has one clear owner: the player's profile and progress, streaks, purchases, the Journey, the daily challenge and duels each live in their own controller or repository. Automated checks enforce these rules on every change, so the structure does not erode as the app grows.

## Why it matters

CalcQuest grew from one calculator game to 20+ puzzle games with accounts, streaks, duels and purchases. Without clear ownership, the same value (gems, XP, a streak) could be changed from many places and drift out of sync. A planned clean-up in 2026 gave every piece of data a single owner.

## The rules

| Rule | Why |
|---|---|
| App-wide controllers are created in one place at start-up | One place to see what exists and what depends on what |
| Controllers get their dependencies through the constructor | Easy to test and to reason about |
| Widgets never read the database or device storage directly | Data access stays in repositories |
| Each kind of data has one owner | No two places disagree about your gems or streak |
| Gems change only through one method | Every change is counted, synced and tracked |
| Controllers clean up when their screen closes | No leaks between games |

A script in continuous integration checks these rules and fails the build if new code breaks them. Existing exceptions are listed in a baseline that may only shrink.

## Who owns what

| Data | Owner |
|---|---|
| Profile, gems, XP, Journey level, Premium status | The user state, saved on the device and synced to the account |
| Streak days | The streak recorder, with an offline queue |
| Purchases and Premium | The purchase controller, backed by RevenueCat |
| Journey progress | The Journey controller and progress repository |
| Daily challenge | The daily challenge controller |
| Duels | The server; the app reads them through a duel repository |
| Streak reward claims | The server |

## Guests and accounts

A guest's state lives on the device. On sign-in it becomes the new account's state at once. For an existing account, the player is shown which progress will be kept before anything is replaced.

## Offline first

The puzzle games run without a connection. Progress is saved locally and synced when the connection returns; streak days played offline are queued and sent later.

Related: [Architecture overview](architecture-overview.md) · [Mistakes and lessons](../dev-journey/mistakes-and-lessons.md)
