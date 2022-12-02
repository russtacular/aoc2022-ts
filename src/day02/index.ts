import run from "aocrunner";

type roundNotation = [
  'A'|'B'|'C',
  'X'|'Y'|'Z'
];

const parseInput = (rawInput: string) => rawInput;

const shapeScore = {
  X: 1,
  Y: 2,
  Z: 3
};
const winScenarios = [
  'A Y',
  'B Z',
  'C X'
];
const drawScenarios = [
  'A X',
  'B Y',
  'C Z'
];
const sum = (acc: number, curr: number) => acc + curr;


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split('\n').map(round => {
    let roundScore = 0;
    const shapesPlayed = round.split(' ') as roundNotation;

    if(winScenarios.includes(round)) {
      roundScore+=6;
    } else if(drawScenarios.includes(round)) {
      roundScore+=3;
    }
    roundScore += shapeScore[shapesPlayed[1]]

    return roundScore; 
  }).reduce(sum, 0);
};

const shapeScore2 = {
  'A X': 3 + 0,
  'A Y': 1 + 3,
  'A Z': 2 + 6,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 2 + 0,
  'C Y': 3 + 3,
  'C Z': 1 + 6
}

type roundResult = keyof typeof shapeScore2;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results = input.split('\n') as roundResult[];

  return results.map(round => shapeScore2[round]).reduce(sum, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
A Y
B X
C Z
`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
