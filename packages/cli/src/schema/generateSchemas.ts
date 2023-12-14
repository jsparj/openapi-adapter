import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { Export, File, TypeVariable } from '../codegen'
import { schemaToMetadata } from './schemaToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateSchemas(oas: specification.OpenAPIObject, filePath: string, indexFile: File) {
  let file = new File()

  let schemas = oas.components?.schemas
  if(!schemas){
    return
  }

  Object.entries(schemas).forEach(([fullName,schema])=>{
    let nameParts = fullName.split('.')
    let parent = ["schema", ...nameParts.slice(0,-1)]
    let name =  nameParts[nameParts.length-1]
    let {type,imports} = schemaToMetadata(schema)
    file.tryAddImports(...imports.filter(i => i.source !== './schemas'))
    let typeVariable = new TypeVariable(nameToTypename(name),true,type)
    addTypeToFile(parent,typeVariable,file)
    indexFile.tryAddExports(new Export('./schemas',{schema:null},undefined,true))
  })

  fs.writeFileSync(filePath,file.toString())
}
