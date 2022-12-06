import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split('\n');
  return lines;
};

interface Instruction {
  num: number,
  from: number,
  to: number,
}

function getStacks(input: string[]): string[][] {
  const stacks = input.reduce((acc: string[][], line): string[][] => {
    if (line.startsWith(' 1') || line.trim() === "" || line.startsWith('move')) {
      return acc;
    }

    const crates = [...line.matchAll(/[\[ ](?<crate>[A-Z ])[\] ] ?/g)]
      .map(g => g && g.groups ? g.groups.crate : '');
    acc.push(crates);

    return acc;
  }, []);

  // transpose so each array represents a stack instead of each arrray
  // representing a level for all stacks
  return _.zip(...stacks)
    // typescript complains about the array containing either strings or
    // undefined
    .map((a) => a.map((b) => !b ? '': b))
    // we want the items on top to be at the end of the array
    .map((a) => a.reverse())
    // once reversed remove empty crates
    .map((a) => a.filter((b) => b !== " "));
}

function getInstructions(input: string[]): Instruction[] {
  const instructions = input.reduce((acc: Instruction[], line): Instruction[] => {
    if (line.startsWith('move')) {
      const move = line.match(/move (?<num>\d+) from (?<from>\d) to (?<to>\d)/);
      if (move && move.groups) {
        acc.push({
          num: parseInt(move.groups.num, 10),
          from: parseInt(move.groups.from, 10),
          to: parseInt(move.groups.to, 10),
        });
      }
    }

    return acc;
  }, []);

  return instructions;
}

function applyInstruction9000(stacks: string[][], instruction: Instruction): string[][] {
  _.range(instruction.num).forEach(() => {
    const crate = stacks[instruction.from - 1].pop();
    stacks[instruction.to - 1].push(crate || '');
  });

  return stacks;
}

function applyInstruction9001(stacks: string[][], instruction: Instruction): string[][] {
  const take: string[] = [];

  _.range(instruction.num).forEach(() => {
    const crate = stacks[instruction.from - 1].pop();
    if (crate) take.push(crate);
  });

  take.reverse().forEach((crate) => stacks[instruction.to - 1].push(crate));

  return stacks;
}

function getTopStacks(stacks: string[][]): string[] {
  return stacks.map((stack) => _.last(stack) || '');
}

const part1 = (rawInput: string): string => {
  const input = parseInput(rawInput);
  const stacks = getStacks(input);
  const instructions = getInstructions(input);

  instructions.forEach((instruction: Instruction) => {
    applyInstruction9000(stacks, instruction);
  });

  return getTopStacks(stacks).join('');
};

const part2 = (rawInput: string): string => {
  const input = parseInput(rawInput);
  const stacks = getStacks(input);
  const instructions = getInstructions(input);

  instructions.forEach((instruction: Instruction) => {
    applyInstruction9001(stacks, instruction);
  });

  return getTopStacks(stacks).join('');
};

run({
  part1: {
    tests: [
      {
        // .editorconfig no longer trims whitespace for this file so we preserce
        // significant whitespace in the test input
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        // .editorconfig no longer trims whitespace for this file so we preserce
        // significant whitespace in the test input
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  // onlyTests: true,
});
