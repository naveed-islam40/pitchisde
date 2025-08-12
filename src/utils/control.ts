export function repeatNode<T>(len: number, callback: () => T): T[] {
  return [...Array(len).keys()].map(callback);
}
