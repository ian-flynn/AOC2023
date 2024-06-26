const input = fs.readFileSync('./Inputs/Day4Input.txt', 'utf8').split('\n');
// console.log(input);

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split('\n');
// console.log(testInput);

const findMatches = (input) => {
  const cards = input.reduce((acc, curr) => {
    const [name, remainder] = curr.split(':');

    const [winningNumbers, myNumbers] = remainder.split('|').map((el) => {
      return el.split(' ').filter((el) => el !== '');
    });
    acc[name] = {
      winningNumbers,
      myNumbers,
    };
    return acc;
  }, {});

  let points = 0;
  for (const [card, info] of Object.entries(cards)) {
    const matches = info.winningNumbers.filter((el) =>
      info.myNumbers.includes(el)
    );
    points += matches.reduce((acc, curr) => (!acc ? 1 : acc * 2), 0);
  }
  return points;
};

// console.log(findMatches(testInput)); // 13
// console.log(findMatches(input)); // 23028

const countScratchcards = (input) => {
  const cards = input.reduce((acc, curr) => {
    const [name, remainder] = curr.split(':');

    const [winningNumbers, myNumbers] = remainder.split('|').map((el) => {
      return el.split(' ').filter((el) => el !== '');
    });
    acc.push({
      name,
      winningNumbers,
      myNumbers,
      numberOfCards: 1,
    });
    return acc;
  }, []);

  let totalScratchCards = 0;
  for (let i = 0; i < cards.length; i++) {
    totalScratchCards += cards[i].numberOfCards;
    while (cards[i].numberOfCards) {
      const matches = cards[i].winningNumbers.filter((el) =>
        cards[i].myNumbers.includes(el)
      );
      let won = matches.length;
      while (won) {
        cards[i + won].numberOfCards++;
        won--;
      }
      cards[i].numberOfCards--;
    }
  }
  return totalScratchCards;
};

// console.log(countScratchcards(testInput)); // 30
// console.log(countScratchcards(input)); //9236992
