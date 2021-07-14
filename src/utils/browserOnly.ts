import { Maybe } from "src/types/UtilityTypes";

export default function browserOnly<T>(
  fn: (...argsInner: any) => T,
  ...args: Array<any>
): Maybe<T> {
  return typeof window !== "undefined" ? fn(...args) : null;
}
