const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day2Input.txt'),
  'utf8'
);
// console.log(input)
const inputArray = input.split('\n');
console.log(inputArray);
