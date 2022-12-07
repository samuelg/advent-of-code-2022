import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split("\n");
  return lines;
};

interface File {
  name: string,
  size: number,
}

interface Directory {
  name: string,
  dirs: string[],
  files: File[],
  size: number,
}

type FS = Record<string, Directory>;

// returns the new path if any
function parseCommand(fs: FS, path: string, cmd: string, arg: string): string {
  // we are not parsing `ls` command as output will be parsed line by line
  if (cmd === "cd") {
    if (arg === "..") {
      // up a dir
      const current = path.split("/")
      current.pop();
      path = current.join("/");
    } else {
      // change to dir
      path = arg === "/" ? "/" : `${path}/${arg}`.replace("//", "/");

      if (!fs[path]) {
        fs[path] = {
          name: arg,
          size: 0,
          dirs: [],
          files: [],
        };
      }
    }
  }

  return path;
}

function parseFile(fs: FS, path: string, file: string, size: number): void {
  if (!fs[path].files.find((f) => f.name === file)) {
    fs[path].files.push({
      name: file,
      size,
    });
    fs[path].size += size;

    // skip next step if we"re already at the root
    if (path === "/") return;

    // apply size to parent dirs
    let parent = path.split("/");
    parent.pop();

    while(!_.isEmpty(parent)) {
      const parentPath = parent.join("/") || "/";
      fs[parentPath].size += size;
      parent.pop();
    }
  }
}

function traverseFS(input: string[]): FS {
  const fs: FS = {};
  // current path
  let path: string;

  input.forEach((line) => {
    const parts = line.split(" ");

    if (parts[0] === "$") {
      // process command
      const cmd = parts[1];
      const arg = parts[2];
      path = parseCommand(fs, path, cmd, arg);
    } else if (parts[0] === "dir") {
      // directory
      const dir = parts[1];

      if (!fs[path].dirs.includes(dir)) {
        fs[path].dirs.push(dir);
      }
    } else {
      // file
      const file = parts[1];
      const size = parseInt(parts[0], 10);
      parseFile(fs, path, file, size);
    }
  });

  return fs;
}

function sumDirs(fs: FS, maxSize: number) {
  return Object.keys(fs).reduce((sum: number, path: string): number => {
    const size = fs[path].size;

    if (size <= maxSize) {
      sum += size;
    }

    return sum;
  }, 0);
}

function findSmallestDirToDelete(fs: FS, capacity: number, space: number): Directory {
  const available = capacity - fs['/'].size;
  // assume we're deleting root, then find smaller dirs
  let dirToDelete: Directory = fs['/'];

  Object.keys(fs).forEach((dirName: string) => {
    const dir = fs[dirName];

    if (available + dir.size >= space && dir.size < dirToDelete.size) {
      // we found a smaller dir
      dirToDelete = dir;
    }
  });

  return dirToDelete;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const fs = traverseFS(input);
  const answer = sumDirs(fs, 100000);

  return answer;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const fs = traverseFS(input);
  const answer = findSmallestDirToDelete(fs, 70000000, 30000000)

  return answer.size;
};

run({
  part1: {
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
