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

function getTreeScore(trees: number[][], tree: Tree): number {
  const { row, col, height } = tree;
  let visibleUp = 0;
  let visibleDown = 0;
  let visibleLeft = 0;
  let visibleRight = 0;

  // up
  for (let index = row - 1; index >= 0; index--) {
    if (trees[index][col] >= height) {
      visibleUp += 1;
      break;
    }
    visibleUp += 1;
  }

  // down
  for (let index = row + 1; index < trees.length; index++) {
    if (trees[index][col] >= height) {
      visibleDown += 1;
      break;
    }
    visibleDown += 1;
  }

  // left
  for (let index = col - 1; index >= 0; index--) {
    if (trees[row][index] >= height) {
      visibleLeft += 1;
      break;
    }
    visibleLeft += 1;
  }

  // right
  for (let index = col + 1; index < trees[row].length; index++) {
    if (trees[row][index] >= height) {
      visibleRight += 1;
      break;
    }
    visibleRight += 1;
  }

  return visibleUp * visibleDown * visibleLeft * visibleRight;
}

function getHighestScenicScore(trees: number[][]): number {
  const score = trees.reduce((rowAcc: number, row: number[], rowIndex: number): number => {
    // first and last rows always will have score of 0 due to outside edge
    if (rowIndex === 0 || rowIndex === trees.length - 1) return rowAcc;

    return row.reduce((colAcc: number, col: number, colIndex: number): number => {
      // first and last columns always have score of 0 due to outside edge
      if (colIndex === 0 || colIndex === row.length - 1) return colAcc;

      const score = getTreeScore(
        trees,
        { row: rowIndex, col: colIndex, height: col }
      );

      if (score > colAcc) {
        return score;
      }

      return colAcc;
    }, rowAcc);
  }, 0);

  return score;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const visible = getVisibleTrees(input);

  return visible;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const score = getHighestScenicScore(input);

  return score;
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
      {
        input: `
          30373
          25512
          65332
          33549
          35390
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
