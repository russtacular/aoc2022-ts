
export const sum = (acc: number, curr: number) => acc + curr;

export function eqSet<T>(base: Set<T>, ...rest: Set<T>[]) {
    return rest.reduce((acc, curr) => acc && base.size === curr.size && [...base].every(x => curr.has(x)), true);
}

export function intersect<T>(base: Set<T>, ...rest:Set<T>[]) {
    return new Set([...base].filter((x) => rest.reduce((acc, curr) => acc && curr.has(x), true)));
};

export function chunkArray<T>(arr: T[], chunkSize: number) {
    return [...Array(Math.ceil(arr.length/chunkSize))].map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
}

export function transposeArray<T>(arr: T[][]) {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

export const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export type Vector1d = [number, number];

export const vContains = (a: Vector1d, b: Vector1d) =>
    a.length === b.length && a[0] <= b[0] && a[1] >= b[1];

export const vIntersects = (a: Vector1d, b: Vector1d) =>
    a.length === b.length &&
        (
            a[0] <= b[0] && a[1] >= b[0]
            ||
            a[0] >= b[0] && a[0] <= b[1]
        )

/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */
