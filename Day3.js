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

const partNumbers = (input) => {
  const results = [];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (isNaN(input[row][col])) continue;

      let start = col;
      let end = col;

      while (!isNaN(input[row][col])) {
        end = col;
        col++;
      }
      const top =
        row === 0
          ? ''
          : input[row - 1].slice(start === 0 ? 0 : start - 1, end + 2);
      const sides =
        (start === 0 ? '' : input[row][start - 1]) +
        (end === input[row].length - 1 ? '' : input[row][end + 1]);
      const bottom =
        row === input.length - 1
          ? ''
          : input[row + 1].slice(start === 0 ? 0 : start - 1, end + 2);

      if (/[^.0-9]/.test(top + sides + bottom)) {
        results.push(input[row].slice(start, end + 1));
      }
    }
  }
  return results;
};
// const testArray = partNumbers(testInput);
// console.log(testArray);
// console.log(
//   testArray.reduce((acc, curr) => {
//     return Number(acc) + Number(curr);
//   }, 0)
// );

// const resultArray = partNumbers(inputArray);
// console.log(resultArray);
// console.log(
// resultArray.reduce((acc, curr) => {
// return Number(acc) + Number(curr);
// }, 0)
// );

// 532428

const partTwo = (input) => {
  const gearMap = new Map();

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (isNaN(input[row][col])) continue;

      let start = col;
      let end = col;

      while (!isNaN(input[row][col])) {
        end = col;
        col++;
      }
      const partNumber = input[row].slice(start, end + 1);
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

      const gearMapAdder = (row, col) => {
        if (input[row][col] === '*') {
          gearMap.has(`${row}, ${col}`)
            ? gearMap.get(`${row}, ${col}`).push(Number(partNumber))
            : gearMap.set(`${row}, ${col}`, [Number(partNumber)]);
        }
      };

      if (/[*]/.test(top)) {
        for (let i = start - 1; i <= end + 1; i++) {
          gearMapAdder(row - 1, i);
        }
      }
      if (/[*]/.test(right)) {
        gearMapAdder(row, end + 1);
      }
      if (/[*]/.test(bottom)) {
        for (let i = start - 1; i <= end + 1; i++) {
          gearMapAdder(row + 1, i);
        }
      }
      if (/[*]/.test(left)) {
        gearMapAdder(row, start - 1);
      }
    }
  }
  let gearRatioSum = 0;
  gearMap.forEach((partsArray) => {
    if (partsArray.length == 2) {
      gearRatioSum += partsArray[0] * partsArray[1];
    }
  });
  return gearRatioSum;
};

console.log(partTwo(testInput)); //467835
console.log(partTwo(inputArray)); //84051670
