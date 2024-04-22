const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(
  path.join(__dirname, '/Inputs/', 'Day2Input.txt'),
  'utf8'
);

const inputArray = input.split('\n');

// Part 1
const partOne = (input) => {
  //12 red, 13 green, 14 blue
  let total = 0;
  input.forEach((game) => {
    let isPossible = true;
    // split off the 'Game #: ' from the sets
    game = game.split(': ');
    gameNumber = game[0];
    // split the sets string into array of sets
    gameSets = game[1].split('; ');
    // for each set, check if any of the number of cubes is higher than the inventory
    gameSets.forEach((set) => {
      set = set.split(', ');
      set.forEach((colorGroup) => {
        colorGroup = colorGroup.split(' ');
        if (
          (colorGroup[1] === 'red' && colorGroup[0] > 12) ||
          (colorGroup[1] === 'green' && colorGroup[0] > 13) ||
          colorGroup[0] > 14
        )
          isPossible = false;
      });
    });
    // if none of the sets had excess cubes, it's a good set
    if (isPossible) {
      total += +gameNumber.split(' ')[1];
    }
  });

  return total;
};

console.log(partOne(inputArray));
