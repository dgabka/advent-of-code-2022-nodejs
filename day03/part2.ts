import getInput from '../utils/getInput';

const ASCII_LOWERCASE_RANGE_START = 97;
const ASCII_PRIORITY_LOWERCASE_OFFSET = 96;
const ASCII_PRIORITY_UPPERCASE_OFFSET = 38;

function getPriorityForItem(item: string) {
  const ascii = item.charCodeAt(0);
  if (ascii >= ASCII_LOWERCASE_RANGE_START) {
    return ascii - ASCII_PRIORITY_LOWERCASE_OFFSET;
  } else {
    return ascii - ASCII_PRIORITY_UPPERCASE_OFFSET;
  }
}

async function main() {
  const input = await getInput(__dirname);

  const groups = input
    .trim()
    .match(/(?:^\w*$\n?){3}/gm)! // split into groups of three
    .map((s) => s.match(/(?:^\w+$)/gm)!); // split each group

  const answer = groups.reduce((sum, group) => {
    const uniqueItems = new Set(group.join());
    const badge = Array.from(uniqueItems.values()).find((item) =>
      group.every((rucksack) => rucksack.includes(item))
    )!;
    return sum + getPriorityForItem(badge);
  }, 0);

  console.log(answer);
}

main();
