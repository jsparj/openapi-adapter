import type {codegen} from '../types'
import {Type} from './Type'

export class Interface implements codegen.IObject<'interface'>{
  readonly type: 'interface' = 'interface'
  name: string
  comments:string[]
  isExported: boolean
  fields: Record<string,Type<any>>

  get id(): string {
    return `${this.isExported?'export':'local'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    isExported: boolean,
    ...comments: string[]
  ) {
    this.name = name
    this.isExported = !!isExported
    this.comments = comments
    this.fields = {}
  }

  tryAddField(fieldId: string, type: Type<any>): boolean{
    let changed = false
    if (!this.fields[fieldId]) {
      this.fields[fieldId] = type
      changed = true
    }
    return changed
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")

    let comment = ""
    if (this.comments.length > 0) {
      comment = `${indent}/**\n` 
      comment += this.comments.map(line=>`${indent} * ${line}\n`).join("")
      comment += `${indent} */\n`
    }

    let content =`${comment}${indent}${this.isExported?"export ":""}interface ${this.name}{\n`

    let fieldKeys = Object.keys(this.fields).sort()
    fieldKeys.forEach(fieldId => {
      let field = this.fields[fieldId]
      if (field.metadata.comments.length>0) {
        content += `${indent}\t/**\n` 
        field.metadata.comments.forEach(comment => {
          content += `${indent}\t * ${comment}\n`
        })
        content += `${indent}\t */\n` 
      }
      content += `${indent}\t${fieldId}: ${field.toString(indent,"\t")}\n` 
    })

    content += indent+"}"
    return content
  }
}