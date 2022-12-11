import getInput from "../utils/getInput";

const opponentChoices = {
  A: 1,
  B: 2,
  C: 3,
};

const myChoices = {
  X: 1,
  Y: 2,
  Z: 3,
};

async function main() {
  const input = await getInput(__dirname);

  const rounds = input
    .trim()
    .split("\n")
    .map((x) => x.split(" ")) as Array<
    [keyof typeof opponentChoices, keyof typeof myChoices]
  >;

  const answer = rounds.reduce((sum, round) => {
    const [opponent, me] = round;
    const result = ((opponentChoices[opponent] - myChoices[me] + 3) % 3) + 1;
    switch (result) {
      case 2: // lose
        return sum + myChoices[me];
      case 1: // draw
        return sum + 3 + myChoices[me];
      case 3: // win
        return sum + 6 + myChoices[me];
      default:
        return sum;
    }
  }, 0);

  console.log(answer);
}

main();
