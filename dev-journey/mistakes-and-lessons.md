# CalcQuest mistakes and lessons

Building CalcQuest alone since 2024 has meant plenty of wrong turns. The biggest lessons: a fixed set of levels runs out, the first minute decides whether a player stays, state management has to scale before the app does, and a solo developer has to choose ruthlessly. This page records those lessons honestly, so other builders can skip a few of them.

## Product lessons

### Fixed content runs out

CalcQuest launched with 135 handmade levels and added 250 more. Each time, the best players finished everything and left. **Lesson:** handcrafted content gives a game its soul; generated content gives it a future. CalcQuest now needs both.

### The first minute decides

Early versions asked for sign-up and a profile (name, avatar, age and more) before the first puzzle. Some players never got past it. **Lesson:** let people play first. Ask for an account when there is something worth saving.

### One game was too narrow

The calculator mechanic was distinctive, but many players wanted variety. **Lesson:** a strong core is a start, not a whole product. The move to a brain puzzle game is told in [From calculator game to brain puzzles](from-calculator-game-to-brain-puzzles.md).

### Promise only what exists

Older store copy and docs described features, such as sharing custom levels by QR code, that never fully worked. **Lesson:** describe what the app does today. These docs now keep every claim in one place, [Facts and figures](../facts.md).

### Tutorials need balance

The first tutorials were either too long or too short, and a new player's first reaction was often "what is the goal here?" **Lesson:** teach by letting people play one round, and keep the rules a tap away.

## Technical lessons

### State management has to scale early

As CalcQuest grew to 20+ games, state spread across screens became hard to reason about. A planned clean-up moved data into clear owners and controllers, with automated checks that stop the old patterns from returning. **Lesson:** a little structure early saves a large rewrite later. See [State management](../technical-notes/state-management.md).

### Cross-platform still means two platforms

Flutter gives one codebase, but deep links, sign-in, purchases and store review differ on Android and iOS. **Lesson:** budget time for each platform's rules.

### Releases need guard rails

A release tag ships straight to the stores, so analysis and tests must run before it, not after. **Lesson:** automate the checks you would otherwise forget at midnight.

### Trust the server for anything that matters

Duel results and streak rewards are decided by server functions, not the phone. **Lesson:** anything with real value, such as a reward or a win, must be checked where players cannot change it.

## Business lessons

- **Marketing competes with building.** Consistent, honest posting beats occasional big pushes.
- **Store listings are a product too.** The title, screenshots and first lines decide who installs.
- **Be one product everywhere.** The stores, the website and the docs should all describe the same game.

## Personal lessons

- Sustainable pace beats sprints. Burnout helps no one, least of all the players.
- The community is not an audience; it is a partner. The best ideas came from players.

Related: [Growth and feedback](growth-and-feedback.md) · [Origin story](origin-story.md)
