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

function findAdjacent(grid: string[][], visited: Node[], node: Node, comp: (n1: number, n2: number) => boolean): Node[] {
  const adjacentNodes: Node[] = [];

  // start node could be an `a` or `z` value depending on starting node
  let nodeValue = grid[node.row][node.col].charCodeAt(0);
  if (grid[node.row][node.col] === "S") nodeValue = "a".charCodeAt(0);
  if (grid[node.row][node.col] === "E") nodeValue = "z".charCodeAt(0);

  [
    [node.row - 1, node.col],
    [node.row + 1, node.col],
    [node.row, node.col - 1],
    [node.row, node.col + 1]
  ].forEach((adjacent: number[]) => {
    const [row, col] = adjacent;

    // stay within the grid
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[node.row].length) return;

    const adjacentNode: Node = { row, col, parent: node };
    // end node could be an `a` or `z` value depending on starting node
    let adjacentValue = grid[row][col].charCodeAt(0);
    if (grid[row][col] === "S") adjacentValue = "a".charCodeAt(0);
    if (grid[row][col] === "E") adjacentValue = "z".charCodeAt(0);

    if (comp(adjacentValue, nodeValue) && !wasVisited(visited, adjacentNode)) {
      adjacentNodes.push(adjacentNode);
    }
  });

  return adjacentNodes;
}

function bfs(grid: string[][], start: Node, comp: (n1: number, n2: number) => boolean, match: string): Node[] {
  const visited: Node[] = [start];
  const queue = [start];
  let found: Node | undefined;

  while(queue.length > 0) {
    const node = queue.splice(0, 1)[0];

    if (grid[node.row][node.col] === match) {
      found = node;
      break;
    }

    const adjacent = findAdjacent(grid, visited, node, comp);

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
  const start = findNode(grid, "S");
  const path = bfs(grid, start, (n1, n2) => n1 <= n2 + 1, "E");

  return path.length;
};

const part2 = (rawInput: string): number => {
  const grid = parseInput(rawInput);
  const start = findNode(grid, "E");
  const path = bfs(grid, start, (n1, n2) => n2 <= n1 + 1, "a");

  return path.length;
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
      {
        input: `
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi
        `,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
