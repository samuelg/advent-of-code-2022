import run from "aocrunner";

const parseInput = (rawInput: string): number[][] => {
  const lines = rawInput.split("\n")
    .map((line) => line.split("").map((tree) => parseInt(tree, 10)));

  return lines;
};

interface Tree {
  row: number,
  col: number,
  height: number,
}

function isTreeVisible(trees: number[][], tree: Tree): boolean {
  const { row, col, height } = tree;
  let visible = true;

  // up
  for (let index = row - 1; index >= 0; index--) {
    if (trees[index][col] >= height) {
      visible = false;
      break;
    }
  }

  if (visible) return true;
  visible = true;

  // down
  for (let index = row + 1; index < trees.length; index++) {
    if (trees[index][col] >= height) {
      visible = false;
      break;
    }
  }

  if (visible) return true;
  visible = true;

  // left
  for (let index = col - 1; index >= 0; index--) {
    if (trees[row][index] >= height) {
      visible = false;
      break;
    }
  }

  if (visible) return true;
  visible = true;

  // right
  for (let index = col + 1; index < trees[row].length; index++) {
    if (trees[row][index] >= height) {
      visible = false;
      break;
    }
  }

  return visible;
}

function getVisibleTrees(trees: number[][]): number {
  const visible = trees.reduce((rowAcc: number, row: number[], rowIndex: number): number => {
    // first and last rows always visible
    if (rowIndex === 0 || rowIndex === trees.length - 1) return rowAcc + row.length;

    return row.reduce((colAcc: number, col: number, colIndex: number): number => {
      // first and last columns always visible
      if (colIndex === 0 || colIndex === row.length - 1) return colAcc + 1;

      const visible = isTreeVisible(
        trees,
        { row: rowIndex, col: colIndex, height: col }
      );

      if (visible) {
        return colAcc + 1;
      }

      return colAcc;
    }, rowAcc);
  }, 0);

  return visible;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const visible = getVisibleTrees(input);

  return visible;
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
          30373
          25512
          65332
          33549
          35390
        `,
        expected: 21,
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
