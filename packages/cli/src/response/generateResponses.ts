import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, Export, TypeVariable } from '../codegen'
import { responseToMetadata } from './responseToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateResponses(oas: specification.OpenAPIObject, filePath: string, indexFile: File) {
  let file = new File()

  let responses = oas.components?.responses
  if(!responses){
    return
  }

  Object.entries(responses).forEach(([fullName,response])=>{
    let nameParts = fullName.split('.')
    let parent = ["response",...nameParts.slice(0,-1)]
    let name = nameParts[nameParts.length-1]
    let {type,imports} = responseToMetadata(oas,response)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type)
    addTypeToFile(parent,typeVariable,file)
    file.tryAddImports(...imports)
    indexFile.tryAddExports(new Export('./responses',{response:null},undefined,true))
  })

  fs.writeFileSync(filePath,file.toString())
}
