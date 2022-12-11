import run from "aocrunner";
import _ from "lodash";

interface Monkey {
  name: string,
  inspections(): number,
  items: number[],
  divisibleBy: number,
  operation(old: number): number,
  // track which monkey to throw to after the test
  test(item: number): number,
}

function parseMonkey(monkey: string[]): Monkey {
  const name = monkey[0].replace(":", "");
  let inspected = 0;

  const items = monkey[1]
    .split("items: ")[1]
    .split(",")
    .map((item: string) => parseInt(item, 10));

  const rawOp = monkey[2]
    .split("new = old ")[1]
    .split(" ");
  const op = rawOp[0];
  const operation = (old: number): number => {
    inspected += 1;
    let newItem = 0;
    // possible we have to operate on the existing number itself
    const num = rawOp[1] === 'old' ? old : parseInt(rawOp[1], 10);

    switch (op) {
      case "+": {
        newItem = old + num;
        break;
      }
      case "*": {
        newItem = old * num;
        break;
      }
    }

    return newItem;
  };

  const divisibleBy = parseInt(monkey[3].split("divisible by ")[1], 10);
  const throwTrue = parseInt(monkey[4].split("throw to monkey ")[1], 10);
  const throwFalse = parseInt(monkey[5].split("throw to monkey ")[1], 10);
  const test = (item: number): number => {
    if (item % divisibleBy === 0) return throwTrue;
    return throwFalse;
  };

  return {
    name,
    inspections() { return inspected },
    items,
    divisibleBy,
    operation,
    test,
  };
}

const parseInput = (rawInput: string): Monkey[] => {
  const monkeys = rawInput
    .split("\n\n")
    .map((group: string): Monkey => {
      const monkey = group
        .split("\n");
      return parseMonkey(monkey);
    });

  return monkeys;
};

function simulate(monkeys: Monkey[], rounds: number, worry: (item: number) => number): number[] {
  for (let round = 1; round <= rounds; round++) {

    monkeys.forEach((monkey) => {
      // inspect items
      _.clone(monkey.items).forEach((item) => {
        const newItem = worry(monkey.operation(item));
        const throwToMonkey = monkey.test(newItem);

        // throw the item
        monkey.items.splice(0, 1);
        monkeys[throwToMonkey].items.push(newItem);
      });
    });
  }

  // return inspections by each monkey
  return monkeys.map((monkey) => monkey.inspections());
}

const part1 = (rawInput: string): number => {
  const monkeys = parseInput(rawInput);
  const inspections = simulate(monkeys, 20, (item: number) => Math.floor(item / 3));
  const mostActive = _.takeRight(_.sortBy(inspections), 2);

  console.log("Inspections", inspections);
  console.log("Most active", mostActive);

  return mostActive.reduce((product: number, num: number): number => product * num, 1);
};

const part2 = (rawInput: string): number => {
  const monkeys = parseInput(rawInput);
  const commonDivisor = monkeys.reduce((product: number, monkey: Monkey): number => {
    return product * monkey.divisibleBy;
  }, 1);
  const inspections = simulate(monkeys, 10000, (item: number) => item % commonDivisor);
  const mostActive = _.takeRight(_.sortBy(inspections), 2);

  console.log("Inspections", inspections);
  console.log("Most active", mostActive);

  return mostActive.reduce((product: number, num: number): number => product * num, 1);
};

run({
  part1: {
    tests: [
      {
        input: `
          Monkey 0:
            Starting items: 79, 98
            Operation: new = old * 19
            Test: divisible by 23
              If true: throw to monkey 2
              If false: throw to monkey 3

          Monkey 1:
            Starting items: 54, 65, 75, 74
            Operation: new = old + 6
            Test: divisible by 19
              If true: throw to monkey 2
              If false: throw to monkey 0

          Monkey 2:
            Starting items: 79, 60, 97
            Operation: new = old * old
            Test: divisible by 13
              If true: throw to monkey 1
              If false: throw to monkey 3

          Monkey 3:
            Starting items: 74
            Operation: new = old + 3
            Test: divisible by 17
              If true: throw to monkey 0
              If false: throw to monkey 1
        `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Monkey 0:
            Starting items: 79, 98
            Operation: new = old * 19
            Test: divisible by 23
              If true: throw to monkey 2
              If false: throw to monkey 3

          Monkey 1:
            Starting items: 54, 65, 75, 74
            Operation: new = old + 6
            Test: divisible by 19
              If true: throw to monkey 2
              If false: throw to monkey 0

          Monkey 2:
            Starting items: 79, 60, 97
            Operation: new = old * old
            Test: divisible by 13
              If true: throw to monkey 1
              If false: throw to monkey 3

          Monkey 3:
            Starting items: 74
            Operation: new = old + 3
            Test: divisible by 17
              If true: throw to monkey 0
              If false: throw to monkey 1
        `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
