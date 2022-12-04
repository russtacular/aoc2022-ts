import run from "aocrunner";
import { sum, eqSet, intersect, range } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairedInput = input.split('\n').map(l => l.split(',', 2).map(e => {
      const rangePair = e.split('-', 2).map(n => parseInt(n, 10)) as [number, number];
      // if(rangePair.length > 2) throw Error("Invalid Range: " + rangePair.toString());
      return new Set(range(rangePair[0], rangePair[1]));
    }));

  return pairedInput.map(l => {
    const inter = intersect(l[0], l[1]);
    return +(eqSet(inter, l[0]) || eqSet(inter, l[1]));
  }).reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
