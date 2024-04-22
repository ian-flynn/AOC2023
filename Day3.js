const { match } = require('assert');

const testInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];

const schematicAdder = (rows) => {
  let total = 0;
  let prevNumbers = [];
  let prevSymbols = [];
  for (const row of rows) {
    const currentRow = row.split('');

    let currNumbers = [];
    const currSymbols = [];
    // [the number, array of indices it can be found at]
    let numberBuilder = ['', []];

    for (let [index, element] of Object.entries(currentRow)) {
      index = Number(index);

      if (element == '.') {
        if (numberBuilder[0]) {
          currNumbers.push(numberBuilder);
          numberBuilder = ['', []];
        }
      } else if (!isNaN(element)) {
        numberBuilder[0] += element;
        numberBuilder[1].push(index);
      } else {
        if (numberBuilder[0]) {
          currNumbers.push(numberBuilder);
          numberBuilder = ['', []];
        }
        currSymbols.push(index);
      }
    }
    //END OF ROW THINGS
    const matchSearch = (numbers, symbols) => {
      let count = 0;
      for (let [key, element] of Object.entries(numbers)) {
        if (element === null) continue;
        count++;
        for (let index of element[1]) {
          if (
            symbols.includes(index - 1) ||
            symbols.includes(index) ||
            symbols.includes(index + 1)
          ) {
            console.log(element[0]);
            total += Number(element[0]);
            numbers[key] = null;
            break;
          }
        }
      }
      console.log(count);
    };
    //check  previous numbers for matches against current symbols
    matchSearch(prevNumbers, currSymbols);

    //check current numbers for matches against previous symbols
    matchSearch(currNumbers, prevSymbols);

    //check current numbers for matches against current symbols
    matchSearch(currNumbers, currSymbols);

    //cleanup
    //remove prev row and replace with current stuff
    // numbers and symbols with locations
    prevNumbers = [...currNumbers];
    prevSymbols = [...currSymbols];
  }
  return total;
};

console.log(schematicAdder(testInput));
//3744
