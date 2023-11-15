import {Import} from './Import'
import {Namespace} from './Namespace'
import {TypeVariable} from './TypeVariable'

export namespace File {
  export type Object =      
    | Namespace 
    | TypeVariable 
}

export class File {
  imports: Record<string,Import>
  objects: Record<string,File.Object>

  constructor() {
    this.imports = {}
    this.objects = {}
  }


  tryAddImports(...imports: Import[]): boolean {
    let changed = false
    for(let i=0;i<imports.length;i++){
      let id = imports[i].id
      if (!this.imports[id]) {
        changed = true
        this.imports[id] = imports[i]
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
    let indent = indents.join()

    let content = "//[generated code]: DO NOT EDIT DIRECTLY\n\n"

    let importKeys = Object.keys(this.imports).sort()
    importKeys.forEach(key=>{
      let value = this.imports[key]
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