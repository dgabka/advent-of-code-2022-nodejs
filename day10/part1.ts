import getInput from "../utils/getInput";

async function main() {
  const input = await getInput(__dirname);

  const ops = input.trim().split(/\s/);

  let cycles = 0;
  let x = 1;

  const answer = ops.reduce((sum, op) => {
    cycles++;

    if (cycles % 40 === 20) {
      sum += cycles * x;
    }

    if (/-?\d+/.test(op)) {
      x += parseInt(op);
    }

    return sum;
  }, 0);

  console.log(answer);
}

main();
