export function toShorthandPropertyKey(key: string): string {
  if ( /^[\p{L}_$][\p{L}\p{N}_$]*$/iu.test(key)){
    return key
  }
  return `'${key}'`
}