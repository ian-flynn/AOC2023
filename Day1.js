const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day1Input.txt'),
  'utf8'
);
const inputArray = input.split('\n');

// // Part 1
const partOne = (input) => {
  return input.reduce((acc, curr) => {
    //remove all non-numbers
    curr = curr.replace(/[^0-9]/g, '');
    //create two digit coordinate string
    curr = curr[0] + curr[curr.length - 1];
    //turn string to integer and add to total
    acc += parseInt(curr);

    return acc;
  }, 0);
};

console.log(partOne(inputArray));

// Part 2

const partTwo = (input) => {
  return input.reduce((acc, curr) => {
    //replace all word numbers with wordnumberword
    const replaced = curr
      .replace('one', 'one1one')
      .replace('two', 'two2two')
      .replace('three', 'three3three')
      .replace('four', 'four4four')
      .replace('five', 'five5five')
      .replace('six', 'six6six')
      .replace('seven', 'seven7seven')
      .replace('eight', 'eight8eight')
      .replace('nine', 'nine9nine');
    //continue just like part one

    //remove all non-numbers
    const justDigits = replaced.replace(/[^0-9]/g, '');

    //create two digit coordinate string
    const twoDigits = justDigits[0] + justDigits[justDigits.length - 1];

    // console.log([curr, replaced, justDigits, twoDigits]);

    //turn string to integer and add to total
    acc += Number(twoDigits);

    return acc;
  }, 0);
};

console.log(partTwo(inputArray));
