import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split("\n");
  return lines;
};

function getItemPriority(item?: string): number {
  if (!item) return 0;

  // use ascii A being 65 and a being 97 to speed this up
  const charCode = item.charCodeAt(0);
  // `A` is `65` while `a` is `97`
  return charCode < 97 ? charCode - 38 : charCode - 96;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const sum = input.reduce((rucksackSum: number, rucksack: string): number => {
    const rucksackItems = rucksack.split("");
    const compartments = _.chunk(
        rucksackItems,
        rucksackItems.length / 2
    );
    const items = _.intersection(...compartments);

    return rucksackSum + items.reduce((compartmentSum: number, item: string): number => {
      return compartmentSum + getItemPriority(item);
    }, 0);
  }, 0);

  return sum;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const rucksacks = input.map((rucksack: string): string[] => rucksack.split(""));
  const groups = _.chunk(rucksacks, 3);

  const sum = groups.reduce((acc: number, groupRucksacks: string[][]): number => {
    const badge = _.first(_.intersection(...groupRucksacks));

    return acc + getItemPriority(badge);
  }, 0);

  return sum;
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
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
