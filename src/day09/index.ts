import run from "aocrunner";
import _ from "lodash";

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

function touches(head: Position | undefined, tail: Position): boolean {
  if (!head) return false;
  if (head.x < tail.x && tail.x - head.x > 1) return false;
  if (head.x > tail.x && head.x - tail.x > 1) return false;
  if (head.y < tail.y && tail.y - head.y > 1) return false;
  if (head.y > tail.y && head.y - tail.y > 1) return false;

  return true;
}

function moveHead(head: Position | undefined, direction: Direction): void {
  if (!head) return;
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

function processMoves(moves: Move[], length: number): number {
  // head at position 0, tail at position length - 1
  const rope = _.range(length).map((): Position => ({ x: 0, y: 0 }));

  // keep track of unique tail positions
  const positions = moves.reduce((acc: Set<string>, move: Move): Set<string> => {
    for (let place = 0; place < move.places; place++) {
      moveHead(_.head(rope), move.direction);

      for (let tailIndex = 1; tailIndex < length; tailIndex++) {
        const previous = rope[tailIndex - 1];
        const tail = rope[tailIndex];

        // if the current tail touches, all other tails will as well
        if (touches(previous, tail)) break;

        moveTail(previous, tail);

        // this is the last knot and therefore the true tail
        if (tailIndex === length - 1) {
          acc.add(`${tail.x}|${tail.y}`);
        }
      }
    }

    return acc;
  }, new Set<string>(["0|0"])); // start position counts

  return positions.size;
}

const part1 = (rawInput: string): number => {
  const moves = parseInput(rawInput);
  // for part 1 the rope length is 2
  const tailPositions = processMoves(moves, 2);

  return tailPositions;
};

const part2 = (rawInput: string): number => {
  const moves = parseInput(rawInput);
  // for part 2 the rope length is 10
  const tailPositions = processMoves(moves, 10);

  return tailPositions;
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
        expected: 1,
      },
      {
        input: `
          R 5
          U 8
          L 8
          D 3
          R 17
          D 10
          L 25
          U 20
        `,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
