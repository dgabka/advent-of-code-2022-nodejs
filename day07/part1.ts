import getInput from '../utils/getInput';

class TreeNode {
  name: string;
  size: number;
  files: number[];
  dirs: TreeNode[];
  parent: TreeNode | null;

  constructor(name: string, parent: TreeNode) {
    this.name = name;
    this.size = 0;
    this.files = [];
    this.dirs = [];
    this.parent = parent;
  }
}

let root: TreeNode = {
  name: '/',
  size: 0,
  files: [],
  dirs: [],
  parent: null,
};

function sumSize(node: TreeNode): number {
  if (node.size < 100000) {
    return node.size + node.dirs.reduce((s, dir) => s + sumSize(dir), 0);
  }
  return node.dirs.reduce((s, dir) => s + sumSize(dir), 0);
}

async function main() {
  const input = await getInput(__dirname);
  const output = input.trim().split('\n').slice(2);

  let currentNode = root;

  output.forEach((line) => {
    if (/^dir.*/.test(line)) {
      const [_, name] = line.split(' ');
      if (name) {
        currentNode.dirs.push(new TreeNode(name, currentNode));
      }
    } else if (/^\d+/.test(line)) {
      const [size] = line.split(' ');
      if (size) {
        currentNode.size += parseInt(size);
        let tmp = currentNode.parent;
        while (tmp !== null) {
          tmp.size += parseInt(size);
          tmp = tmp.parent;
        }
      }
    } else if (/^\$ cd/.test(line)) {
      const [_, __, dir] = line.split(' ');
      if (dir === '..') {
        currentNode = currentNode.parent as TreeNode;
      } else {
        currentNode = currentNode.dirs.find(({ name }) => name === dir)!;
      }
    }
  });

  let answer = sumSize(root);

  console.log(answer);
}

main();
