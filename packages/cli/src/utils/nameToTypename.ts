

export function nameToTypename(name: string ): string {
  return name.replace(/[-/]/g,'_')
}