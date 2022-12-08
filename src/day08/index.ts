import run from "aocrunner";
import { sum, max } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(r => r.split('').map(t => parseInt(t, 10)));
};

const isVisible = (x: number, y: number, grid: number[][]) => {
  if(isEdge(x,y,grid)) { return true; }
  
  const row = grid[y];
  const col = grid.map(r => r[x]);
  const hidden = isHidden(x, row) && isHidden(y, col);

  return !hidden;
}

const isEdge = (x: number, y: number, grid: number[][]) => {
  if(x == 0 || y == 0) { return true; }
  if(x == grid[0].length - 1 || y == grid.length - 1) { return true; }
  return false;
}

const isHidden = (index: number, arr: number[]) => {
  const left = arr.slice(0, index);
  const right = arr.slice(index + 1);

  return arr[index] <= left.reduce(max,0) && arr[index] <= right.reduce(max,0);
}

const scenicScore = (x: number, y: number, grid: number[][]) => {
  if(isEdge(x,y,grid)) { return 0; }

  const row = grid[y];
  const col = grid.map(r => r[x]);
  const score = getScore(x, row) * getScore(y, col);

  return score;
}

const getScore = (index: number, arr: number[]) => {
  const sides = [arr.slice(0, index).reverse(), arr.slice(index+1)];
  const scores = sides.map(s => 1 + (s.findIndex(v => v >= arr[index]) >= 0 ? s.findIndex(v => v >= arr[index]) : s.length-1));
  
  return scores.reduce((a,b) => a*b, 1);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map((row, y, grid) => row.map((tree, x) => +isVisible(x,y,grid)))
    .flat().reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map((row, y, grid) => row.map((tree, x) => scenicScore(x,y,grid)))
    .flat().reduce(max, 0);
};

run({
  part1: {
    tests: [
      {
        input: 
`30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 
`30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
