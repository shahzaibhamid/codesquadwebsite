import { readFileSync } from 'fs';
import { join } from 'path';

export function getContent(name) {
  return readFileSync(join(process.cwd(), 'content', `${name}.html`), 'utf8');
}
