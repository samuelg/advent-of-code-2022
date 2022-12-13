import run from "aocrunner";

const parseInput = (rawInput: string): string[][] => {
  const grid = rawInput
    .split("\n")
    .map((line) => line.split(''));

  return grid;
};

interface Node {
  row: number,
  col: number,
  parent?: Node,
}

function findNode(grid: string[][], marker: string): Node {
  let node: Node = { row: 0, col: 0 };
  let found = false;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === marker) {
        node = { row, col };
        found = true;
        break;
      }
    }

    if (found) {
      break;
    }
  }

  return node;
}

function wasVisited(visited: Node[], node: Node): boolean {
  return visited.some((v) => v.row === node.row && v.col === node.col);
}

function findAdjacent(grid: string[][], visited: Node[], node: Node): Node[] {
  const adjacent: Node[] = [];

  // starting node should be an `a` value
  const nodeValue = grid[node.row][node.col] === "S"
    ? 97
    : grid[node.row][node.col].charCodeAt(0);

  const leftNode = {
    row: node.row,
    col: Math.max(node.col - 1, 0),
    parent: node
  };
  // end node should have a `z` value
  const leftValue = grid[leftNode.row][leftNode.col] === "E"
    ? 122
    : grid[leftNode.row][leftNode.col].charCodeAt(0);

  const rightNode = {
    row: node.row,
    col: Math.min(node.col + 1, grid[node.row].length - 1),
    parent: node
  };
  const rightValue = grid[rightNode.row][rightNode.col] === "E"
    ? 122
    : grid[rightNode.row][rightNode.col].charCodeAt(0);

  const upNode = {
    row: Math.max(node.row - 1, 0),
    col: node.col,
    parent: node
  };
  const upValue = grid[upNode.row][upNode.col] === "E"
    ? 122
    : grid[upNode.row][upNode.col].charCodeAt(0);

  const downNode = {
    row: Math.min(node.row + 1, grid.length - 1),
    col: node.col,
    parent: node
  };
  const downValue = grid[downNode.row][downNode.col] === "E"
    ? 122
    : grid[downNode.row][downNode.col].charCodeAt(0);

  // `E` will be less than even `a` so no need to check for it
  if (leftValue <= nodeValue + 1 && !wasVisited(visited, leftNode)) {
    adjacent.push(leftNode);
  }

  if (rightValue <= nodeValue + 1 && !wasVisited(visited, rightNode)) {
    adjacent.push(rightNode);
  }

  if (upValue <= nodeValue + 1 && !wasVisited(visited, upNode)) {
    adjacent.push(upNode);
  }

  if (downValue <= nodeValue + 1 && !wasVisited(visited, downNode)) {
    adjacent.push(downNode);
  }

  return adjacent;
}

function bfs(grid: string[][]): Node[] {
  const start = findNode(grid, "S");
  const visited: Node[] = [start];
  const queue = [start];
  let found: Node | undefined;

  while(queue.length > 0) {
    const node = queue.splice(0, 1)[0];

    if (grid[node.row][node.col] === "E") {
      found = node;
      break;
    }

    const adjacent = findAdjacent(grid, visited, node);

    adjacent.forEach((adj) => {
      queue.push(adj);
      visited.push(adj);
    });
  }

  // walk the path backwards to the start
  const path: Node[] = [];
  let last = found;

  while(last && last.parent) {
    path.push(last);
    last = last.parent;
  }

  return path.reverse();
}

const part1 = (rawInput: string): number => {
  const grid = parseInput(rawInput);
  const path = bfs(grid);

  return path.length;
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
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi
        `,
        expected: 31
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
