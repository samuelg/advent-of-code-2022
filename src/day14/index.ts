import run from "aocrunner";
import _ from "lodash";

interface Coordinate {
  row: number,
  col: number,
}

const parseInput = (rawInput: string): Coordinate[][] => {
  const rockLines = rawInput.split("\n")
    .map((line) => line.split(" -> ")
         .map((coordinate) => {
           const [col, row] = coordinate.split(",");

           return {
             row: parseInt(row, 10),
             col: parseInt(col, 10),
           };
         }));

  return rockLines;
};

function findLastRow(rocks: Coordinate[][]): number {
  let lastRow = 0;

  rocks.forEach((rockLine) => {
    rockLine.forEach((coordinate: Coordinate) => {
      if (coordinate.row > lastRow) lastRow = coordinate.row;
    });
  });

  return lastRow;
}

// build sparce array
function getGrid(rocks: Coordinate[][]): string[][] {
  // always initialize the first row as sand will be placed there
  const grid: string[][] = [[]];

  rocks.forEach((rockLine) => {
    rockLine.forEach((coordinate: Coordinate, index) => {
      const next = rockLine[index + 1];
      // connect 2 coordinates
      if (next) {
        let x1 = coordinate.row < next.row ? coordinate.row : next.row;
        const x2 = x1 + Math.abs(coordinate.row - next.row);
        while (x1 <= x2) {
          let y1 = coordinate.col < next.col ? coordinate.col : next.col;
          const y2 = y1 + Math.abs(coordinate.col - next.col);
          while (y1 <= y2) {
            if (!grid[x1]) grid[x1] = [];
            grid[x1][y1] = "#";
            y1++;
          }
          x1++;
        }
      }
    });
  });

  return grid;
}

function move(grid: string[][], sand: Coordinate): boolean {
  if (!grid[sand.row + 1]) grid[sand.row + 1] = [];

  // try down
  if (!grid[sand.row + 1][sand.col]) {
    grid[sand.row + 1][sand.col] = "o";
    // sand was moved so delete previous position
    delete grid[sand.row][sand.col];
    sand.row += 1;
    return false;
  }
  // try left
  if (!grid[sand.row + 1][sand.col - 1]) {
    grid[sand.row + 1][sand.col - 1] = "o";
    // sand was moved so delete previous position
    delete grid[sand.row][sand.col];
    sand.row += 1;
    sand.col -= 1;
    return false;
  }
  // try right
  if (!grid[sand.row + 1][sand.col + 1]) {
    grid[sand.row + 1][sand.col + 1] = "o";
    // sand was moved so delete previous position
    delete grid[sand.row][sand.col];
    sand.row += 1;
    sand.col += 1;
    return false;
  }

  return true;
}

function simulate(rocks: Coordinate[][], end: number): number {
  const grid = getGrid(rocks);
  let count = 0;

  while (true) {
    let sand: Coordinate = { row: 0, col: 500 };
    let resting = false;
    let done = false;

    while (!resting) {
      resting = move(grid, sand);
      // did we hit the end?
      if (sand.row === end) {
        done = true;
        break;
      }
    }

    if (done) break;

    count++;
  }

  return count;
}

const part1 = (rawInput: string): number => {
  const coordinates = parseInput(rawInput);
  const lastRow = findLastRow(coordinates);
  const count = simulate(coordinates, lastRow);

  return count;
};

const part2 = (rawInput: string): number => {
  const coordinates = parseInput(rawInput);
  // add floor line
  const lastRow = findLastRow(coordinates);
  coordinates.push([{
    row: lastRow + 2,
    col: 0
  }, {
    row: lastRow + 2,
    col: 1000
  }]);
  const count = simulate(coordinates, 0);

  // need to account for last grain of sand that came to rest at the top
  return count + 1;
};

run({
  part1: {
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
