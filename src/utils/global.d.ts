// Support for Array.findLastIndex hasn't been added to TS yet

export {}

declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number
  }
}
