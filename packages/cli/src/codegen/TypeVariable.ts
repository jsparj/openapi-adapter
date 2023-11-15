import type {codegen} from '../types'
import {Type} from './Type'



export class TypeVariable implements codegen.IObject<'type-variable'>{
  readonly type: 'type-variable' = 'type-variable'
  name: string
  isExported: boolean
  value: Type<any>

  get id(): string {
    return `${this.type}:${!!this.isExported?'export':'local'}:${this.name}`
  }

  constructor(
    name: string,
    isExported: boolean,
    value: Type<any>
  ) {
    this.name = name
    this.isExported = !!isExported
    this.value = value
  }

  toString(...indents: string[]): string {
    const indent = indents.join()
    return indent 
      + `${this.isExported?"export ":""}`
      + `type ${this.name} `
      + `= ${this.value.toString(indent)}`
  }
}