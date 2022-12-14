import getInput from '../utils/getInput';

async function main() {
  const input = await getInput(__dirname);

  const grid = input
    .trim()
    .split('\n')
    .map((row: string) => row.split('').map((x) => parseInt(x)));

  let answer = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const tree = grid[i][j];
      const lineScores = {
        up: 0,
        right: 0,
        down: 0,
        left: 0,
      };
      for (let y1 = i - 1; y1 >= 0; y1--) {
        const treeInFront = grid[y1][j];
        lineScores.up++;
        if (treeInFront >= tree) {
          break;
        }
      }
      for (let y2 = i + 1; y2 < grid.length; y2++) {
        const treeInFront = grid[y2][j];
        lineScores.down++;
        if (treeInFront >= tree) {
          break;
        }
      }
      for (let x1 = j - 1; x1 >= 0; x1--) {
        const treeInFront = grid[i][x1];
        lineScores.left++;
        if (treeInFront >= tree) {
          break;
        }
      }
      for (let x2 = j + 1; x2 < grid[i].length; x2++) {
        const treeInFront = grid[i][x2];
        lineScores.right++;
        if (treeInFront >= tree) {
          break;
        }
      }

      const score = Object.values(lineScores).reduce(
        (total, current) => total * current,
        1
      );

      answer = Math.max(score, answer);
    }
  }

  console.log(answer);
}

main();
