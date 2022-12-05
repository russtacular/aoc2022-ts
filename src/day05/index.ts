import run from "aocrunner";
import { transposeArray } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const inputPieces = rawInput.split('\n\n');

  const containers = inputPieces[0].split('\n')
    .slice(0, -1) // drop the "header" row at the bottom
    .reverse()
    .map(l => l.split('').filter((_, i) => (i-1)%4 == 0).map(c => c == ' ' ? null : c))
  
  const instructions = inputPieces[1].split('\n').map(l => {
    const digits = l.match(/\d+/g)?.map(d => parseInt(d, 10));
    if(digits?.length !== 3) throw new Error("Invalid instruction format: "+l);

    return {
      'qty': digits?.at(0) ?? 0,
      'from': digits?.at(1) ?? 0,
      'to': digits?.at(2) ?? 0
    };
  })
  
  return {
    'containers': transposeArray(containers).map(col => col.filter(x => x)) as string[][], // transpose and filter out null values
    'instructions': instructions
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.instructions.forEach((i, idx) => {
    for(let ii = 0; ii < i.qty; ii++) {
      const from = input.containers[i.from -1].pop();
      if(!from) throw new Error('Attempted to move an undefined container!');
      input.containers[i.to -1].push(from);
    }
    // console.log('Containers after move ', idx, input.containers);
  })
  return input.containers.map(c => c.pop()).join('');
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.instructions.forEach((i, idx) => {
    // console.log('index, instruction, state', idx, i, input.containers);
    const from = input.containers[i.from -1].splice(-i.qty, i.qty);
    if(!from.length) throw new Error('Attempted to move an undefined container!');

    input.containers[i.to -1].push(...from);
    // console.log('after: splice, state', from, input.containers);
  })
  return input.containers.map(c => c.pop()).join('');
};

run({
  part1: {
    tests: [
      {
        input: 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
`    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
