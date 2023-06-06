export function isObject<T>(value: T): boolean {
    return (value && typeof value === 'object' && !Array.isArray(value));
}
  