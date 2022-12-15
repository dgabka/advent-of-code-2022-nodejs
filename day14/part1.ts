import getInput from '../utils/getInput';

type Point = {
  x: number;
  y: number;
};

class Grid {
  private _data: string[][];
  private _sandPoint: Point;
  private _sandEmitted: number = 0;

  constructor(private xOffset: number, xMax: number, yMax: number) {
    this._data = Array.from({ length: yMax + 1 }, () =>
      Array.from({ length: xMax + 1 - xOffset }, () => '.')
    );

    this._sandPoint = { x: 500 - xOffset, y: 0 };
  }

  get sandEmitted(): number {
    return this._sandEmitted;
  }

  print() {
    return this._data.map((row) => row.join('')).join('\n');
  }

  dropSand() {
    const iterator = (() => {
      let position = this._sandPoint;
      return {
        next: () => {
          let newPosition = { ...position };
          newPosition = { ...position, y: position.y + 1 };
          if (this.outOfBounds(newPosition)) return null;
          if (this.getPoint(newPosition) === '.') {
            position = newPosition;
            return position;
          }
          newPosition = { x: position.x - 1, y: position.y + 1 };
          if (this.outOfBounds(newPosition)) return null;
          if (this.getPoint(newPosition) === '.') {
            position = newPosition;
            return position;
          }
          newPosition = { x: position.x + 1, y: position.y + 1 };
          if (this.outOfBounds(newPosition)) return null;
          if (this.getPoint(newPosition) === '.') {
            position = newPosition;
            return position;
          }
          this.drawSand(position);
          position = this._sandPoint;
          this._sandEmitted++;
          return position;
        },
      };
    })();

    while (iterator.next() !== null) {}
  }

  drawLine(points: Point[]) {
    for (let i = 1; i < points.length; i++) {
      const a = this.adjustOffset(points[i - 1]);
      const b = this.adjustOffset(points[i]);

      if (a.x != b.x) {
        a.x < b.x ? this.drawHorizontal(a, b) : this.drawHorizontal(b, a);
      } else {
        a.y < b.y ? this.drawVertical(a, b) : this.drawVertical(b, a);
      }
    }
  }

  private adjustOffset(point: Point): Point {
    return { x: point.x - this.xOffset, y: point.y };
  }

  private drawHorizontal(start: Point, end: Point) {
    for (let x = start.x; x <= end.x; x++) {
      this.drawWall({ x, y: start.y });
    }
  }

  private drawVertical(start: Point, end: Point) {
    for (let y = start.y; y <= end.y; y++) {
      this.drawWall({ x: start.x, y });
    }
  }

  private drawWall({ x, y }: Point) {
    this._data[y][x] = '#';
  }

  private drawSand({ x, y }: Point) {
    this._data[y][x] = 'o';
  }

  private getPoint({ x, y }: Point): string {
    return this._data[y][x];
  }

  private outOfBounds({ x, y }: Point): boolean {
    return x < 0 || x >= this._data[0].length || y >= this._data.length;
  }
}

async function main() {
  const input = await getInput(__dirname);

  let maxY = 0;
  let maxX = 0;
  let minX = Number.MAX_VALUE;

  const lines = input
    .trim()
    .split(/\n/)
    .map((line) =>
      line
        .split(' -> ')
        .map((coords) => coords.split(','))
        .flatMap(([x, y]) => {
          maxY = Math.max(maxY, +y);
          maxX = Math.max(maxX, +x);
          minX = Math.min(minX, +x);
          return { x: +x, y: +y } as Point;
        })
    );

  const grid = new Grid(minX, maxX, maxY);
  lines.forEach((l) => grid.drawLine(l));
  grid.dropSand();
  console.log(grid.sandEmitted);
}

main();
