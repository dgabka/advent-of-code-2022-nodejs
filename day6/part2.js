const getInput = require("../utils/getInput");

async function main() {
  const input = await getInput(__dirname);
  const data = input.trim();
  let answer;
  for (let i = 0; i < data.length - 13 && !answer; i++) {
    const marker = new Set(data.slice(i, i + 14));
    if (marker.size === 14) {
      answer = i + 14;
    }
  }
  console.log(answer);
}

main();
