// see: https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
/**
 * Here Join concatenates two strings with a dot in the middle, unless the last string is empty.
 * So Join<"a","b.c"> is "a.b.c" while Join<"a",""> is "a".
 */
export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

/**
 * Gets all the paths to the leaves of an object, joined with a dot in the middle.
 */
export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';

export interface Dict<T> {
  [key: string]: T;
}
