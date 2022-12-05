const getInput = require("../utils/getInput");

function splitInHalf(str) {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
}

const ASCII_LOWERCASE_RANGE_START = 97;
const ASCII_PRIORITY_LOWERCASE_OFFSET = 96;
const ASCII_PRIORITY_UPPERCASE_OFFSET = 38;

function getPriorityForItem(item) {
  const ascii = item.charCodeAt(0);
  if (ascii >= ASCII_LOWERCASE_RANGE_START) {
    return ascii - ASCII_PRIORITY_LOWERCASE_OFFSET;
  } else {
    return ascii - ASCII_PRIORITY_UPPERCASE_OFFSET;
  }
}

async function main() {
  const input = await getInput(__dirname);

  const rucksacks = input.trim().split("\n");

  const answer = rucksacks.reduce((previous, current) => {
    const [compartmentA, compartmentB] = splitInHalf(current);
    const item = compartmentA
      .split("")
      .find((letter) => compartmentB.includes(letter));
    return previous + getPriorityForItem(item);
  }, 0);

  console.log(answer);
}

main();
