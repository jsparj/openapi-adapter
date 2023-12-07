import type {codegen} from '../types'
import { ClassMethod } from './ClassMethod'
import {Type} from './Type'

export class Class implements codegen.IObject<'class'>{
  readonly type: 'class' = 'class'
  name: string
  comments:string[]
  isExported: boolean
  extendsClass?: Type<'ref'>
  fields: Record<string,Type<any>> 
  methods: Record<string,ClassMethod>

  get id(): string {
    return `${this.isExported?'export':'local'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    isExported: boolean,
    extendsClass?: Type<'ref'>,
    fields?: Record<string,Type<any>>,
    methods?: Record<string,ClassMethod>,
    comments?: string[]
  ) {
    this.name = name
    this.isExported = !!isExported
    this.extendsClass = extendsClass
    this.fields = fields??{}
    this.methods = methods??{}
    this.comments = comments??[]
  }

  tryAddField(fieldId: string, type: Type<any>): boolean{
    let changed = false
    if (!this.fields[fieldId]) {
      this.fields[fieldId] = type
      changed = true
    }
    return changed
  }

  tryAddMethod(method: ClassMethod): boolean{
    let changed = false
    if (!this.methods[method.id]) {
      this.methods[method.id] = method
      changed = true
    }
    return changed
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")

    let content = ""
    if (this.comments.length > 0) {
      content += `${indent}/**\n` 
      content += this.comments.map(line=>`${indent} * ${line}\n`).join("")
      content += `${indent} */\n`
    }

    content += indent
    if (this.isExported) content += "export "
    content += `class ${this.name}`
    if (this.extendsClass) content += ` extends ${this.extendsClass.toString(indent)}`
    content+= "{\n"

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

    let methodKeys = Object.keys(this.methods).sort()
    methodKeys.forEach(methodId => {
      let method = this.methods[methodId]
      content += `${indent}${method.toString(indent,"\t")}\n` 
    })

    content += indent+"}"
    return content
  }
}