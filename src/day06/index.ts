import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const signal = rawInput.split('\n')[0];
  // return array of characters
  return signal.split('');
};

enum Protocol {
  Marker = 4,
  Message = 14,
}

function removeUpToDuplicate(buffer: string[]): void {
  const last = _.last(buffer);
  // remove elements up to any duplicate
  const index = buffer.findIndex((candidate) => candidate === last);

  // last character does not count as a duplicate of itself
  if (index >= 0 && index !== buffer.length - 1) {
    buffer.splice(0, index + 1);
  }
}

function markerFound(buffer: string[]): boolean {
  removeUpToDuplicate(buffer);

  return buffer.length === Protocol.Marker;
}

function messageFound(buffer: string[]): boolean {
  removeUpToDuplicate(buffer);

  return buffer.length === Protocol.Message;
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

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const buffer: string[] = [];
  let position = 0;

  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    buffer.push(char);
    const found = messageFound(buffer);

    if (found) {
      position = index + 1;
      break;
    }
  }

  return position;
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
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
