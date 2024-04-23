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

      const symbolSearch = (left, right) => {
        // console.log(left, right);
        //look above
        // console.log(row);
        for (let i = start - 1; i <= end + 1; i++) {
          if (row == 0) continue;
          if (i < 0) continue;
          if (input[row - 1][i] !== '.' && isNaN(input[row - 1][i])) {
            console.log(input[row].slice(start, end + 1));
            found.push(input[row].slice(start, end + 1));
            // foundSymbol = true;
          }
        }
        // if (foundSymbol) break;

        //look left
        if (
          start !== 0 &&
          input[row][start - 1] !== '.' &&
          isNaN(input[row][start - 1])
        ) {
          found.push(input[row].slice(start, end + 1));
          console.log(input[row].slice(start, end + 1));
          // break;
        }
        //look right
        if (
          (end !== input[row][end + 1]) !== '.' &&
          isNaN(input[row][end + 1])
        ) {
          found.push(input[row].slice(start, end + 1));
          // break;
        }
        // if (foundSymbol) break;
        //look below
        for (let i = start - 1; i <= end + 1; i++) {
          if (row == input.length - 1) break;
          if (i < 0 || i > input[0].length) continue;
          if (input[row + 1][i] !== '.' && isNaN(input[row + 1][i])) {
            // console.log(input[row].slice(start, end + 1));
            found.push(input[row].slice(start, end + 1));
            // foundSymbol = true;
          }
        }
      };
      // symbolSearch(start, end);
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

// const schematicAdder = (rows) => {
//   let total = 0;
//   let prevNumbers = [];
//   let prevSymbols = [];
//   for (const row of rows) {
//     const currentRow = row.split('');

//     let currNumbers = [];
//     const currSymbols = [];
//     // [the number, array of indices it can be found at]
//     let numberBuilder = ['', []];

//     for (let [index, element] of Object.entries(currentRow)) {
//       index = Number(index);

//       if (element == '.') {
//         if (numberBuilder[0]) {
//           currNumbers.push(numberBuilder);
//           numberBuilder = ['', []];
//         }
//       } else if (!isNaN(element)) {
//         numberBuilder[0] += element;
//         numberBuilder[1].push(index);
//       } else {
//         if (numberBuilder[0]) {
//           currNumbers.push(numberBuilder);
//           numberBuilder = ['', []];
//         }
//         currSymbols.push(index);
//       }
//     }
//     //END OF ROW THINGS
//     const matchSearch = (numbers, symbols) => {
//       for (let [key, element] of Object.entries(numbers)) {
//         if (element === null) continue;

//         for (let index of element[1]) {
//           if (
//             symbols.includes(index - 1) ||
//             symbols.includes(index) ||
//             symbols.includes(index + 1)
//           ) {
//             total += Number(element[0]);
//             numbers[key] = null;
//             break;
//           }
//         }
//       }
//     };
//     //check  previous numbers for matches against current symbols
//     matchSearch(prevNumbers, currSymbols);

//     //check current numbers for matches against previous symbols
//     matchSearch(currNumbers, prevSymbols);

//     //check current numbers for matches against current symbols
//     matchSearch(currNumbers, currSymbols);

//     //cleanup
//     //remove prev row and replace with current stuff
//     // numbers and symbols with locations
//     prevNumbers = [...currNumbers];
//     prevSymbols = [...currSymbols];
//   }
//   return total;
// };

// // console.log(schematicAdder(testInput));
// // console.log(schematicAdder(inputArray));
