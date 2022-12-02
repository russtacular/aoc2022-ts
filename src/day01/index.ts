import run from "aocrunner";
import { sum } from "../utils/index.js"


const parseInventory = (inventory: string, firstSep = '\n\n', secondSep = '\n') =>
    inventory
        .trim()
        .split(firstSep)
        .map(i => i.split(secondSep));

const calorieCount = (elvesInv: string[][]) => {
  const result = elvesInv.map(e => e.map(i => parseInt(i, 10)).reduce(sum, 0));
  result.sort((a,b) => b - a);
  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInventory(rawInput);

  return calorieCount(input)[0];
};

const part2 = (rawInput: string) => {
  const input = parseInventory(rawInput);

  return calorieCount(input).slice(0,3).reduce(sum, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
