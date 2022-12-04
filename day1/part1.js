const getInput = require("../utils/getInput");

async function main() {
  const input = await getInput(__dirname);

  const elves = input
    .split("\n\n")
    .map((x) => x.split("\n").map((y) => parseInt(y)));

  const answer = elves.reduce((mostCalories, food) => {
    const elfSum = food.reduce((sum, snack) => sum + snack, 0);
    return Math.max(mostCalories, elfSum);
  }, 0);

  console.log(answer);
}

main();
