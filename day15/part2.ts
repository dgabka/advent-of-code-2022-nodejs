import getInput from '../utils/getInput';

async function main() {
  const input = await getInput(__dirname);

  const data = input
    .trim()
    .split(/\n/)
    .map((line) => line.match(/-?\d+/g)!.map((x) => parseInt(x)))
    .map(([sx, sy, bx, by]) => {
      return {
        sx,
        sy,
        bx,
        by,
        distance: Math.abs(sx - bx) + Math.abs(sy - by),
      };
    });

  for (let row = 0; row <= 4_000_000; row++) {
    for (let col = 0; col <= 4_000_000; col++) {
      const sensor = data.find(
        ({ sx, sy, bx, by, distance }) =>
          Math.abs(sx - col) + Math.abs(sy - row) <= distance
      );
      if (sensor) {
        col = sensor.sx + sensor.distance - Math.abs(row - sensor.sy);
        continue;
      }

      console.log(col * 4_000_000 + row);
      return;
    }
  }
}

main();
