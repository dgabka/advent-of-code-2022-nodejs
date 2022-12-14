import getInput from '../utils/getInput';

type Point = {
  x: number;
  y: number;
};

type Vertex = {
  p: Point;
  distance: number;
  key: string;
};

class Grid {
  constructor(private data: string[][]) {}

  get height() {
    return this.data.length;
  }

  get width() {
    return this.data[0].length;
  }

  getChar(position: Point): string {
    const { x, y } = position;

    const value = this.data[y][x];

    return value;
  }

  getAscii(position: Point): number {
    const { x, y } = position;

    let char = this.data[y][x];

    if (char === 'E') {
      char = 'z';
    } else if (char === 'S') {
      char = 'a';
    }

    return char.charCodeAt(0);
  }

  find(char: string): Point {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.data[y][x] === char) {
          return { x, y };
        }
      }
    }

    throw new Error('Character not found in grid');
  }
}

function bfs(grid: Grid, start: Point) {
  const queue: Vertex[] = [
    { p: start, distance: 0, key: JSON.stringify(start) },
  ];
  const visited: Set<Vertex['key']> = new Set();

  let v: Vertex | undefined;
  while ((v = queue.shift()) !== undefined) {
    if (grid.getChar(v.p) === 'a') {
      return v.distance;
    }

    const { x, y } = v.p;
    const potentialNeighbours: Point[] = [
      { x, y: y - 1 },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x: x + 1, y },
    ];

    potentialNeighbours.forEach((n) => {
      const key = JSON.stringify(n);
      const distance = v!.distance + 1;
      if (
        n.x >= 0 &&
        n.x < grid.width &&
        n.y >= 0 &&
        n.y < grid.height &&
        grid.getAscii(n) >= grid.getAscii(v!.p) - 1 &&
        !visited.has(key) &&
        !queue.find((v) => v.key === key)
      ) {
        queue.push({ p: n, key, distance });
      }
    }, []);

    visited.add(v.key);
  }
}

async function main() {
  const input = await getInput(__dirname);

  const grid = new Grid(
    input
      .trim()
      .split('\n')
      .map((row) => row.trim().split(''))
  );

  let start: Point = grid.find('E');

  console.log(bfs(grid, start));
}

main();
