import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => {
    const lines: string[] = rawInput.split('\n');
    return lines;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

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

  return _.max(elves);
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
