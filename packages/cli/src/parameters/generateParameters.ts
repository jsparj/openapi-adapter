import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, Namespace, TypeVariable } from '../codegen'
import { parameterToMetadata } from './parameterToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateParameters(oas: specification.OpenAPIObject, filePath: string) {
  let file = new File()

  let parameters = oas.components?.parameters
  if(!parameters){
    return
  }

  let parametersNS = new Namespace("parameter",true)
  file.tryAddObjects(parametersNS)

  Object.entries(parameters).forEach(([fullName,parameter])=>{
    let nameParts = fullName.split('.')
    let parent = ["parameter",...nameParts.slice(0,-1)]
    let name = nameParts[nameParts.length-1]
    let {type,comments,imports} = parameterToMetadata(oas,parameter)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type,...comments)
    addTypeToFile(parent,typeVariable,file)
    file.tryAddImports(...imports)
  })

  fs.writeFileSync(filePath,file.toString())
}
