import run from "aocrunner";
import { sum } from "../utils/index.js";

class File {
  name: string;
  size: number;
  parent: Directory;

  constructor(name = '', size = 0, parent: Directory) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
}

class Directory {
  dirName: string;
  parent: Directory|undefined;
  contents: (File|Directory)[];

  constructor(name = '', contents = [], parent: Directory|undefined = undefined) {
    this.dirName = name;
    this.parent = parent || undefined;
    this.contents = contents;
  }
}

interface CLI {
  cmd: string,
  res: string[]
}

const parseInput = (rawInput: string) => {
  return rawInput.split('$ ').filter(v=>v.length>0).map(l => {
    return {
      cmd: l.split('\n')[0],
      res: l.split('\n').slice(1).filter(v=>v.length>0)
    }
  });
};

function isDirectory(item: Directory|File): item is Directory { return item instanceof Directory; } 
function isFile(item: Directory|File): item is File { return item instanceof File; } 

const buildFS = (cl: CLI[]) => {
  const root = new Directory('/');
  let curDirectory: Directory = root; // Objects and Arrays are references in JS

  cl.forEach(c => {
    // console.log('\npwd:', curDirectory);
    // console.log('cmd:', c);
    // console.log('root:', root);

    switch (c.cmd.split(' ')[0]) {
      case 'cd':
        const arg = c.cmd.split(' ')[1];
        if(arg == '/') {
          curDirectory = root;
        } else if(arg == '..') {
          curDirectory = curDirectory.parent ? curDirectory.parent : root;
        } else {
          let newDir = curDirectory.contents.filter(isDirectory).find(d => d.dirName == arg);
          if(!newDir) {
            throw new Error('Directory does not exist'); 
          }
          curDirectory = newDir;
        }
        break;
      case 'ls':
        // console.log('#before ls cmd: curDirectory', curDirectory);
        if(curDirectory.contents.length !== 0) { 
          // console.log('Repeat directory visit', curDirectory);
          break 
        };
        const dirFs = c.res.map(v => {
          // console.log(v);
          const attr = v.split(' ')
          if(attr[0] == 'dir') {
            return new Directory(attr[1], [], curDirectory);
          }
          return new File(attr[1], parseInt(attr[0], 10), curDirectory);
        });
        // console.log('dirFs:',dirFs);
        curDirectory.contents.push(...dirFs);
        // console.log('#after ls cmd: curDirectory', curDirectory);
        break;
      default:
        throw new Error("Unknown CLI command");
    }
  });

  return root;
}


const fsToString = (fs: Directory) => {
  const getName = (item: Directory|File) => {
    return item instanceof Directory ? item.dirName : item.name;
  }
  const getMetadata = (item: Directory|File) => {
    if(item instanceof Directory) {
      return '(dir)';
    }
    return `(file, size=${item.size})`;
  }
  
  const printItem = (item: Directory|File, indentLevel:number) => {
    if(item instanceof Directory && item.dirName == 'dcvzbqf') { console.log(item); }
    return ' '.repeat(2*indentLevel) +
      `- ${getName(item)} ${getMetadata(item)}\n`;
  }

  const printDir = (dir: Directory, initIndent: number): string => {
    let indentLevel = initIndent;
    // if(dir instanceof Directory && dir.dirName == 'dcvzbqf') { console.log(dir, indentLevel); }

    const output = dir.contents.map(item => {
      if(item instanceof File) {
        return printItem(item, indentLevel);
      }
      return printItem(item, indentLevel) + printDir(item, indentLevel+1);
    }).join('');

    // if(dir instanceof Directory && dir.dirName == 'dcvzbqf') { console.log(output); }

    return output;
  }

  return printItem(fs,0) + printDir(fs, 1);
}

const getSizeRecurisively = (dir: Directory) => {
  const directories: {dir: Directory, size: number}[] = [];
  
  const recurse = (d: Directory): number => {
    const fstat = d.contents.map(item => {
      if(item instanceof File) {
        return item.size;
      } else {
        return recurse(item);
      }
    }).flat().reduce(sum, 0);
    
    directories.push({dir: d, size: fstat});
    
    return fstat;
  }

  return {
    res: recurse(dir),
    directories: directories
  };
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const fs = buildFS(input);

  const results = getSizeRecurisively(fs);

  // console.log('\n\n************\n\n');
  // console.log(fsToString(fs));

  // smallDirs.forEach(d=>console.log(d));
  // console.log(results.smallDirs);
  // console.log('array length: ', smallDirs.length);
  // console.log('set length:', new Set(smallDirs).size);
  // console.log('total:', totalSize);
  
  return results.directories.filter(i=>i.size<100000).map(i => i.size).reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const fs = buildFS(input);

  const results = getSizeRecurisively(fs);

  const storageSpace = 70000000;
  const spaceNeeded = 30000000;

  const spaceAvailable = storageSpace - results.res;

  return results.directories.map(d=>d.size).reduce((prev, curr) => {
    return curr + spaceAvailable > spaceNeeded && curr < prev ? curr : prev;
  }, results.res);
};

run({
  part1: {
    tests: [
      {
        input: 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
