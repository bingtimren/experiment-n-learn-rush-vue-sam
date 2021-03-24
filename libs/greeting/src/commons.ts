/**
 * @packageDocumentation
 * Artifacts shared by both front-end and backend
 */
import { WORD } from '@bingsjs/word';
/**
 * Just an example
 */
export function greeting(name: string): string {
    return `${WORD}, ${name}`;
}
