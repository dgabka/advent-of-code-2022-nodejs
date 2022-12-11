import getInput from "../utils/getInput";

async function main() {
  const input = await getInput(__dirname);

  const elves = input
    .trim()
    .split("\n\n")
    .map((x: string) => x.split("\n").map((y) => parseInt(y)));

  const answer = elves
    .map((food) =>
      food.reduce((elfsCalories, snack) => elfsCalories + snack, 0)
    )
    .sort()
    .slice(-3)
    .reduce((sum, elfsCalories) => sum + elfsCalories, 0);

  console.log(answer);
}

main();
