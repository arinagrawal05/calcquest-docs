# CalcQuest Game Encyclopedia: The Complete 22-Game Suite

Welcome to the official game encyclopedia for **CalcQuest**. This document provides an exhaustive reference for all 22 games included in the CalcQuest ecosystem, starting with a deep dive into our foundational hero mechanic—**Calculator Classic**—and covering every game across five cognitive categories.

---

## 1. The Hero Mechanic: Calculator Classic (`calculator_classic`)

### Overview & Core Philosophy
**Calculator Classic** is the signature puzzle experience that inspired the entire CalcQuest platform. Rather than testing passive arithmetic recall or flashcard speed, Calculator Classic transforms a simulated digital calculator into an intricate logic puzzle board.

### Mechanics & How It Works
- **Starting Display:** Each level presents an initial starting number on the calculator LCD display (e.g., `0`, `12`, or `105`).
- **Target Goal:** A clear target number is defined (e.g., `42`). The player's goal is to manipulate the starting number until the display matches the target value exactly.
- **Move Budget:** Players are granted a strict maximum number of allowed moves (e.g., `4 Moves`). Every keypress consumes exactly one move.
- **Restricted Keypad:** Unlike a standard calculator, the player is provided with a restricted, custom-curated set of action buttons. These key types include:
  - **Standard Arithmetic:** `+5`, `-3`, `x2`, `/4`
  - **Digit Insertion / Append:** `1` (appends '1' to the right of the display, turning `4` into `41`), `0`
  - **Digit Operations:** `<<` (backspace/delete rightmost digit), `+/-` (toggle sign)
  - **Transformations:** `Reverse` (reverses digits, turning `12` into `21`), `Shift` (rotates digits left or right)
  - **Replacement Rules:** `1=>2` (replaces all occurrences of digit `1` with `2`)
  - **Store / Recall:** Store current values into memory slots to apply later.

### Logical Thinking & Problem Solving
Calculator Classic forces players to work backward from the target or evaluate state-space trees forward. It challenges players to overcome mental arithmetic biases, discover non-obvious transformation pathways, and budget moves efficiently.

---

## 2. Comprehensive Breakdown of All 22 Games

### Category 1: Arithmetic & Mental Calculation

#### 1. Calculator Classic
- **Identifier:** `calculator_classic`
- **Objective:** Reach the exact target display number from a given starting value within a limited move budget.
- **How It Works:** Use restricted button sets containing arithmetic operators, digit appends, backspace, string reversals, and number replacement functions.
- **Cognitive Skills Trained:** Deductive logic, inverse problem solving, working memory, spatial-numerical transformation.

#### 2. Mental Arithmetic
- **Identifier:** `mental_arithmetic`
- **Objective:** Rapidly solve continuous mental math equations under clock pressure.
- **How It Works:** Players are presented with multi-step arithmetic expressions (addition, subtraction, multiplication, division). Inputs must be entered via numeric keypad before the countdown expires.
- **Cognitive Skills Trained:** Calculation speed, fluid intelligence, mental arithmetic stamina, processing speed.

#### 3. Correct Answer
- **Identifier:** `correct_answer`
- **Objective:** Evaluate and verify whether arithmetic statements or multiple choices are true or false.
- **How It Works:** A rapid series of math equations is displayed (e.g., `14 × 3 = 42` or `78 - 19 = 57`). Players tap True/False or select the correct choice among distractors under tight time constraints.
- **Cognitive Skills Trained:** Rapid error detection, visual verification, executive functioning, cognitive flexibility.

#### 4. Quick Calculation
- **Identifier:** `quick_calculation`
- **Objective:** Sharpen arithmetic reflexes by completing speed drills in rapid succession.
- **How It Works:** Focuses on foundational single-digit and double-digit operations with instant feedback, measuring response time in milliseconds.
- **Cognitive Skills Trained:** Mental math agility, reaction time, numerical fluency, impulse control.

#### 5. Square Root
- **Identifier:** `square_root`
- **Objective:** Calculate roots, estimate non-perfect squares, and recognize perfect square numbers.
- **How It Works:** Puzzles prompt players to identify exact square roots or place irrational square roots between consecutive integer bounds.
- **Cognitive Skills Trained:** Number sense, radical estimation, mathematical intuition, exponent familiarity.

---

### Category 2: Grid & Deductive Logic

#### 6. Mini Sudoku
- **Identifier:** `mini_sudoku`
- **Objective:** Complete a 6×6 grid using digits 1 through 6 with zero repetition across rows, columns, or 2×3 sub-boxes.
- **How It Works:** Given a grid with initial clue numbers, players deduce and fill remaining cells using pure logic without guessing.
- **Cognitive Skills Trained:** Deductive reasoning, spatial logic, constraint satisfaction, rule-based elimination.

#### 7. KenKen
- **Identifier:** `kenken`
- **Objective:** Fill an $n \times n$ grid with digits such that no row/column repeats digits and caged regions satisfy specified arithmetic target values.
- **How It Works:** Grid cells are grouped into outlined "cages" with a target number and operator (e.g., `12x` or `3-`). Players must choose numbers that yield the cage target while respecting non-repetition rules.
- **Cognitive Skills Trained:** Combinatorial logic, cage constraint solving, mental math, systematic trial-and-elimination.

#### 8. Binairo / Binary Puzzle
- **Identifier:** `binary_puzzle`
- **Objective:** Fill a grid with 0s and 1s adhering to binary balance constraints.
- **How It Works:** Rules dictate: (1) Each row and column must contain an equal number of 0s and 1s; (2) No more than two identical digits may sit adjacent to each other (`000` or `111` is invalid); (3) No two rows or columns can be identical.
- **Cognitive Skills Trained:** Pattern recognition, parity analysis, visual logic, binary constraint solving.

#### 9. Shikaku
- **Identifier:** `shikaku`
- **Objective:** Divide a grid into non-overlapping rectangular and square regions.
- **How It Works:** The grid contains numerical clues. Each clue must sit inside a single rectangle whose total cell area equals that clue number.
- **Cognitive Skills Trained:** Spatial partitioning, factor visualization, geometric deduction, spatial planning.

#### 10. Nonogram
- **Identifier:** `nonogram`
- **Objective:** Reveal a hidden picture/pattern on a grid by filling cells according to row and column numerical clues.
- **How It Works:** Clues beside rows and columns indicate uninterrupted runs of filled cells (e.g., `2 4` means a run of 2 filled cells followed by at least one blank and a run of 4 filled cells).
- **Cognitive Skills Trained:** Visual-spatial deduction, logical cross-referencing, pattern synthesis.

#### 11. Tango
- **Identifier:** `tango`
- **Objective:** Populate a grid with Sun and Moon symbols guided by adjacency and equivalence rules.
- **How It Works:** Equal numbers of Suns and Moons must exist in every row and column. Grid indicators (`=` or `x`) specify whether adjacent cells must match or differ.
- **Cognitive Skills Trained:** Dual-constraint reasoning, relational logic, spatial grid balancing.

#### 12. Queens
- **Identifier:** `queens`
- **Objective:** Position non-attacking queens across a color-coded grid matrix.
- **How It Works:** Exactly one queen must be placed in each row, column, and distinct color region. No two queens may touch—even diagonally.
- **Cognitive Skills Trained:** Spatial exclusion, 2D constraint satisfaction, spatial awareness.

#### 13. Math Grid
- **Identifier:** `math_grid`
- **Objective:** Place numbers into grid cells so that all row and column mathematical sum targets match.
- **How It Works:** Intersecting rows and columns display target sums at their headers and footers. Players place available number tokens into empty slots to simultaneously satisfy all horizontal and vertical requirements.
- **Cognitive Skills Trained:** Simultaneous equation solving, matrix arithmetic, working memory.

---

### Category 3: Number Combinatorics & Strategy

#### 14. Number Alchemy
- **Identifier:** `number_alchemy`
- **Objective:** Synthesize target numbers by merging and combining element tokens using arithmetic operations.
- **How It Works:** Players drag and drop raw number elements onto arithmetic nodes to craft higher-order numbers, searching for the exact recipe to produce the alchemy target.
- **Cognitive Skills Trained:** Combinatorial planning, forward tree searching, arithmetic synthesis.

#### 15. Number Pyramid
- **Identifier:** `number_pyramid`
- **Objective:** Complete an ascending block pyramid where each upper block is the sum of the two supporting blocks directly beneath it.
- **How It Works:** Given a partially filled pyramid, players calculate missing values bottom-up or top-down using addition and subtraction.
- **Cognitive Skills Trained:** Relational arithmetic, hierarchical problem solving, working memory.

#### 16. Magic Triangle
- **Identifier:** `magic_triangle`
- **Objective:** Position a given set of number tokens along the perimeter nodes of a triangle so each side sums to the exact same total.
- **How It Works:** Vertices are shared across two sides, creating overlapping constraints that require strategic placement of high and low digits.
- **Cognitive Skills Trained:** Overlapping constraint satisfaction, algebraic balancing, trial evaluation.

#### 17. 1024 Twisted
- **Identifier:** `game_1024`
- **Objective:** Slide and merge matching numbered tiles on a grid to reach the 1024 tile while managing board space.
- **How It Works:** Swiping moves all tiles in one direction. Matching values combine ($2+2=4$, $4+4=8$). "Twisted" rules introduce special multiplier tiles, board obstacles, and combo timing bonuses.
- **Cognitive Skills Trained:** Spatial forecasting, resource management, tactical planning, visual reaction.

---

### Category 4: Memory & Pattern Recognition

#### 18. Flashback / Memory Matrix
- **Identifier:** `memory_matrix`
- **Objective:** Memorize a flashed matrix pattern of active tiles and reproduce the exact configuration.
- **How It Works:** A grid illuminates a pattern of tiles for a brief duration (1–3 seconds) before reverting to blank. Players tap to recall all illuminated tiles without clicking decoy cells.
- **Cognitive Skills Trained:** Visual-spatial working memory, short-term pattern recall, spatial retention.

#### 19. Simon Sequence
- **Identifier:** `simon_sequence`
- **Objective:** Observe and replicate progressively lengthening audio-visual signal sequences.
- **How It Works:** Colored pads flash and chime in sequence. Players must repeat the exact sequence step-by-step as each turn appends a new signal.
- **Cognitive Skills Trained:** Sequential memory, audio-visual integration, working memory retention.

#### 20. Math Pairs
- **Identifier:** `math_pairs`
- **Objective:** Match hidden expression tiles that evaluate to identical numerical values.
- **How It Works:** A memory matrix hides mathematical expressions (e.g., `8 × 3` and `12 + 12`). Players flip tiles two at a time, calculating values mentally to match equivalent pairs.
- **Cognitive Skills Trained:** Working memory, real-time expression evaluation, spatial concentration.

#### 21. Minesweeper
- **Identifier:** `minesweeper`
- **Objective:** Clear all safe cells on a grid without detonating hidden mines, utilizing adjacency numbers as logic cues.
- **How It Works:** Uncovered cells reveal numbers indicating how many mines reside in the 8 adjacent cells. Players logically flag mines and uncover safe ground.
- **Cognitive Skills Trained:** Probabilistic deduction, local pattern evaluation, spatial risk analysis.

---

### Category 5: Visual Mathematics

#### 22. Picture Puzzle
- **Identifier:** `picture_puzzle`
- **Objective:** Determine the numerical value of unknown visual symbols and solve final combination equations.
- **How It Works:** A series of visual algebraic equations are presented using icons (e.g., $3 \text{ Apples} = 30$, $\text{Apple} + 2 \text{ Bananas} = 18$). Players deduce individual item values and solve the target expression taking note of visual subtle changes (e.g., number of bananas in a cluster).
- **Cognitive Skills Trained:** Visual algebra, variable isolation, observation detail, logical deduction.

---

## 3. Play Modes Reference Guide

CalcQuest offers versatile game modes tailored to every play style and mood:

| Play Mode | Primary Focus | Timer / Pressure | Difficulty Scaling | Social & Competition |
| :--- | :--- | :--- | :--- | :--- |
| **Campaign Journey** | 350+ Handcrafted progression levels | None (Focus on logic) | Gradual progression across worlds | Milestone badges & world completion stats |
| **Daily Challenge** | 4 Curated daily puzzles (Worldwide sync) | Optional speed timer | Tiered (Easy, Medium, Hard, Expert) | Worldwide global streak & daily leaderboards |
| **Endless Mode** | High-score survival attack | Active countdown clock (+time per solve) | Escalates dynamically as score increases | Global all-time leaderboards |
| **Casual Mode** | Relaxed, unhurried puzzle solving | Zero timer pressure | Customizable fixed board size / difficulty | Personal high score tracking |
| **Custom Level Builder** | Player-created custom puzzle sandbox | Custom configuration | Set by puzzle author | Exportable QR code & string share codes |
