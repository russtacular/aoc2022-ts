import run from "aocrunner";
import { arrayBuffer } from "stream/consumers";

const simpleSearch = (str: string, delimeterSize: number) => {
  return str.split('')
    .findIndex((v, i, arr) =>
      i >= delimeterSize && new Set(arr.slice(i-delimeterSize, i)).size == delimeterSize
    )
}

const fastSearch = (str: string, delimeterSize: number) => {
  const input = str.split('');
  let i = delimeterSize;
  
  while(i < input.length) {
    const slice = input.slice(i - delimeterSize, i);
    const dupIdx = findDuplicateIndexRight(slice);
    if(dupIdx === -1) break;
    
    i += dupIdx + 1;
  }
  return i;
}

const findDuplicateIndexRight = (arr: string[]) => {
  let idx = -1;

  for(let i = arr.length-1; i > 0; i--) {
    idx = arr.slice(0, i).findLastIndex(v => v === arr[i]);
    
    if(idx != -1) break;
  }
  return idx;
}

const part1 = (rawInput: string) => simpleSearch(rawInput, 4);

const part2 = (rawInput: string) => fastSearch(rawInput, 14);

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
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
