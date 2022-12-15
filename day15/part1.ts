import getInput from '../utils/getInput';

async function main() {
  const input = await getInput(__dirname);

  const targetY = 2_000_000;

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

  const positionsCoveredOnTarget = new Set<number>();

  data.forEach((sensor) => {
    if (
      sensor.sy + sensor.distance >= targetY &&
      sensor.sy - sensor.distance <= targetY
    ) {
      const distanceToTarget = Math.abs(sensor.sy - targetY);
      const xOffset = sensor.distance - distanceToTarget;
      for (let i = sensor.sx - xOffset; i <= sensor.sx + xOffset; i++) {
        positionsCoveredOnTarget.add(i);
      }
    }
  });

  data.forEach((sensor) => {
    if (sensor.sy === targetY) {
      positionsCoveredOnTarget.delete(sensor.sx)
    }

    if (sensor.by === targetY) {
      positionsCoveredOnTarget.delete(sensor.bx)
    }
  })

  console.log(positionsCoveredOnTarget.size);
}

main();
