**The engine under the hood.** 
CalcQuest is more than just a calculator—it's a multi-layered Flutter application designed for performance, cross-platform stability, and reactive gameplay. This document outlines the technology stack and structural choices that power the experience.

## Technology Stack

- **Framework**: Flutter
- **Language**: Dart
- **Platforms**: Android, iOS
- **Backend Services**: Firebase (for DB, analytics, crash reporting, remote configuration)
- **Advertising**: Google AdMob
- **Analytics**: Mixpanel
- **In-app Purchases**: RevenueCat
- **Authentication**: Google Sign-In, Sign in with Apple
- **Leaderboards**: Google Play Games Services

## Application Structure

CalcQuest follows a layered architecture common in Flutter applications.

### Presentation Layer

Responsible for rendering the user interface and handling user input.

- **Screens**: Top-level views representing major navigation destinations (dashboard, game screen, level editor, settings).
- **Widgets**: Reusable UI components (buttons, calculator display, level selection tiles).
- **Providers**: State management objects that connect business logic to the UI.

### Business Logic Layer

Contains the core game logic independent of the UI.

- **Puzzle Engine**: Validates moves, checks win conditions, manages current game state.
- **Level Management**: Loads, parses, and sequences levels from campaign data.
- **Procedural Generation**: Creates puzzles for endless modes.
- **Progression System**: Tracks player progress, XP, and unlocks.

### Data Layer

Handles persistence and external services.

- **Local Storage**: Shared preferences for settings, local progress data.
- **Cloud Sync**: Firebase integration for cross-device progress (when signed in).
- **Remote Configuration**: Feature flags and content updates via Firebase Remote Config.

## State Management

CalcQuest uses **GetX** for state management, chosen for its high-performance reactive capabilities, dependency injection, and simplified route management.

Key state objects include:

- **GameController**: Manages active puzzle state.
- **DashboardController**: Handles dashboard data, XP, and level progress.
- **AudioController**: Manages sound effects and music.

## Navigation

Navigation uses GoRouter with named routes. Deep links are supported for level sharing functionality.

## Platform-Specific Considerations

### Android

- Uses Google Play Games Services for leaderboards and achievements.
 
### iOS

- Uses Game Center where applicable.
- Sign in with Apple for authentication.
- App Tracking Transparency (ATT) for ad-related permissions.

## Modularity

The codebase is organized by feature rather than by layer, making it easier to locate related code. Each major feature (game, level editor, settings) has its own directory containing screens, widgets, and logic.
