import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
    const lines: string[] = rawInput.split('\n');
    return lines;
};

const getElves = (input: string[]): number[] => {
  // calculate calories for each elf
  const elves: number[] = input.reduce((acc: number[], current: string) => {
    // next elf
    if (current === "") {
        acc.push(0);
        return acc;
    }

    const calories = parseInt(current, 10);
    acc[acc.length - 1] += calories;
    return acc;
  }, [0]);

  return elves;
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const elves = getElves(input);

  // get elf with highest calorie count
  return _.max(elves) || 0;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const elves = getElves(input);
  const sorted = _.sortBy(elves);
  const numElves = sorted.length;

  // get top 3 elves with highest calorie count

  return sorted[numElves - 1]
    + sorted[numElves - 2]
    + sorted[numElves - 3];
};

run({
  part1: {
    tests: [
      {
        input: `
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            8000
            9000

            10000
        `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            8000
            9000

            10000
        `,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
