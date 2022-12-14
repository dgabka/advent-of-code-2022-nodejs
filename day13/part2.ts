import getInput from '../utils/getInput';

type Packet = Array<number | Packet>;

function isNumber(x: number | Packet): x is number {
  return typeof x === 'number';
}

function zip<T>(left: Array<T> | T, right: Array<T> | T): T[][] {
  left = Array.isArray(left) ? left : [left];
  right = Array.isArray(right) ? right : [right];

  const maxLen = Math.max(left.length, right.length);
  const res = [];
  for (let i = 0; i < maxLen; i++) {
    res.push([left[i], right[i]]);
  }
  return res;
}

function compare(left: number | Packet, right: number | Packet): number {
  if (left === undefined) return -1;
  if (right === undefined) return 1;
  if (isNumber(left) && isNumber(right)) return left - right;

  for (const [leftValue, rightValue] of zip(left, right)) {
    const result = compare(leftValue, rightValue);

    if (result !== 0) return result;
  }

  return 0;
}

async function main() {
  const input = await getInput(__dirname);

  const packets = input
    .trim()
    .split(/\n\n?/)
    .map((x) => JSON.parse(x) as Packet);

  packets.push([[2]], [[6]]);

  const sorted = packets.sort(compare);

  const a = sorted.findIndex((packet) => +packet.flat(2) === 2) + 1;
  const b = sorted.findIndex((packet) => +packet.flat(2) === 6) + 1;

  console.log(a * b);
}

main();
