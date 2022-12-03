const fs = require("fs/promises");

async function getInput() {
  const f = await fs.readFile("./input.txt", { encoding: "utf-8" });
  return f
    .trim()
    .split("\n\n")
    .map((x) => x.split("\n").map((y) => parseInt(y)));
}

async function main() {
  const input = await getInput();
  const result = input.reduce((acc, curr) => {
    const reindeerSum = curr.reduce((sum, fruit) => {
      if (isNaN(fruit)) {
        return sum;
      }
      return sum + parseInt(fruit);
    }, 0);
    return Math.max(acc, reindeerSum);
  }, 0);
  console.log(result);
}

main();
