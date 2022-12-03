import run from "aocrunner";
import { sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

const getItemTypeValue = (char?: string) => {
  if(!char || char.length > 1) {
    throw new Error("Item Type format is invalid");
  }
  if(/[a-z]/.test(char)) {
    return char.charCodeAt(0) - 96;
  } else if(/[A-Z]/.test(char)) {
    return char.charCodeAt(0) - 64 + 26;
  }
  throw new Error("Item Type range is invalid: "+char);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inventory = input.split('\n')
                         .map(l => [
                            new Set(l.slice(0, l.length/2).split('')), 
                            new Set(l.slice(l.length/2).split(''))
                          ]);

  return inventory.map(i => {
    // console.log("Matching item: ", [...i[0]].find((x) => i[1].has(x)), getItemTypeValue([...i[0]].find((x) => i[1].has(x))));
    return getItemTypeValue([...i[0]].find((x) => i[1].has(x)));
  }).reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const elves = input.split('\n').map(e => new Set(e));
  const groupings = [...Array(Math.ceil(elves.length/3))].map((_, i) => elves.slice(i * 3, i * 3+3));

  return groupings.map((g, i) => {
    if(g.length != 3) throw Error("Odd elf out at index " + i);
    return getItemTypeValue([...g[0]].find((x) => g[1].has(x) && g[2].has(x)));
  }).reduce(sum, 0);
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
