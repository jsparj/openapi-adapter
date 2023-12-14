import { Class } from './Class'
import { Const } from './Const'
import { Export } from './Export'
import {Import} from './Import'
import { Interface } from './Interface'
import {Namespace} from './Namespace'
import {TypeVariable} from './TypeVariable'

export namespace File {
  export type Object =      
    | Namespace
    | Const 
    | Class
    | TypeVariable 
    | Interface
}

export class File {
  imports: Record<string,Import>
  exports: Record<string,Export>
  objects: Record<string,File.Object>

  constructor() {
    this.imports = {}
    this.exports = {}
    this.objects = {}
  }


  tryAddImports(...imports: Import[]): boolean {
    let changed = false
    for(let i=0;i<imports.length;i++){
      let id = imports[i].id
      if (!this.imports[id]) {
        changed = true
        this.imports[id] = imports[i]
      } else if (this.imports[id].tryMerge(imports[i])){
        changed = true
      }
    }
    return changed
  }


  tryAddExports(...exports: Export[]): boolean {
    let changed = false
    for(let i=0;i<exports.length;i++){
      let id = exports[i].id
      if (!this.exports[id]) {
        changed = true
        this.exports[id] = exports[i]
      } else if (this.exports[id].tryMerge(exports[i])){
        changed = true
      }
    }
    return changed
  }

  tryAddObjects(...objects: File.Object[]) {
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

  toString(...indents: string[]): string{
    let indent = indents.join("")

    let content = "//[generated code]: DO NOT EDIT DIRECTLY\n"

    let importKeys = Object.keys(this.imports).sort()
    importKeys.forEach(key=>{
      let value = this.imports[key]
      content += `${indent}${value.toString(indent)}\n`
    })

    let exportKeys = Object.keys(this.exports).sort()
    exportKeys.forEach(key=>{
      let value = this.exports[key]
      content += `${indent}${value.toString(indent)}\n`
    })

    let objectKeys = Object.keys(this.objects).sort()
    objectKeys.forEach(key=>{
      let value = this.objects[key]
      content += `${indent}${value.toString(indent)}\n`
    })

    return content
  }
}