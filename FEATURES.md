# CalcQuest Features, Systems & Progression Hub

This document details the complete player experience ecosystem in **CalcQuest**, encompassing daily gameplay habit loops, custom content creation, competitive social systems, progression mechanics, monetization philosophy, and offline technology.

---

## 1. Daily Challenge & Global Streaks

### Worldwide Synchronized Challenges
Every midnight (00:00 UTC), CalcQuest releases **4 unique Daily Puzzles** curated across four distinct game categories and difficulty tiers (Easy, Medium, Hard, Expert).
- **Synchronized Seed:** Puzzles are deterministic and identical for every player worldwide on a given date.
- **Fair Leaderboards:** Because all players face identical puzzle seeds, daily leaderboards reflect pure logical speed and efficiency.

### Streak Engine & Retention Mechanics
- **Streak Counter:** Completing all 4 daily puzzles increments the player's active Daily Streak.
- **Streak Saver / Freeze:** Players can utilize earned gems or streak protection cards to preserve their streak if real life interrupts a daily session.
- **Milestone Rewards:** Reaching streak milestones (7 Days, 30 Days, 100 Days, 365 Days) unlocks exclusive cosmetic badges, special app icons, and substantial gem bonuses.

---

## 2. Level Editor & Custom Puzzle Creation

### In-Game Sandbox & Level Design
CalcQuest includes a robust **Custom Level Creator** that empowers players to become puzzle designers for the **Calculator Classic** engine.
- **Starting & Target Values:** Set arbitrary start numbers and target goals.
- **Move Limits:** Configurable move caps from 1 to 20 moves.
- **Keypad Builder:** Select custom operator sets from arithmetic (`+`, `-`, `×`, `÷`), digit appends (`1`, `2`, `0`), string operations (`Reverse`, `<<`), and replacement rules (`1=>5`).
- **Validation Engine:** Before publishing, creators must solve their own puzzle to verify that a valid solution path exists.

### QR Code & String Share Architecture
- **Instant QR Generation:** Created puzzles generate a compact, scannable QR code on-screen.
- **Base64 String Sharing:** Puzzles serialize into lightweight encoded strings (e.g., `CQ-LVL-A9F32K`) for easy copy-pasting across social media or messaging platforms.
- **Zero Account Barrier:** Recipients can scan or paste codes to play custom levels instantly—no user registration required.

---

## 3. Social, Competition & Leaderboards

### Global & Friends Leaderboards
- **Daily Leaderboards:** Tracks top completion times for the worldwide Daily Challenge.
- **All-Time Endless Rankings:** High-score leaderboards for Endless mode survival runs.
- **Platform Game Integration:** Seamlessly synced with **Google Play Games Services** and **Apple Game Center** for native achievements and friend score comparisons.

### Custom Friend Challenges
- Players can directly challenge friends by sharing individual level solve times or sending custom-built QR code puzzles.

---

## 4. Progression, XP & Gem Economy

### Player Leveling & XP Curves
- **Experience Points (XP):** Earned by clearing campaign levels, solving daily challenges, playing endless rounds, and unlocking achievements.
- **Milestone Levels:** Player levels unlock prestigious milestone badges, profile custom frames, and bonus rewards.

### Virtual Currency (Gems)
- **Earned naturally:** Gems are awarded through level completions, daily streaks, level-ups, and achievements.
- **Utility:**
  - **Logical Hints:** Reveal the next optimal move step when stuck.
  - **Level Skips:** Skip particularly grueling campaign levels to maintain progression flow.
  - **Cosmetic Avatars & Themes:** Unlock custom calculator color palettes, dark themes, and profile avatars.

---

## 5. Ethical Monetization & Ad Philosophy

CalcQuest was built on a foundational promise: **Respect the Player.**

```
+-------------------------------------------------------------------+
|                     CALCQUEST ETHICAL FAIR PLAY                   |
+-------------------------------------------------------------------+
|  [X] ZERO Forced Mid-Game Ads    (No banner ads cluttering UI)    |
|  [X] ZERO Interstitial Popups    (No popups between puzzle rounds) |
|  [✓] 100% Opt-In Rewarded Video  (Only watch if YOU request gems) |
|  [✓] Optional One-Time Premium   (Unlock unlimited perks forever) |
+-------------------------------------------------------------------+
```

### Key Monetization Pillars
1. **Zero Forced Ads:** Players will never experience a surprise ad popup mid-puzzle or forced video breaks between levels.
2. **Opt-In Rewarded Ads:** Video ads exist strictly as an optional choice. If a player runs low on gems, they may voluntarily choose to watch a rewarded ad to gain bonus hints.
3. **One-Time Premium Unlock:** A non-intrusive, single purchase unlocks Premium status forever—granting infinite hints, exclusive cosmetic themes, and removing all rewarded ad prompts completely.

---

## 6. Offline Accessibility Architecture

CalcQuest is designed to be **100% playable anywhere, anytime**:
- **Local Campaign Database:** All 350+ campaign levels and game logic engines are embedded locally in the app bundle.
- **Offline State Persistence:** User progression, XP, unlocked themes, and custom levels are saved to local device storage immediately.
- **Background Synchronization:** When an internet connection is restored, local progress, offline high scores, and daily streak validation sync silently with Firebase Cloud Firestore.
