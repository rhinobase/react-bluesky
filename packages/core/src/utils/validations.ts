export function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function hasProp<T extends Record<string, unknown>>(
  v: T,
  prop: keyof T,
): v is T {
  return prop in v;
}
