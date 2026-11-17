export function pick<T extends object>(obj: T, keys: readonly string[]): Partial<T> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key as keyof T] = obj[key as keyof T];
    return acc;
  }, {} as Partial<T>);
}
