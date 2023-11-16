import {codegen} from '../types'
import { Interface } from './Interface'
import {TypeVariable} from './TypeVariable'

export namespace Namespace {
  export type Object = Namespace | TypeVariable | Interface
}

export class Namespace implements codegen.IObject<'namespace'>{
  readonly type: 'namespace' = 'namespace'
  name: string
  isExported: boolean
  objects: Record<string,Namespace.Object>

  get id(): string {
    return `${this.isExported?'export':'local'}:${this.type}:${this.name}`
  }

  constructor(
    name: string,
    isExported: boolean,
    ...objects: Namespace.Object[]
  ) {
    this.name = name
    this.isExported = !!isExported

    let objs: Record<string,Namespace.Object> = {}
    objects.forEach(o => {objs[o.id] = o})
    this.objects = objs
  }

  static getId(name: string, isExported: boolean): string {
    return new Namespace(name,isExported).id
  }

  tryAddObjects(...objects: Namespace.Object[]) {
    let changed = false
    for(let i=0;i<objects.length;i++){
      let id = objects[i].id
      if (!this.objects[id]) {
        changed = true
        this.objects[id] = objects[i]
      }
    }
    return changed
  }


  tryGetNamespace(id: string): undefined|Namespace {
    let ns = this.objects[id]
    if(!ns) return undefined
    else if(ns.type === "namespace") {
      return ns
    }

    throw "id does not refer to namespace it refers to: "+ns.type
  }

  toString(...indents: string[]): string {
    const indent = indents.join("")
    
    let content = indent
    content += indent
    +(this.isExported?"export ":"")
    +`namespace ${this.name} {\n`

    let keys = Object.keys(this.objects).sort()
    keys.forEach(key=>{
      let value = this.objects[key]
      content += `${indent}${value.toString("\t")}\n`
    })

    content += `${indent}}`
    return content
  }
}