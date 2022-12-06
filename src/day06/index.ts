import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const signal = rawInput.split('\n')[0];
  // return array of characters
  return signal.split('');
};

function markerFound(buffer: string[]): boolean {
  const last = _.last(buffer);
  // remove elements up to any duplicate
  const index = buffer.findIndex((candidate) => candidate === last);

  // last character does not count as a duplicate of itself
  if (index >= 0 && index !== buffer.length - 1) {
    buffer.splice(0, index + 1);
  }

  return buffer.length === 4;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const buffer: string[] = [];
  let position = 0;

  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    buffer.push(char);
    const found = markerFound(buffer);

    if (found) {
      position = index + 1;
      break;
    }
  }

  return position;
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
          mjqjpqmgbljsphdztnvjfqwrcgsmlb
        `,
        expected: 7,
      },
      {
        input: `
          bvwbjplbgvbhsrlpgdmjqwftvncz
        `,
        expected: 5,
      },
      {
        input: `
          nppdvjthqldpwncqszvftbrmjlhg
        `,
        expected: 6,
      },
      {
        input: `
          nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
        `,
        expected: 10,
      },
      {
        input: `
          zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
        `,
        expected: 11,
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
