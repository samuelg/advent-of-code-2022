import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split('\n');
  return lines;
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const sum = input.reduce((rucksackSum: number, rucksack: string): number => {
    const rucksackItems = rucksack.split('');
    const [compartment1, compartment2] = _.chunk(
        rucksackItems,
        rucksackItems.length / 2
    );
    const items = _.intersection(compartment1, compartment2);

    return rucksackSum + items.reduce((compartmentSum: number, item: string): number => {
      // use ascii A being 65 and a being 97 to speed this up
      const charCode = item.charCodeAt(0);
      // `A` is `65` while `a` is `97`
      const priority = charCode < 97 ? charCode - 38 : charCode - 96;

      return compartmentSum + priority;
    }, 0);
  }, 0);

  return sum;
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
            vJrwpWtwJgWrhcsFMMfFFhFp
            jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
            PmmdzqPrVvPwwTWBwg
            wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
            ttgJtRGJQctTZtZT
            CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
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
