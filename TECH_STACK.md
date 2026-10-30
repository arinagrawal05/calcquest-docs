# CalcQuest Technical Architecture & Engineering Specifications

This document outlines the high-level architecture, state management patterns, data flows, and infrastructure supporting **CalcQuest**. Designed and engineered by **Arin Agrawal**, CalcQuest is built as a cross-platform Flutter application targeting Android, iOS, and Web.

---

## 1. System Overview & Core Stack

CalcQuest relies on a single high-performance codebase compiled to native machine code across platforms.

```
+-------------------------------------------------------------------+
|                        PRESENTATION LAYER                         |
|           Flutter UI (Widgets, Screens, Canvas Renderers)         |
+-------------------------------------------------------------------+
|                     STATE & BUSINESS LOGIC                        |
|        GetX Controllers (Game Engines, State, Dependency Injection)|
+-------------------------------------------------------------------+
|                     ROUTING & DEEP LINKING                        |
|          go_router (Declarative, Type-Safe Web/App Routes)        |
+-------------------------------------------------------------------+
|                     DATA & REPOSITORY LAYER                       |
|   Local Preferences / Hive Storage  <--->  Cloud Firestore Sync   |
+-------------------------------------------------------------------+
|                     EXTERNAL SERVICE ADAPTERS                     |
|  Firebase Auth | RevenueCat | Mixpanel | Play Services / Game Center |
+-------------------------------------------------------------------+
```

- **Framework:** Flutter 3.x / Dart 3.x
- **Target Platforms:** Android (ARM64/x86_64), iOS (ARM64), Web (CanvasKit / HTML)
- **Target Performance:** Locked 60 FPS / 120 FPS render loops for smooth game board animations.

---

## 2. Architecture Layers & State Management

CalcQuest follows a clean, decoupled architectural separation separating presentation, business logic, state management, and persistence:

### A. Presentation Layer (UI)
- **Reactive UI:** Flutter widgets observe state streams provided by GetX controllers.
- **Custom Game Canvas:** Complex games (e.g., Nonogram, Shikaku, Minesweeper) utilize custom painters and high-performance render objects for fluid gesture handling and grid rendering.

### B. State & Business Logic Layer (GetX)
- **GetX Controller Architecture:** Each game type (e.g., `CalculatorClassicController`, `KenKenController`, `SudokuController`) encapsulates game state, timer loops, move validation, and win/loss conditions.
- **Dependency Injection:** Services and repositories are injected lazily upon route initialization and disposed upon navigation popping, maintaining low memory usage.

### C. Type-Safe Declarative Routing (`go_router`)
- **Declarative Navigation:** Deep-linking and URL routing are driven by `go_router`.
- **Deep Link Handling:** Allows external QR code scanning or URL clicks (e.g., `calcquest://level?data=...`) to route directly into custom player-generated levels.

---

## 3. Third-Party Infrastructure & Services

| Provider / Library | Service Category | Technical Purpose in CalcQuest |
| :--- | :--- | :--- |
| **Firebase Auth** | Authentication | Anonymous guest logins seamlessly upgraded to Google/Apple accounts. |
| **Cloud Firestore** | Cloud Database | Real-time global leaderboards, user profile backup, and daily puzzle delivery. |
| **Firebase FCM** | Push Notifications | Daily challenge reminder prompts and retention triggers. |
| **Firebase Crashlytics** | Stability & Monitoring | Real-time crash logging and performance tracing across device models. |
| **Firebase Remote Config** | Dynamic Configuration | A/B testing parameters, seasonal themes, and feature toggles. |
| **RevenueCat** | Monetization Engine | In-App Purchase entitlement management for Premium unlocks and Gem packs. |
| **Mixpanel** | Product Analytics | Anonymized gameplay telemetry (level completion rates, drop-off points). |
| **Google Play Games** | Gaming Services | Android achievements, cloud saves, and global leaderboard sync. |
| **Apple Game Center** | Gaming Services | iOS achievements, cloud saves, and Leaderboard API integration. |

---

## 4. Performance, Local Persistence & Offline Strategy

### Instant Cold-Start Optimization
- **Asset Pre-Loading:** Critical puzzle definition JSON files and sound assets are pre-cached during startup, allowing cold launch to interactive menu in under 1 second.
- **Local First Database:** All 350+ campaign levels reside in local binary app assets. The game requires zero server calls to launch and play campaign or offline custom modes.

### Offline State Persistence & Cloud Sync
1. **Local Writes:** Game progress, level completions, XP, and gem balances write immediately to local encrypted storage (`shared_preferences` / local persistence).
2. **Sync Queue:** Outgoing network requests (e.g., submitting high scores or updating daily streak metrics) are queued locally if offline.
3. **Silent Cloud Sync:** Upon detecting active internet connectivity, the queue flushes to Firebase Cloud Firestore without interrupting user gameplay.
