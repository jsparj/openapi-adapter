import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, TypeVariable } from '../codegen'
import { schemaToMetadata } from './schemaToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateSchemas(oas: specification.OpenAPIObject, filePath: string) {
  let file = new File()

  let schemas = oas.components?.schemas
  if(!schemas){
    return
  }
  Object.entries(schemas).forEach(([fullName,schema])=>{
    let nameParts = fullName.split('.')
    let parent = ["schema", ...nameParts.slice(0,-1)]
    let name =  nameParts[nameParts.length-1]
    let {type,comments} = schemaToMetadata(schema)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type,...comments)
    addTypeToFile(parent,typeVariable,file)
  })

  fs.writeFileSync(filePath,file.toString())
}
