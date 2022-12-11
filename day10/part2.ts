import getInput from "../utils/getInput";

async function main() {
  const input = await getInput(__dirname);

  const ops = input.trim().split(/\s/);

  let x = 1;

  const crt: string[][] = [];

  for (let row = 0; row < 6; row++) {
    crt.push([]);
    for (let column = 0; column < 40; column++) {
      const p = Math.abs(x - column) <= 1 ? "#" : ".";
      crt[row].push(p);

      const op = ops[row * 40 + column];

      if (/-?\d+/.test(op)) {
        x += parseInt(op);
      }
    }
  }

  crt.forEach((row) => console.log(row.join("")));
}

main();
