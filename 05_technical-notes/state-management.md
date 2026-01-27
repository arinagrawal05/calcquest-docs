# State Management

This document describes how CalcQuest manages application state.

## Framework

CalcQuest uses **Provider**, a state management solution recommended by the Flutter team. Provider integrates naturally with Flutter's widget tree and provides a straightforward way to share state across the application.

## Key State Objects

### GameProvider

Manages the state of an active puzzle session.

- Current display value on the calculator
- Move history
- Available operations
- Target value
- Win/lose conditions
- Undo functionality

### DashboardProvider

Handles data displayed on the main dashboard and overall progression.

- Player XP and level progress
- World unlock status
- Leaderboard data
- User profile information

### AudioController

Manages audio playback throughout the application.

- Sound effect playback
- Background music state
- Volume/mute settings

### SettingsProvider

Stores user preferences.

- Theme settings
- Sound preferences
- Notification settings

## State Persistence

### Local Storage

User progress and settings are persisted locally using SharedPreferences. This allows the game to restore state across app launches.

Persisted data includes:

- Level completion status
- XP totals
- Settings preferences
- Streak data

### Cloud Sync

When signed in, progress can be synced to Firebase. This enables cross-device continuity.

## State Lifecycle

1. **Initialization**: On app launch, providers load persisted state from local storage.
2. **Updates**: As players interact with the game, providers update state and notify listeners.
3. **Persistence**: Changes are saved to local storage and, if signed in, synced to the cloud.
4. **Cleanup**: On logout or account deletion, relevant state is cleared.

## Separation of Concerns

State management is kept separate from UI code. Widgets read state from providers and dispatch actions, but do not contain business logic. This makes the codebase easier to test and maintain.

## Scalability

The current provider-based architecture has scaled adequately for CalcQuest's complexity. If significant new features require more sophisticated state coordination, migration to a more advanced solution (such as Riverpod or Bloc) could be considered.
