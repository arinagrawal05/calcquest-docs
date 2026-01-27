# Mistakes and Lessons

This document candidly discusses challenges, mistakes, and lessons learned during CalcQuest development.

## Technical Lessons

### Underestimating Cross-Platform Complexity

While Flutter simplifies cross-platform development, platform-specific behaviors still require attention. Differences in iOS and Android handling of permissions, deep links, and app store requirements have required dedicated effort.

**Lesson**: Platform abstraction helps, but does not eliminate the need to understand each platform's ecosystem.

### State Management Complexity

As the game grew, managing application state across screens and features became more complex. Initial approaches required refactoring as the codebase expanded.

**Lesson**: Investing in scalable state management architecture early saves time later.

### Build and Dependency Management

Dependency updates, Gradle version changes, and build configuration issues have consumed significant debugging time.

**Lesson**: Keeping dependencies updated incrementally is less painful than large version jumps.

## Design Lessons

### Feature Scope Creep

The temptation to add features can delay core improvements. Balancing new content with polishing existing features requires discipline.

**Lesson**: Prioritize based on player impact, not novelty.

### Difficulty Calibration

Early levels were sometimes too challenging for new players, while later content was not challenging enough for experienced players. Feedback helped identify these imbalances.

**Lesson**: Playtesting with diverse skill levels is essential.

### Tutorial Design

Initial tutorials were either too long or too brief. Finding the right balance took iteration.

**Lesson**: Let players learn through play, but provide just enough guidance.

## Business Lessons

### Marketing as a Solo Developer

With limited resources, marketing competes with development time. Sustained visibility requires ongoing effort.

**Lesson**: Consistent, authentic engagement is more sustainable than sporadic campaigns.

### App Store Optimization

Understanding how app store algorithms work—and how metadata affects discoverability—is a skill that requires learning.

**Lesson**: Treat ASO as an ongoing process, not a one-time setup.

## Personal Lessons

### Sustainability

Solo development can lead to burnout if pace is not managed. Taking breaks and maintaining perspective is important.

**Lesson**: Sustainable progress beats unsustainable sprints.

### Community Value

Direct engagement with players is rewarding and informative. The community is an asset, not just an audience.

**Lesson**: Invest in relationships with players.
