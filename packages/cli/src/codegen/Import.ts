import {codegen} from '../types'


export class Import implements codegen.IObject<'import'>{
  type: 'import' = 'import'
  source: string
  isTypeImport?: true
  defaultImport?: string
  namedImports: Record<string,string|null>
  

  get id(): string {
    return `${this.type}:${this.source}`
  }

  constructor(
    source: string,
    namedImports: Record<string,string|null>|undefined = undefined,
    defaultImport: string|undefined = undefined,
    isTypeImport: true|undefined = undefined
  ) {
    this.source = source
    this.defaultImport = defaultImport
    this.namedImports = {}
    this.isTypeImport = isTypeImport
    let imports: Record<string,string|null> = {}
    if (namedImports) {
      Object.entries(namedImports).forEach(([key,value])=>{
        this.tryAddNamedImport(key,value)
      })
    }
     imports
  }

  tryMerge(other: Import): boolean {
    if (other.source !== this.source) return false
    if (
      other.defaultImport && 
      this.defaultImport !== undefined && 
      this.defaultImport !== other.defaultImport
    ) return false

    if(!!other.defaultImport) this.defaultImport = other.defaultImport
    if(!other.isTypeImport) this.isTypeImport = undefined

    Object.entries(other.namedImports).forEach(([key,value])=>{
      this.tryAddNamedImport(key,value)
    })
    return true
  }

  tryAddNamedImport(name: string, rename: string|null = null): boolean {
    let key = name.split('.')[0]
    if (this.namedImports[key]) return false 
    this.namedImports[key] = rename
    return true
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")
    let content = indent
    content += "import "
    if(this.isTypeImport) content += "type "
    if(this.defaultImport) content += `${this.defaultImport}, `
    
    
    let namedImports = Object.keys(this.namedImports).sort()
    
    if(namedImports.length>0){
      
      if(namedImports.length < 3){
        content += "{"  
        for (let i=0;i<namedImports.length;i++) {
          let comma = i < namedImports.length-1?', ':''
          let key = namedImports[i]
          let value = this.namedImports[key]
          if(typeof value === 'string'){
            content += `${key} as ${value}${comma}`
          } else {
            content += `${key}${comma}`
          }
        }
        content += `${indent}} `
      }else{
        content += "{\n"  
        for (let i=0;i<namedImports.length;i++) {
          let comma = i < namedImports.length-1?',':''
          let key = namedImports[i]
          let value = this.namedImports[key]
          if(typeof value === 'string'){
            content += `${indent}\t${key} as ${value}${comma}\n`
          } else {
            content += `${indent}\t${key}${comma}\n`
          }
        }
        content += `${indent}} `
      }
    }
    
    content += `from '${this.source}'`
    return content
  }
}