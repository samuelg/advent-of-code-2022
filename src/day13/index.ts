import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string): object[][] => {
  const pairs = rawInput.split("\n\n");
  return pairs
    .map((packets) => packets.split("\n")
         .map((packet) => JSON.parse(packet)));
};

// compare function with -1 for p1 < p2, 0 for p1 === p2, and 1 for p1 > p2
function compare(p1: object, p2: object): number {
  if (_.isNumber(p1) && _.isNumber(p2)) {
    if (p1 < p2) return -1;
    if (p1 === p2) return 0;
    return 1;
  }

  if (_.isArray(p1) && _.isArray(p2)) {
    for (let index = 0; index < Math.min(p1.length, p2.length); index++) {
      const result = compare(p1[index], p2[index]);

      if (result !== 0) return result;
    }

    if (p1.length === p2.length) return 0;

    // which ran out?
    return p1.length > p2.length ? 1 : -1;
  }

  if (_.isNumber(p1)) return compare([p1], p2);
  return compare(p1, [p2]);
}

const part1 = (rawInput: string): number => {
  const pairs = parseInput(rawInput);

  return pairs.reduce((sum: number, packets: object[], index: number): number => {
    const result = compare(packets[0], packets[1]);

    if (result < 0) sum += index + 1;

    return sum;
  }, 0);
};

const part2 = (rawInput: string): number => {
  const pairs = parseInput(rawInput);
  const dividers = [[[2]], [[6]]];
  const all = _.flatten(pairs).concat(dividers);
  const sorted = all.sort(compare);

  return sorted.reduce((product: number, packet: object, index: number): number => {
    if (JSON.stringify(packet) === JSON.stringify(dividers[0])
       || JSON.stringify(packet) === JSON.stringify(dividers[1])) product *= index + 1;

    return product;
  }, 1);
};

run({
  part1: {
    tests: [
      {
        input: `
          [1,1,3,1,1]
          [1,1,5,1,1]

          [[1],[2,3,4]]
          [[1],4]

          [9]
          [[8,7,6]]

          [[4,4],4,4]
          [[4,4],4,4,4]

          [7,7,7,7]
          [7,7,7]

          []
          [3]

          [[[]]]
          [[]]

          [1,[2,[3,[4,[5,6,7]]]],8,9]
          [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          [1,1,3,1,1]
          [1,1,5,1,1]

          [[1],[2,3,4]]
          [[1],4]

          [9]
          [[8,7,6]]

          [[4,4],4,4]
          [[4,4],4,4,4]

          [7,7,7,7]
          [7,7,7]

          []
          [3]

          [[[]]]
          [[]]

          [1,[2,[3,[4,[5,6,7]]]],8,9]
          [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
