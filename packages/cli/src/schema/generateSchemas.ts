
import type {specification} from '@openapi-adapter/core'
import {File, Namespace, TypeVariable} from '../codegen'
import { schemaToType } from './schemaToType'




export function generateSchemas(oas: specification.OpenAPIObject, targetFile: File) {
  let schemas = oas.components?.schemas
  if(!schemas){
    return
  }
  Object.entries(schemas).forEach(([fullName,schema])=>{
    let nameParts = fullName.split('.')
    let parent = nameParts.slice(0,-1)
    let name = nameParts[nameParts.length-1]
    let t = schemaToType(schema)
    let typeVariable = new TypeVariable(name,true,t)
    addTypeToFile(parent,typeVariable,targetFile)
  })
}


function addTypeToFile(parentNamespace: string[], typeVariable: TypeVariable, file: File ) {
  if (parentNamespace.length == 0) {
    file.tryAddObjects(typeVariable)
  } else {
    let targetNS: Namespace
    let _baseNS = new Namespace(parentNamespace[0],true)
    let baseNS = file.tryGetNamespace(_baseNS.id)
    if(!!baseNS) {
      targetNS = baseNS
    } else {
      targetNS = _baseNS
      file.tryAddObjects(_baseNS)
    }

    for(let i = 1;i<parentNamespace.length;i++) {
      let _ns = new Namespace(parentNamespace[i],true)
      let ns = targetNS.tryGetNamespace(_ns.id)
      if(!!ns) {
        targetNS.tryAddObjects(ns)
        targetNS = ns
      } else {
        targetNS = _ns
        file.tryAddObjects(_ns)
      }
    }
    targetNS.tryAddObjects(typeVariable)
  }
}