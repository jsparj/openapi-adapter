import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import { File, Export, TypeVariable} from '../codegen'
import { securitySchemeToMetadata } from './securitySchemesToMetadata'
import { addTypeToFile } from '../utils/addTypeToFile'
import { nameToTypename } from '../utils/nameToTypename'

export function generateSecuritySchemes(oas: specification.OpenAPIObject, filePath: string, indexFile: File) {
  let file = new File()

  let securitySchemes = oas.components?.securitySchemes
  if(!securitySchemes){
    return
  }

  Object.entries(securitySchemes).forEach(([fullName,securityScheme])=>{
    let nameParts = fullName.split('.')
    let parent = ["securityScheme",...nameParts.slice(0,-1)]
    let name = nameParts[nameParts.length-1]
    let {type,imports} = securitySchemeToMetadata(securityScheme)
    let typeVariable = new TypeVariable(nameToTypename(name),true,type)
    addTypeToFile(parent,typeVariable,file)
    file.tryAddImports(...imports)
    indexFile.tryAddExports(new Export('./securitySchemes',{securityScheme:null},undefined,true))
  })

  fs.writeFileSync(filePath,file.toString())
}
