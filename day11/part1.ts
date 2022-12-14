import getInput from '../utils/getInput';

class Monkey {
  private _inspectedItemsCount = 0;
  private _index: number;
  private _items: number[];
  private _operation: string;
  private _testFactor: number;
  private _testPassedTarget: number;
  private _testFailedTarget: number;

  constructor(description: string) {
    const lines = description.split('\n');
    this._index = parseInt(lines[0].match(/\d+/g)![0]);
    this._items = lines[1].match(/\d+/g)!.map((i) => parseInt(i));
    this._operation = lines[2].split(' = ').pop()!;
    this._testFactor = parseInt(lines[3].match(/\d+/g)![0]);
    this._testPassedTarget = parseInt(lines[4].match(/\d+/g)![0]);
    this._testFailedTarget = parseInt(lines[5].match(/\d+/g)![0]);
  }

  get index() {
    return this._index;
  }

  get inspectedItemsCount() {
    return this._inspectedItemsCount;
  }

  public getInspectionIterator() {
    return {
      next: () => {
        if (this._items.length) {
          return this.inspectNext();
        }
        return null;
      },
    };
  }

  private inspectNext(): [number, number] {
    const old = this._items.shift();
    const newValue = Math.floor(eval(this._operation) / 3);
    const target =
      newValue % this._testFactor === 0
        ? this._testPassedTarget
        : this._testFailedTarget;
    this._inspectedItemsCount++;
    return [newValue, target];
  }

  public receive(item: number): void {
    this._items.push(item);
  }
}

async function main() {
  const input = await getInput(__dirname);

  const monkeys = input
    .trim()
    .split('\n\n')
    .map((s) => new Monkey(s));

  for (let round = 0; round < 20; round++) {
    monkeys.forEach((monkey) => {
      let value;
      const iterator = monkey.getInspectionIterator();
      while ((value = iterator.next()) !== null) {
        const [item, target] = value;
        monkeys[target].receive(item);
      }
    });
  }

  const answer = monkeys
    .sort((a, b) => a.inspectedItemsCount - b.inspectedItemsCount)
    .slice(-2)
    .reduce(
      (monkeyBusiness, monkey) => monkeyBusiness * monkey.inspectedItemsCount,
      1
    );

  console.log(answer);
}

main();
