import { program } from 'commander';
import { readFileSync } from 'fs';


program
    .requiredOption('-f, --filename <filename>', 'must provide a filename in the same directory')
    .parse();

const opts = program.opts();
const file = readFileSync(opts.filename, 'utf-8');

const parseInventory = (inventory: string, firstSep = '\n\n', secondSep = '\n') =>
    inventory
        .trim()
        .split(firstSep)
        .map(i => i.split(secondSep));

const sum = (acc: number, current = 0) => acc + current;

const calorieCount = parseInventory(file)
    .map(e => e.map(i => parseInt(i, 10)).reduce(sum, 0));

calorieCount.sort((a,b) => b - a);

console.log('Part A:', calorieCount[0]);

console.log('Part B:', calorieCount.slice(0,3).reduce(sum, 0));
