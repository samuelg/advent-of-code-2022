import run from "aocrunner";

enum Direction {
  Left = "L",
  Right = "R",
  Up = "U",
  Down = "D",
}

interface Move {
  direction: Direction,
  places: number,
}

interface Position {
  x: number,
  y: number,
}

const parseInput = (rawInput: string): Move[] => {
  const moves = rawInput
    .split("\n")
    .map((line) => {
      const rawMove = line.split(" ");

      return {
        direction: rawMove[0] as Direction,
        places: parseInt(rawMove[1], 10),
      };
    });

  return moves;
};

function touches(head: Position, tail: Position): boolean {
  if (head.x < tail.x && tail.x - head.x > 1) return false;
  if (head.x > tail.x && head.x - tail.x > 1) return false;
  if (head.y < tail.y && tail.y - head.y > 1) return false;
  if (head.y > tail.y && head.y - tail.y > 1) return false;

  return true;
}

function moveHead(head: Position, direction: Direction): void {
  if (direction === Direction.Up) head.y += 1;
  if (direction === Direction.Down) head.y -= 1;
  if (direction === Direction.Right) head.x += 1;
  if (direction === Direction.Left) head.x -= 1;
}

function moveTail(head: Position, tail: Position): void {
  if (head.x < tail.x) tail.x -= 1;
  if (head.x > tail.x) tail.x += 1;
  if (head.y < tail.y) tail.y -= 1;
  if (head.y > tail.y) tail.y += 1;
}

function processMoves(moves: Move[]): number {
  const head: Position = { x: 0, y: 0 };
  const tail: Position = { x: 0, y: 0 };

  // keep track of unique tail positions
  const positions = moves.reduce((acc: Set<string>, move: Move): Set<string> => {
    for (let place = 0; place < move.places; place++) {
      moveHead(head, move.direction);

      if (!touches(head, tail)) {
        moveTail(head, tail);
        acc.add(`${tail.x}|${tail.y}`);
      }
    }

    return acc;
  }, new Set<string>(["0|0"])); // start position counts

  return positions.size;
}

const part1 = (rawInput: string): number => {
  const moves = parseInput(rawInput);
  const tailPositions = processMoves(moves);

  return tailPositions;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
          R 4
          U 4
          L 3
          D 1
          R 4
          D 1
          L 5
          R 2
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
