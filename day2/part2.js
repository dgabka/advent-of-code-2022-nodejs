const fs = require("fs/promises");

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
    const [opponent, result] = current;
    const myChoice =
      ((opponentChoices[opponent] - results[result] + 3) % 3) + 1;

    switch (results[result]) {
      case 1:
        return previous + 3 + myChoice;
      case 3:
        return previous + 6 + myChoice;
      default:
        return previous + myChoice;
    }
  }, 0);

  console.log(answer);
}

main();
