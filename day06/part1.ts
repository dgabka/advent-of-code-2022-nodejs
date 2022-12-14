import getInput from '../utils/getInput';

async function main() {
  const input = await getInput(__dirname);
  const data = input.trim();
  let answer;
  for (let i = 0; i < data.length - 3 && !answer; i++) {
    const marker = new Set(data.slice(i, i + 4));
    if (marker.size === 4) {
      answer = i + 4;
    }
  }
  console.log(answer);
}

main();
