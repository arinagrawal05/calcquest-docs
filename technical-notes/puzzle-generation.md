# How CalcQuest makes its puzzles

CalcQuest combines two kinds of content: 350+ handcrafted Calculator Classic levels, each designed and solved by hand, and generated boards for its 20+ puzzle games, built by code at the chosen difficulty so there is always another puzzle. Generation is seeded, which is how every player gets the same daily challenge and both players in a duel get the identical board.

## Handcrafted levels

Calculator Classic's 350+ levels were written by hand and stored as level data in the app. Each level sets a starting number, a goal, the buttons available and the number of moves. Every level was solved by its designer before release, and the difficulty curve across the worlds was tuned by hand.

## Generated boards

Each puzzle game has its own generator:

| Game type | How a board is made |
|---|---|
| Grid logic and number grids (Queens, Tango, Binairo, Mini Sudoku, KenKen, Shikaku, Nonogram) | Start from a complete valid solution, then derive the clues and leave cells empty; how many clues are given sets the difficulty |
| Minesweeper | Place mines at a density set by the difficulty |
| Math games | Generate equations within number ranges and operations that grow with difficulty |
| Memory games | Generate patterns and sequences whose length grows with difficulty |

Starting from a solution and deriving the puzzle from it means every board has an answer.

## Difficulty

Each generator takes a difficulty (Easy, Medium or Hard) that controls board size, clue count, number ranges or pattern length. In Timed and Endless play, difficulty also steps up every 5 rounds. See [Difficulty](../gameplay/difficulty.md).

## Seeds: the same puzzle for everyone

Generators use a seeded random number source. The same seed always produces the same board.

- **Daily challenge.** The seed comes from the date, so every player gets the same four games and the same boards that day.
- **Duels.** A duel stores its seed, so the challenger and the friend solve exactly the same board.
## Journey levels

A Journey level is assembled from several stages, each a board from a puzzle game. The level's place on the map decides which games appear and how hard they are, so the Journey grows harder chapter by chapter while always mixing games.

## The web puzzles

The nine puzzles on calcquest.app use their own TypeScript generators with the same approach: a seeded solution first, then clues removed by difficulty.

Related: [Architecture overview](architecture-overview.md) · [All puzzle games](../games/index.md)
