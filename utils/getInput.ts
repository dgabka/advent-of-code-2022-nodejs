import { promises as fs } from 'fs';

async function getInput(dir: string): Promise<string> {
  const f = await fs.readFile(dir + '/input.txt', { encoding: 'utf-8' });
  return f;
}

export default getInput;
