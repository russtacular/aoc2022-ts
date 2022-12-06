import run from "aocrunner";
import { arrayBuffer } from "stream/consumers";

const part1 = (rawInput: string) => rawInput.split('')
  .findIndex((v, i, arr) =>
    i >=4 && new Set([v, arr[i-1], arr[i-2], arr[i-3]]).size == 4
  ) + 1

  
const findDuplicateIndexRight = (arr: string[]) => {
  let idx = -1;
  for(let i = arr.length-1; i >= 0; i--) {
    idx = arr.slice(0, i-1).findLastIndex(v => v === arr[i]);
    if(idx != -1) break;
  }
  return idx;
}

const part2 = (rawInput: string) => {
  const delimeterSize = 14;
  const input = rawInput.split('');

  let i = delimeterSize;
  while(i < input.length) {
    const slice = input.slice(i - delimeterSize, i);
    if( new Set(slice).size === delimeterSize ) break;

    i += findDuplicateIndexRight(slice) + 1;
  }
  return i;
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
