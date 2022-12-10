import run from "aocrunner";
import { stripIndent } from "common-tags";

enum Instruction {
  AddX = "addx",
  NoOp = "noop",
}

interface Command {
  instruction: Instruction,
  argument: number,
}

const parseInput = (rawInput: string): Command[] => {
  const commands = rawInput
    .split("\n")
    .map((rawCommand: string) => {
      let [rawInstruction , rawArgument] = rawCommand.split(" ");
      const instruction = rawInstruction as Instruction;
      let argument = 0;

      if (rawArgument) argument = parseInt(rawArgument, 10);

      return { instruction, argument };
    });

  return commands;
};

function simulate(commands: Command[]): number[] {
  const cycles: number[] = [];
  let x = 1;

  commands.forEach((command: Command) => {
    switch (command.instruction) {
      case Instruction.AddX: {
        cycles.push(x, x);
        // value is updated after the 2nd cycle
        x += command.argument;
        break;
      }
      default: {
        cycles.push(x);
      }
    }
  });

  return cycles;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const cycles = simulate(input);
  const interestingCycles = [20, 60, 100, 140, 180, 220];

  return cycles.reduce((acc: number, signal: number, index: number): number => {
    const cycle = index + 1;

    if (interestingCycles.includes(cycle)) {
      return  acc + (signal * cycle);
    }

    return acc;
  }, 0);
};

const part2 = (rawInput: string): string => {
  const input = parseInput(rawInput);
  const cycles = simulate(input);

  return cycles.reduce((acc: string, signal: number, index: number): string => {
    // devide into rows of 40 pixels
    const pixel = index % 40;

    if ([signal - 1, signal, signal + 1].includes(pixel)) {
      acc += "#";
    } else {
      acc += ".";
    }

    // end of row but not end of input
    if (pixel === 39 && index !== cycles.length - 1) acc += "\n";

    return acc;
  }, "");
};

run({
  part1: {
    tests: [
      {
        input: `
          addx 15
          addx -11
          addx 6
          addx -3
          addx 5
          addx -1
          addx -8
          addx 13
          addx 4
          noop
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx -35
          addx 1
          addx 24
          addx -19
          addx 1
          addx 16
          addx -11
          noop
          noop
          addx 21
          addx -15
          noop
          noop
          addx -3
          addx 9
          addx 1
          addx -3
          addx 8
          addx 1
          addx 5
          noop
          noop
          noop
          noop
          noop
          addx -36
          noop
          addx 1
          addx 7
          noop
          noop
          noop
          addx 2
          addx 6
          noop
          noop
          noop
          noop
          noop
          addx 1
          noop
          noop
          addx 7
          addx 1
          noop
          addx -13
          addx 13
          addx 7
          noop
          addx 1
          addx -33
          noop
          noop
          noop
          addx 2
          noop
          noop
          noop
          addx 8
          noop
          addx -1
          addx 2
          addx 1
          noop
          addx 17
          addx -9
          addx 1
          addx 1
          addx -3
          addx 11
          noop
          noop
          addx 1
          noop
          addx 1
          noop
          noop
          addx -13
          addx -19
          addx 1
          addx 3
          addx 26
          addx -30
          addx 12
          addx -1
          addx 3
          addx 1
          noop
          noop
          noop
          addx -9
          addx 18
          addx 1
          addx 2
          noop
          noop
          addx 9
          noop
          noop
          noop
          addx -1
          addx 2
          addx -37
          addx 1
          addx 3
          noop
          addx 15
          addx -21
          addx 22
          addx -6
          addx 1
          noop
          addx 2
          addx 1
          noop
          addx -10
          noop
          noop
          addx 20
          addx 1
          addx 2
          addx 2
          addx -6
          addx -11
          noop
          noop
          noop
        `,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          addx 15
          addx -11
          addx 6
          addx -3
          addx 5
          addx -1
          addx -8
          addx 13
          addx 4
          noop
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx -35
          addx 1
          addx 24
          addx -19
          addx 1
          addx 16
          addx -11
          noop
          noop
          addx 21
          addx -15
          noop
          noop
          addx -3
          addx 9
          addx 1
          addx -3
          addx 8
          addx 1
          addx 5
          noop
          noop
          noop
          noop
          noop
          addx -36
          noop
          addx 1
          addx 7
          noop
          noop
          noop
          addx 2
          addx 6
          noop
          noop
          noop
          noop
          noop
          addx 1
          noop
          noop
          addx 7
          addx 1
          noop
          addx -13
          addx 13
          addx 7
          noop
          addx 1
          addx -33
          noop
          noop
          noop
          addx 2
          noop
          noop
          noop
          addx 8
          noop
          addx -1
          addx 2
          addx 1
          noop
          addx 17
          addx -9
          addx 1
          addx 1
          addx -3
          addx 11
          noop
          noop
          addx 1
          noop
          addx 1
          noop
          noop
          addx -13
          addx -19
          addx 1
          addx 3
          addx 26
          addx -30
          addx 12
          addx -1
          addx 3
          addx 1
          noop
          noop
          noop
          addx -9
          addx 18
          addx 1
          addx 2
          noop
          noop
          addx 9
          noop
          noop
          noop
          addx -1
          addx 2
          addx -37
          addx 1
          addx 3
          noop
          addx 15
          addx -21
          addx 22
          addx -6
          addx 1
          noop
          addx 2
          addx 1
          noop
          addx -10
          noop
          noop
          addx 20
          addx 1
          addx 2
          addx 2
          addx -6
          addx -11
          noop
          noop
          noop
        `,
        // test runner does not allow trimming expected output
        expected: stripIndent`
          ##..##..##..##..##..##..##..##..##..##..
          ###...###...###...###...###...###...###.
          ####....####....####....####....####....
          #####.....#####.....#####.....#####.....
          ######......######......######......####
          #######.......#######.......#######.....
        `,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
