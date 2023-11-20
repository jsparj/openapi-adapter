import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import {File,Namespace,Interface} from '../codegen'
import { generatePaths } from './path/generatePaths'
import { generateAuth } from './auth/generateAuth'


export function generateDefinition(oas: specification.OpenAPIObject, filePath: string) {
  let file = new File()
  let generatedNamespace = new Namespace("generated",true)
  file.tryAddObjects(generatedNamespace)

  let definition = new Interface("Definition",true)
  generatedNamespace.tryAddObjects(definition)
  
  let imports = [
    ...generatePaths(oas,definition),
    ...generateAuth(oas,definition)
  ]
  
  file.tryAddImports(...imports)
  fs.writeFileSync(filePath,file.toString())
}