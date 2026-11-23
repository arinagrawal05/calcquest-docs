# CalcQuest UX decisions

This page records the main user-experience decisions behind CalcQuest and the reasoning for each: why the Journey mixes puzzle games, why you can play without an account, why there are no lives or energy timers, why tutorials teach by playing, and why duels are asynchronous. Each decision follows from the [design principles](principles.md).

## A Journey that mixes games

**Decision.** The main mode is a map where every level is a short run of different puzzle games.

**Why.**
- A fixed list of hand-made levels runs out. Early CalcQuest players finished every level, then left. Mixing 20+ games gives the Journey fresh content without limit.
- One level exercises several skills at once: logic, arithmetic, memory and spatial reasoning.
- Players meet games they would never have opened on their own.

## A puzzle collection, not a single game

**Decision.** CalcQuest offers 20+ puzzle games in one app, grouped into Logic, Puzzle, Math and Memory.

**Why.** Players have different favourites, and favourites change. A collection keeps a player's daily habit inside one app, with one streak and one set of friends.

## Guest-first play

**Decision.** A new player types a name and starts playing at once. Sign-in (phone, Google or Apple) comes later.

**Why.**
- The most successful puzzle games start within seconds. Every form before the first puzzle loses players.
- An account is easier to justify once there is something to protect, such as a streak or friends.
- Signing in creates the account straight away, from the name the player already gave, with no profile form.

## No lives, energy or waiting

**Decision.** There are no lives, energy bars or cooldown timers.

**Why.** Puzzles need focus, and a game that blocks you after a few mistakes punishes learning. Gems buy hints and revives instead, and gems are earned by playing.

## Tutorials you play

**Decision.** The first time you open a game, a one-round tutorial teaches it by playing, with the rules a tap away afterwards.

**Why.** People learn rules faster by doing than by reading. Returning players are never forced through it again.

## Asynchronous duels

**Decision.** In a duel, each player plays the same board in their own time, within 48 hours.

**Why.** Real-time matches need both players online at once and often pair you with strangers. Asynchronous duels work across time zones and busy days, and keep competition between people who know each other.

## A daily challenge that is the same for everyone

**Decision.** The daily challenge uses the same four games for every player, with one attempt.

**Why.** A shared puzzle gives people something to talk about and compare, and a single attempt keeps the leaderboard fair.

## Calm celebrations

**Decision.** Wins, level-ups, streak milestones and chapter clears get full-screen celebrations, with reduced motion respected.

**Why.** Satisfying feedback is what makes a solve feel good. Players asked for it, and it rewards the effort a puzzle took.

## Consistent look in light and dark

**Decision.** One design system across every game and screen, in light and dark mode.

**Why.** Switching between 20+ games should feel like one app, not a bundle of separate ones.

## What changed from earlier versions

| Earlier | Now | Reason |
|---|---|---|
| Worlds of calculator levels as the main mode | The Journey of mixed puzzle stages | Fixed levels ran out; mixed stages do not |
| Sign-up and a profile form before playing | Guest-first, account later | Fewer players lost at the start |
| "Multiplayer coming soon" | Asynchronous friend duels | Shipped in version 2.2 |

Related: [Principles](principles.md) · [From calculator game to brain puzzles](../dev-journey/from-calculator-game-to-brain-puzzles.md)
