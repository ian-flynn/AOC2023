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

console.log(partNumberSum(testInput)); // 4361
console.log(partNumberSum(inputArray)); // 532428

const partTwo = (input = []) => {
  const nums = numberFinder(input);

  const gearMap = new Map();

  const gearMapAdder = (row, col, partNumber) => {
    if (input[row][col] === '*') {
      gearMap.has(`${row}, ${col}`)
        ? gearMap.get(`${row}, ${col}`).push(Number(partNumber))
        : gearMap.set(`${row}, ${col}`, [Number(partNumber)]);
    }
  };

  nums.forEach((el) => {
    const {
      partNumber,
      row,
      columnStart,
      columnEnd,
      top,
      right,
      bottom,
      left,
    } = el;

    if (/[*]/.test(top)) {
      for (let i = columnStart - 1; i <= columnEnd + 1; i++) {
        gearMapAdder(row - 1, i, partNumber);
      }
    }
    if (/[*]/.test(right)) {
      gearMapAdder(row, columnEnd + 1, partNumber);
    }
    if (/[*]/.test(bottom)) {
      for (let i = columnStart - 1; i <= columnEnd + 1; i++) {
        gearMapAdder(row + 1, i, partNumber);
      }
    }
    if (/[*]/.test(left)) {
      gearMapAdder(row, columnStart - 1, partNumber);
    }
  });
  console.log(gearMap);

  let gearRatioSum = 0;
  gearMap.forEach((partsArray) => {
    if (partsArray.length == 2) {
      gearRatioSum += partsArray[0] * partsArray[1];
    }
  });
  return gearRatioSum;
};

console.log(partTwo(testInput)); //467835
// console.log(partTwo(inputArray)); //84051670

// const partTwo = (input) => {
//   const gearMap = new Map();

//   for (let row = 0; row < input.length; row++) {
//     for (let col = 0; col < input[0].length; col++) {
//       if (isNaN(input[row][col])) continue;

//       let start = col;
//       let end = col;

//       while (!isNaN(input[row][col])) {
//         end = col;
//         col++;
//       }
//       const partNumber = input[row].slice(start, end + 1);
//       const top =
//         row === 0
//           ? ''
//           : input[row - 1].slice(start === 0 ? 0 : start - 1, end + 2);
//       const right = end === input[row].length - 1 ? '' : input[row][end + 1];
//       const bottom =
//         row === input.length - 1
//           ? ''
//           : input[row + 1].slice(start === 0 ? 0 : start - 1, end + 2);
//       const left = start === 0 ? '' : input[row][start - 1];

//       const gearMapAdder = (row, col) => {
//         if (input[row][col] === '*') {
//           gearMap.has(`${row}, ${col}`)
//             ? gearMap.get(`${row}, ${col}`).push(Number(partNumber))
//             : gearMap.set(`${row}, ${col}`, [Number(partNumber)]);
//         }
//       };

//       if (/[*]/.test(top)) {
//         for (let i = start - 1; i <= end + 1; i++) {
//           gearMapAdder(row - 1, i);
//         }
//       }
//       if (/[*]/.test(right)) {
//         gearMapAdder(row, end + 1);
//       }
//       if (/[*]/.test(bottom)) {
//         for (let i = start - 1; i <= end + 1; i++) {
//           gearMapAdder(row + 1, i);
//         }
//       }
//       if (/[*]/.test(left)) {
//         gearMapAdder(row, start - 1);
//       }
//     }
//   }
//   let gearRatioSum = 0;
//   gearMap.forEach((partsArray) => {
//     if (partsArray.length == 2) {
//       gearRatioSum += partsArray[0] * partsArray[1];
//     }
//   });
//   return gearRatioSum;
// };

// console.log(partTwo(testInput)); //467835
// console.log(partTwo(inputArray)); //84051670
