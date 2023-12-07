import type {codegen} from '../types'
import {Type} from './Type'

export namespace ClassMethod {
  export type AccessModifier = 'private'|'protected'|'public'
}

export class ClassMethod implements codegen.IObject<'class-method'>{
  readonly type: 'class-method' = 'class-method'
  name: string
  accessModifier?: ClassMethod.AccessModifier
  parameters: {name: string, type: Type<any>}[]
  returns?: Type<any>
  comments:string[]
  isStatic: boolean
  lines: string[]
  

  get id(): string {
    return `${this.accessModifier??'default'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    accessModifier: ClassMethod.AccessModifier|undefined,
    parameters: {name: string, type: Type<any>}[],
    returns?: Type<any>,
    comments?: string[],
    isStatic?: boolean
  ) {
    this.name = name
    this.accessModifier = accessModifier
    this.parameters = parameters
    this.returns = returns
    this.comments = comments??[],
    this.isStatic = isStatic??false
    this.lines = []
  }

  addLines(...lines: string[]){
    this.lines = this.lines.concat(lines)
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")
    let content = indent
    if (this.accessModifier) content += `${this.accessModifier} `
    if (this.isStatic) content += `static `
    
    const parameters = this.parameters.map(p => `${p.name}: ${p.type.toString(indent,"\t")}`).join(", ")
    content += `${this.name}(${parameters})`
    if (this.returns) content += `: ${this.returns.toString(indent,'\t')}`
    content += "{\n"

    for(let i=0;i<this.lines.length;i++) {
      content += `${indent}\t${this.lines[i]}\n`
    }
    
    content += indent+"}"
    return content
  }
}