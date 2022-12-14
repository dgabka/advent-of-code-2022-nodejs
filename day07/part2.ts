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

function findDirToDelete(
  node: TreeNode,
  sizeToFree: number,
  dirSizeToDelete: number
): number {
  if (node.dirs.length === 0) {
    if (node.size >= sizeToFree) {
      return Math.min(node.size, dirSizeToDelete);
    }
    return dirSizeToDelete;
  }

  if (node.size < sizeToFree) {
    return dirSizeToDelete;
  }

  return node.dirs.reduce((n, dir) => {
    const x = findDirToDelete(dir, sizeToFree, n);
    if (node.size > sizeToFree) {
      return Math.min(x, n, node.size);
    }
    return Math.min(x, n);
  }, dirSizeToDelete);
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

  const totalSpace = 70000000;
  const freeSpaceNeeded = 30000000;
  const occupiedSpace = root.size;
  const sizeToFree = freeSpaceNeeded - (totalSpace - occupiedSpace);

  const answer = findDirToDelete(root, sizeToFree, root.size);

  console.log(answer);
}

main();
