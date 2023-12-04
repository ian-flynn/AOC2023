const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day1Input.txt'),
  'utf8'
);
const newInput = input.split('\n');

const totaler = newInput.reduce((acc, curr) => {
  //remove all non-numbers
  curr = curr.replace(/[^0-9]/g, '');
  //create two digit coordinate string
  curr = curr[0] + curr[curr.length - 1];
  //turn string to integer and add to total
  acc += parseInt(curr);

  return acc;
}, 0);

console.log(totaler);
