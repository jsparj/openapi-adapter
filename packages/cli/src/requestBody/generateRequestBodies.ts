import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, Export, TypeVariable } from '../codegen'
import { requestBodyToMetadata } from './requestBodyToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateRequestBodies(oas: specification.OpenAPIObject, filePath: string, indexFile: File) {
  let file = new File()

  let requestBodies = oas.components?.requestBodies
  if(!requestBodies){
    return
  }

  Object.entries(requestBodies).forEach(([fullName,requestBody])=>{
    let nameParts = fullName.split('.')
    let parent = ["requestBody",...nameParts.slice(0,-1)]
    let name = nameParts[nameParts.length-1]
    let {type,imports} = requestBodyToMetadata(requestBody)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type)
    addTypeToFile(parent,typeVariable,file)
    file.tryAddImports(...imports)
    indexFile.tryAddExports(new Export('./requestBodies',{requestBody:null},undefined,true))
  })

  fs.writeFileSync(filePath,file.toString())
}
