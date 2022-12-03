const fs = require("fs/promises");

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

async function getInput() {
  const f = await fs.readFile("./input.txt", { encoding: "utf-8" });
  return f
    .trim()
    .split("\n")
    .map((x) => x.split(" "));
}

async function main() {
  const input = await getInput();
  const answer = input.reduce((previous, current) => {
    const [opponent, me] = current;
    const result = ((opponentChoices[opponent] - myChoices[me] + 3) % 3) + 1;
    switch (result) {
      case 2: // lose
        return previous + myChoices[me];
      case 1: // draw
        return previous + 3 + myChoices[me];
      case 3: // win
        return previous + 6 + myChoices[me];
    }
  }, 0);

  console.log(answer);
}

main();
