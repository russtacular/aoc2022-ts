import run from "aocrunner";
import { sum } from "../utils/index.js";

type Point = [number, number];
type Vector = { dir: string, mag: number };

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map(r => r.split(' ')).map(r=> {
    return {dir: r[0], mag: parseInt(r[1], 10)};
  });

class Rope {
  knots: Point[];
  tailHist: Point[] = [[0,0]];

  constructor(ropeSize: number) {
    this.knots = new Array(ropeSize).fill([0,0]);
  }

  move(v: Vector) {  
    const relMag = v.dir === 'D' || v.dir === 'L' ? -1 : 1;
    if(v.dir === 'U' || v.dir === 'D') {
      for(let yy = v.mag; yy > 0; yy--) {
        this.knots[0] = [this.knots[0][0], this.knots[0][1] + relMag * 1];
        this.moveTail();
      }
    } else {
      for(let xx = v.mag; xx > 0; xx--) {
        this.knots[0] = [this.knots[0][0] + relMag * 1, this.knots[0][1]];
        this.moveTail();
      }
    }
  }

  moveTail() {
    for(let i = 1; i < this.knots.length; i++) {
      if(!this.isAdjacent(this.knots[i], this.knots[i - 1])) {
        const dx = this.knots[i-1][0]-this.knots[i][0];
        const dy = this.knots[i-1][1]-this.knots[i][1];
        const newPt: Point = [
          this.knots[i][0] + (Math.abs(dx) === 2 ? dx/2 : dx),
          this.knots[i][1] + (Math.abs(dy) === 2 ? dy/2 : dy)
        ];

        this.knots[i] = newPt;
        if(i === this.knots.length-1) {
          this.tailHist.unshift(newPt);
        }
      } else {
        break;
      }
    }
  }

  isAdjacent(back: Point, front: Point) {
    return Math.abs(front[0] - back[0]) <= 1 && Math.abs(front[1] - back[1]) <= 1;
  }
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rope = new Rope(2);

  input.forEach(v => rope.move(v));
  return new Set(rope.tailHist.map(p => p.join(','))).size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rope = new Rope(10);

  input.forEach(v => rope.move(v));
  return new Set(rope.tailHist.map(p => p.join(','))).size;
};

run({
  part1: {
    tests: [
      {
        input: 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
