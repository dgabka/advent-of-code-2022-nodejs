const getInput = require("../utils/getInput");

const opponentChoices = {
  A: 1,
  B: 2,
  C: 3,
};

const results = {
  X: 2,
  Y: 1,
  Z: 3,
};

async function main() {
  const input = await getInput(__dirname);

  const rounds = input.split("\n").map((x) => x.split(" "));

  const answer = rounds.reduce((sum, round) => {
    const [opponent, result] = round;
    const myChoice =
      ((opponentChoices[opponent] - results[result] + 3) % 3) + 1;

    switch (results[result]) {
      case 2: // lose
        return sum + myChoice;
      case 1: // draw
        return sum + 3 + myChoice;
      case 3: // win
        return sum + 6 + myChoice;
    }
  }, 0);

  console.log(answer);
}

main();
