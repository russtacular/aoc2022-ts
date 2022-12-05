import run from "aocrunner";
import { sum, Vector1d, vContains, vIntersects } from "../utils/index.js";


const parseInput = (rawInput: string) => rawInput;

const pairInput = (input: string) =>
  input.split('\n')
    .map(l => l.split(',', 2)
    .map(e => e.split('-', 2)
    .map(n => parseInt(n, 10)) as Vector1d));


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairedInput = pairInput(input);

  return pairedInput.map(l => +(vContains(l[0], l[1]) || vContains(l[1], l[0]))).reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairedInput = pairInput(input);

  return pairedInput.map(l => +(vIntersects(l[0], l[1]))).reduce(sum, 0);
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
