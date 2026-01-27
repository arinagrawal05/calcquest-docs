# Puzzle Types

CalcQuest includes a variety of puzzle types built around the core calculator mechanic. Each type introduces different constraints or objectives.

## Core Mechanics

All puzzles share a common foundation:

1. A **current value** displayed on the calculator.
2. A **target value** the player must reach.
3. A set of **available operations** to apply.
4. Constraints such as **move limits**.

## Standard Puzzles

The most common puzzle type. Players have a starting number, a target number, and a set of operations. The goal is to reach the target in a specified number of moves or fewer.

### Example

- Start: 0
- Target: 10
- Operations: +5, ×2
- Move limit: 3
- Solution: +5, +5 (2 moves) or +5, ×2 (2 moves reaching 10)

## Operation-Locked Puzzles

Some puzzles restrict which operations are available. This forces players to find creative solutions using a limited toolset.

### Variations

- Addition only
- Multiplication and division only
- Single-digit operations only

## Multi-Step Puzzles

Complex puzzles where the solution requires a specific sequence of many operations. These test planning and foresight rather than arithmetic speed.

## Negative Number Puzzles

Puzzles that require working with or through negative numbers to reach the target. This adds complexity for players who may not immediately consider subtracting past zero.

## Special Operation Puzzles

Some puzzles introduce non-standard operations:

- **Reverse**: Reverses the digits of the current number.
- **Delete**: Removes the last digit.
- **Append**: Adds a digit to the end of the current number.
- **Replace**: Substitutes one digit for another.

These operations require thinking beyond standard arithmetic.

## Constraint Puzzles

Puzzles with additional constraints beyond move limits:

- **No specific digit**: Cannot have a certain digit appear at any step.
- **Stay positive**: Cannot go negative during the solution.
- **Exact moves**: Must use exactly the specified number of moves.

## Procedural Puzzles (Endless Modes)

In endless modes, puzzles are generated algorithmically. The generator ensures each puzzle is solvable and adjusts parameters based on the session's difficulty level.
