import {codegen} from '../types'


export class Import implements codegen.IObject<'import'>{
  type: 'import' = 'import'
  isTypeImport?: true
  defaultImport?: string
  namedImports: Record<string,string|null>
  source: string

  get id(): string {
    return `${this.type}:${this.source}`
  }

  constructor(
    source: string,
    namedImports: Record<string,string>|undefined = undefined,
    defaultImport: string|undefined = undefined,
    isTypeImport: true|undefined = undefined
  ) {
    this.source = source
    this.namedImports = namedImports??{}
    this.defaultImport = defaultImport
    this.isTypeImport = isTypeImport
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")
    let content = indent
    content += "import "
    if(this.defaultImport){ content += `${this.defaultImport}, `}
    if(Object.keys(this.namedImports).length > 0){
      let imports = Object.entries(this.namedImports)
        .map(([key,value])=>{
          if(typeof value === 'string'){
            return `${key} as ${value}`
          } else {
            return key
          }
        })
      content += `${imports.join(', ')} `
    }
    content += `from "${this.source}"`
    return ""
  }
}