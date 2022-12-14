import getInput from '../utils/getInput';

type coords = { x: number; y: number };

function getNewTailPosition(head: coords, tail: coords): coords {
  const xDiff = Math.abs(head.x - tail.x);
  const yDiff = Math.abs(head.y - tail.y);
  if (xDiff > 1 || yDiff > 1) {
    tail.x = tail.x + Math.sign(head.x - tail.x);
    tail.y = tail.y + Math.sign(head.y - tail.y);
  }

  return tail;
}

async function main() {
  const input = await getInput(__dirname);

  const moves = input
    .trim()
    .split('\n')
    .map((move) => move.split(' '));

  const head: coords = { x: 0, y: 0 };
  let tail: coords = { x: 0, y: 0 };

  const moveHistory = new Set([JSON.stringify(tail)]);

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
          break;
      }

      getNewTailPosition(head, tail);
      moveHistory.add(JSON.stringify(tail));
    }
  });

  console.log(moveHistory.size);
}

main();
