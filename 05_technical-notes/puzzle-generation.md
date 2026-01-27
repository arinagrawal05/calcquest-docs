# Puzzle Generation

This document describes how puzzles are created in CalcQuest, covering both handcrafted content and procedural generation.

## Handcrafted Levels

The majority of CalcQuest's campaign content consists of handcrafted puzzles designed by the developer.

### Design Process

1. **Define constraints**: Choose starting number, target number, available operations, and move limit.
2. **Verify solvability**: Ensure at least one solution exists within the constraints.
3. **Calibrate difficulty**: Adjust parameters so the puzzle is appropriate for its position in the campaign.
4. **Playtest**: Solve the puzzle manually to confirm the intended experience.

### Level Format

Levels are stored as structured data containing:

- Starting value
- Target value
- Available operations (with any special modifiers)
- Move limit
- Optional metadata (hints, world assignment, difficulty tags)

## Procedural Generation (Endless Modes)

Endless modes generate puzzles algorithmically to provide infinite content.

### Generation Approach

The procedural generator works backwards from a solution:

1. **Select a target**: Choose a target number appropriate for the current difficulty.
2. **Generate a solution path**: Apply random operations in reverse to determine a starting value.
3. **Verify playability**: Confirm the puzzle is solvable and not trivial.
4. **Assign difficulty parameters**: Set move limits and constraints based on session progress.

### Benefits of Reverse Generation

Generating puzzles backwards from a known solution guarantees solvability. This avoids the need to brute-force validate randomly generated puzzles.

### Difficulty Scaling

The generator adjusts parameters as the session progresses:

- Increase number range
- Add more complex operations
- Reduce move limits
- Introduce constraints (e.g., avoid certain digits)

## Custom Level Validation

When players create custom levels, the game validates that:

- The target is reachable from the starting value using the selected operations.
- Move limits are achievable.

This prevents sharing of unsolvable puzzles.

## Special Operations

Some puzzles include non-standard operations (reverse, delete, append). The generator and validator are aware of these operations and can incorporate them into procedural puzzles.
