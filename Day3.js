const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day3Input.txt'),
  'utf8'
);
const inputArray = input.split('\n');

const testInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.588',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];
const numberFinder = (input) => {
  const numbersArray = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (isNaN(input[row][col])) continue;

      let start = col;
      let end = col;

      while (!isNaN(input[row][col])) {
        end = col;
        col++;
      }
      const partNumber = Number(input[row].slice(start, end + 1));
      const top =
        row === 0
          ? ''
          : input[row - 1].slice(start === 0 ? 0 : start - 1, end + 2);
      const right = end === input[row].length - 1 ? '' : input[row][end + 1];
      const bottom =
        row === input.length - 1
          ? ''
          : input[row + 1].slice(start === 0 ? 0 : start - 1, end + 2);
      const left = start === 0 ? '' : input[row][start - 1];
      numbersArray.push({
        partNumber,
        row,
        columnStart: start,
        columnEnd: end,
        top,
        left,
        bottom,
        right,
      });
    }
  }
  return numbersArray;
};
// console.log(numberFinder(testInput));

const partNumberSum = (input = []) => {
  return numberFinder(input).reduce((acc, curr) => {
    const { partNumber, top, right, bottom, left } = curr;
    return /[^.0-9]/.test(top + right + bottom + left) ? acc + partNumber : acc;
  }, 0);
};
// console.log(partNumberSum(testInput)); // 4361
// console.log(partNumberSum(inputArray)); // 532428

const partTwo = (input = []) => {
  const nums = numberFinder(input);

  return Array.from(
    nums.reduce((acc, curr) => {
      const {
        partNumber,
        row,
        columnStart,
        columnEnd,
        top,
        right,
        bottom,
        left,
      } = curr;
      const mapAdder = (row, start, end) => {
        for (let i = start; i <= end; i++) {
          if (input[row][i] === '*') {
            const key = `${row}, ${i}`;
            acc.set(key, (acc.get(key) || []).concat(partNumber));
          }
        }
      };

      if (/[*]/.test(top)) {
        mapAdder(row - 1, columnStart - 1, columnEnd + 1);
      }
      if (/[*]/.test(right)) {
        mapAdder(row, columnEnd + 1, columnEnd + 1);
      }
      if (/[*]/.test(bottom)) {
        mapAdder(row + 1, columnStart - 1, columnEnd + 1);
      }
      if (/[*]/.test(left)) {
        mapAdder(row, columnStart - 1, columnStart - 1);
      }
      return acc;
    }, new Map())
  ).reduce(
    (acc, curr) => (curr[1].length === 2 ? acc + curr[1][0] * curr[1][1] : acc),
    0
  );
};

// console.log(partTwo(testInput)); //467835
// console.log(partTwo(inputArray)); //84051670
