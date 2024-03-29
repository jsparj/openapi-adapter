import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, Export, TypeVariable } from '../codegen'
import { headerToMetadata } from './headerToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateHeaders(oas: specification.OpenAPIObject, filePath: string, indexFile: File) {
  let file = new File()

  let headers = oas.components?.headers
  if(!headers){
    return
  }

  Object.entries(headers).forEach(([fullName,header])=>{
    let nameParts = fullName.split('.')
    let parent = ["header",...nameParts.slice(0,-1)]
    let name = nameParts[nameParts.length-1]
    let {type,imports} = headerToMetadata(oas,header)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type)
    addTypeToFile(parent,typeVariable,file)
    file.tryAddImports(...imports)
    indexFile.tryAddExports(new Export('./headers',{header:null},undefined,true))
  })

  fs.writeFileSync(filePath,file.toString())
}
