const fs = require('fs');

const input = fs.readFileSync('./Inputs/Day5Input.txt', 'utf-8');
// console.log(input);

const inputFormatter = (input) => {
  input = input.split(/\n\s*\n/).reduce((acc, curr) => {
    curr = curr.split(':');
    const name = curr[0];
    if (name === 'seeds') {
      curr[1] = curr[1].slice(1);
    }

    acc[name] = curr[1]
      .split('\n')
      .filter((el) => el !== '')
      .map((el) => el.split(' ').map((el) => Number(el)));
    return acc;
  }, {});

  input.seeds = input.seeds.flat();

  return input;
};
formattedInput = inputFormatter(input);
// console.log(formattedInput);

const lowLocationFinder = (input) => {
  const mapper = (sourceArray, map) => {
    const destinationArray = [];
    for (let sourceItem of sourceArray) {
      for (const row of input[map]) {
        const [dRS, sRS, range] = row;
        if (sourceItem >= sRS && sourceItem < sRS + range) {
          sourceItem = dRS + (sourceItem - sRS);
          break;
        }
      }
      destinationArray.push(sourceItem);
    }
    return destinationArray;
  };
  //seeds to soils
  const soils = mapper(input.seeds, 'seed-to-soil map');
  //soil to fert
  const fertilizers = mapper(soils, 'soil-to-fertilizer map');
  // fert to water
  const waters = mapper(fertilizers, 'fertilizer-to-water map');
  //water to light
  const lights = mapper(waters, 'water-to-light map');
  //light to temp
  const temperatures = mapper(lights, 'light-to-temperature map');
  //temp to humidity
  const humidities = mapper(temperatures, 'temperature-to-humidity map');
  //humidity to location
  const locations = mapper(humidities, 'humidity-to-location map');
  // console.log(locations);
  return Math.min(...locations);
};

console.log(lowLocationFinder(formattedInput)); // 157211394
