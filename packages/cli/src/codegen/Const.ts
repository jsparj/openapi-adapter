import {codegen} from '../types'


export class Const implements codegen.IObject<'const'>{
  type: 'const' = 'const'
  name: string
  isExported: boolean
  value: string

  get id(): string {
    return `${this.isExported?'export':'local'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    value: string,
    isExported?: boolean
  ) {
    this.name = name
    this.value = value
    this.isExported = isExported??false
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")
    let content = indent
    
    if (this.isExported) content += "export "
    content += `const ${this.name} = ${this.value}`
    return content
  }
}