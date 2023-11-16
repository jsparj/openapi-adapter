import type {codegen} from '../types'
import {Type} from './Type'

export class TypeVariable implements codegen.IObject<'type-variable'>{
  readonly type: 'type-variable' = 'type-variable'
  name: string
  comments:string[]
  isExported: boolean
  value: Type<any>

  get id(): string {
    return `${this.isExported?'export':'local'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    isExported: boolean,
    value: Type<any>,
    ...comments: string[]
  ) {
    this.name = name
    this.isExported = !!isExported
    this.value = value
    this.comments = comments
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")

    let comment = ""
    if (this.comments.length > 0) {
      comment = `${indent}/**\n` 
      comment += this.comments.map(line=>`${indent} * ${line}\n`).join("")
      comment += `${indent} */\n`
    }

    return `${comment}${indent}${this.isExported?"export ":""}`
      + `type ${this.name} `
      + `= ${this.value.toString(indent)}`
  }
}