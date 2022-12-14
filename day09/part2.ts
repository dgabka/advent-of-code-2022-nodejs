import getInput from '../utils/getInput';

type coords = { x: number; y: number };

function getNewKnotPosition(prevKnot: coords, knot: coords): coords {
  const xDiff = Math.abs(prevKnot.x - knot.x);
  const yDiff = Math.abs(prevKnot.y - knot.y);
  if (xDiff > 1 || yDiff > 1) {
    knot.x = knot.x + Math.sign(prevKnot.x - knot.x);
    knot.y = knot.y + Math.sign(prevKnot.y - knot.y);
  }

  return knot;
}

async function main() {
  const input = await getInput(__dirname);

  const moves = input
    .trim()
    .split('\n')
    .map((move) => move.split(' '));

  const head: coords = { x: 0, y: 0 };
  const knots: Array<coords> = new Array(9).fill(0).map(() => ({ ...head }));

  const moveHistory = new Set([JSON.stringify(knots[8])]);

  moves.forEach(([direction, steps]) => {
    for (let i = 0; i < parseInt(steps); i++) {
      switch (direction) {
        case 'D':
          head.y--;
          break;
        case 'U':
          head.y++;
          break;
        case 'L':
          head.x--;
          break;
        case 'R':
          head.x++;
      }

      knots.reduce(getNewKnotPosition, head);
      moveHistory.add(JSON.stringify(knots[8]));
    }
  });

  console.log(moveHistory.size);
}

main();
