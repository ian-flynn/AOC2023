const { log } = require('console');
const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day3Input.txt'),
  'utf8'
);
const inputArray = input.split('\n');

// console.log(inputArray);

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
  const found = [];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      // console.log(row, col);
      const element = input[row][col];
      if (isNaN(element)) continue;

      let start = col;
      let end = col;
      while (!isNaN(input[row][col])) {
        end = col;
        col++;
      }
      // console.log(input[row].slice(start, end + 1));

      // console.log(input[4].slice(0 === 0 ? 0 : 0 - 1, 4 + 2));
      console.log(input[row].length);
      const top =
        row === 0
          ? ''
          : input[row - 1].slice(start === 0 ? 0 : start - 1, end + 2);

      const sides =
        (start === 0 ? '' : input[row][start - 1]) +
        (end === input[row].length - 1 ? '' : input[row][end + 1]);

      const bottom = row === input.length - 1 ? '' : input[row + 1];

      console.log(input[row].slice(start, end + 1), top, sides, bottom);
    }
  }
  return found;
};

const testArray = partNumbers(testInput);
console.log(testArray);
console.log(
  testArray.reduce((acc, curr) => {
    return Number(acc) + Number(curr);
  }, 0)
);
