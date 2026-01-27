# State Management

This document describes how CalcQuest manages application state.

## Framework

CalcQuest uses **GetX**, a high-performance state management solution for Flutter. GetX provides a simplified way to manage reactive state, dependency injection, and route management without the complexity of boilerplate code.

## Key State Objects

### GameController

Manages the state of an active puzzle session.

- Current display value on the calculator
- Move history
- Available operations
- Target value
- Win/lose conditions
- Undo functionality

### DashboardController

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

### SettingsController

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

1. **Initialization**: On app launch, controllers load persisted state from local storage.
2. **Updates**: As players interact with the game, controllers update state reactively.
3. **Persistence**: Changes are saved to local storage and, if signed in, synced to the cloud.
4. **Cleanup**: On logout or account deletion, relevant state is cleared.

## Separation of Concerns

State management is kept separate from UI code. Widgets interact with controllers to read reactive state and dispatch actions, ensuring business logic is decoupled from the view layer.

## Scalability

The current GetX-based architecture has scaled efficiently for CalcQuest's complexity. Its reactive nature allows for high performance even as more features are added.
