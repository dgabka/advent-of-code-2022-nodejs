import getInput from "../utils/getInput";

async function main() {
  const input = await getInput(__dirname);

  const grid = input
    .trim()
    .split("\n")
    .map((row: string) => row.split("").map((x) => parseInt(x)));

  let answer = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tree = grid[i][j];
      const visible = {
        up: true,
        right: true,
        down: true,
        left: true,
      };
      for (let y1 = 0; y1 < i && visible.up; y1++) {
        const treeInFront = grid[y1][j];
        if (treeInFront >= tree) {
          visible.up = false;
        }
      }
      for (let y2 = i + 1; y2 < grid.length && visible.down; y2++) {
        const treeInFront = grid[y2][j];
        if (treeInFront >= tree) {
          visible.down = false;
        }
      }
      for (let x1 = 0; x1 < j && visible.left; x1++) {
        const treeInFront = grid[i][x1];
        if (treeInFront >= tree) {
          visible.left = false;
        }
      }
      for (let x2 = j + 1; x2 < grid[i].length && visible.right; x2++) {
        const treeInFront = grid[i][x2];
        if (treeInFront >= tree) {
          visible.right = false;
        }
      }

      if (Object.values(visible).some((v) => v === true)) {
        answer++;
      }
    }
  }

  console.log(answer);
}

main();
