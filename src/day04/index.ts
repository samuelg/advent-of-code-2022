import run from "aocrunner";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split('\n');
  return lines;
};

interface Asssignment {
  // start section
  start: number;
  // end section
  end: number;
}

function assignmentContainsTheOther(assignment1: Asssignment, assignment2: Asssignment): boolean {
  const firstContainsSecond =
    assignment2.start >= assignment1.start
    && assignment2.end <= assignment1.end;
  const secondContainsFirst =
    assignment1.start >= assignment2.start
    && assignment1.end <= assignment2.end;

  if (firstContainsSecond || secondContainsFirst) {
    return true;
  }

  return false;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const containedSections = input.reduce((acc: number, rawPairs: string): number => {
    const pairs = rawPairs.split(',').map((range: string): Asssignment => {
      const sections = range.split('-')
        .map((section: string): number => parseInt(section, 10));

      return {
        start: sections[0],
        end: sections[1],
      };
    });

    const contained = assignmentContainsTheOther(pairs[0], pairs[1]);

    return contained ? acc + 1 : acc;
  }, 0);

  return containedSections;
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
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 2,
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
