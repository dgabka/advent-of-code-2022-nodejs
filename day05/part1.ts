import getInput from '../utils/getInput';

function transpose(matrix: string[][]): string[][] {
  return matrix.reduceRight(
    (prev, next) => next.map((item, i) => (prev[i] || []).concat([item])),
    [] as string[][]
  );
}

async function main() {
  const input = await getInput(__dirname);

  const inputLines = input.split('\n');
  const crates = transpose(
    inputLines.slice(0, 8).map((line) =>
      line
        .match(/(\s{3}\s?|\[\w\]\s?)/g)!
        .flatMap((crate) => crate.match(/\w|\s+/)!)
        .map((x) => x.trim())
    )
  ).map((stack) => stack.filter(Boolean));
  const moves = inputLines
    .slice(10, -1)
    .map((move) => move.match(/(\d+)/g)!.map((m) => parseInt(m))) as number[][];

  moves.forEach(([move, from, to]) => {
    for (let i = 0; i < move; i++) {
      crates[to - 1].push(crates[from - 1].pop()!);
    }
  });

  const answer = crates.map((stack) => stack[stack.length - 1]).join('');

  console.log(answer);
}

main();
