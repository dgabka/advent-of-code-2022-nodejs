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
  const result = input
    .map((curr) =>
      curr.reduce((sum, fruit) => {
        if (isNaN(fruit)) {
          return sum;
        }
        return sum + parseInt(fruit);
      }, 0)
    )
    .sort()
    .slice(-3)
    .reduce((sum, curr) => {
      sum += curr;
      return sum;
    }, 0);
  console.log(result);
}

main();
