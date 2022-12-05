const getInput = require("../utils/getInput");

async function main() {
  const input = await getInput(__dirname);

  const pairs = input
    .trim()
    .split("\n")
    .map((pair) => pair.split(/-|,/g).map((id) => parseInt(id)));

  const answer = pairs.reduce((sum, ids) => {
    const [startA, endA, startB, endB] = ids;
    if (
      (startA <= startB && endA >= endB) ||
      (startB <= startA && endB >= endA)
    ) {
      return sum + 1;
    }
    return sum;
  }, 0);

  console.log(answer);
}

main();
