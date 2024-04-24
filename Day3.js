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
  const mapAdder = (map, row, col, partNumber) => {
    console.log(partNumber, input[row][col]);
    if (input[row][col] === '*') {
      const key = `${row}, ${col}`;
      map.set(key, (map.get(key) || []).concat(partNumber));
    }
  };

  return Array.from(
    nums.reduce((acc, curr) => {
      const map2Adder = (map, row, col, partNumber, string, start, end) => {
        console.log(partNumber, string);
        for (let i = start; i < end; i++) {
          // map2Adder(acc, row - 1, i, partNumber, top);

          console.log(i);
          console.log(input[row][i]);
          if (input[row][col] === '*') {
            const key = `${row}, ${col}`;
            map.set(key, (map.get(key) || []).concat(partNumber));
          }
        }
      };
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

      if (/[*]/.test(top)) {
        for (let i = columnStart - 1; i <= columnEnd + 1; i++) {
          mapAdder(acc, row - 1, i, partNumber);
        }
        // map2Adder(acc, row - 1, null, partNumber, top);
      }
      if (/[*]/.test(right)) {
        mapAdder(acc, row, columnEnd + 1, partNumber);
        // map2Adder(
        //   acc,
        //   row,
        //   columnEnd + 1,
        //   partNumber,
        //   right,
        //   columnEnd + 1,
        //   columnEnd + 2
        // );
      }
      if (/[*]/.test(bottom)) {
        for (let i = columnStart - 1; i <= columnEnd + 1; i++) {
          mapAdder(acc, row + 1, i, partNumber);
        }
      }
      if (/[*]/.test(left)) {
        mapAdder(acc, row, columnStart - 1, partNumber);
      }
      return acc;
    }, new Map())
  ).reduce(
    (acc, curr) => (curr[1].length === 2 ? acc + curr[1][0] * curr[1][1] : acc),
    0
  );
};

console.log(partTwo(testInput)); //467835
// console.log(partTwo(inputArray)); //84051670
