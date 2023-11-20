import fs from 'fs'
//import util from 'util'
import type {specification} from '@openapi-adapter/core'
import { generateSchemas } from '../schema/generateSchemas'
import { generateDefinition } from '../definition/generateDefinition'
import { generateService } from '../service/generateService'
import { generateParameters } from '../parameters/generateParameters'
import { generateResponses } from '../response/generateResponses'
import { generateHeaders } from '../headers/generateHeaders'
import { generateSecuritySchemes } from '../securitySchemes/generateSecuritySchemes'

export namespace generate {
  export type Options = {
    serviceName?: string
    force: boolean
  }
}

export function generate(oasPath: string, outputPath: string, options: generate.Options) {
  let oas: specification.OpenAPIObject
  
  if (!fs.existsSync(oasPath)){
    throw `OpenApi specification was not found from: [${oasPath}]`
  } 

  if (fs.existsSync(outputPath)){
    if (!options.force)  {
      throw `Output path already exists in: [${outputPath}], use --force to override file`
    }
  } else {
    fs.mkdirSync(outputPath)
  }
    
  let serviceName: string
  if (!!options.serviceName) {
    serviceName = options.serviceName
  } else {
    let pathParts = outputPath.split('/')
    serviceName = pathParts[pathParts.length]
  }

  if (oasPath.endsWith(".json")){
    try {
      let data = fs.readFileSync(oasPath,'utf8') 
      oas = JSON.parse(data)
    } catch(e){
      throw `Failed to read file content from: ${oasPath}: ${e}`
    }
  } else {
    throw 'Defined OpenApi Specification path is not .json'
  }

  generateSchemas(oas,`${outputPath}/schemas.ts`)
  generateParameters(oas,`${outputPath}/parameters.ts`)
  generateResponses(oas,`${outputPath}/responses.ts`)
  generateHeaders(oas,`${outputPath}/headers.ts`)
  generateSecuritySchemes(oas,`${outputPath}/securitySchemes.ts`)
  generateDefinition(oas,`${outputPath}/definition.ts`)
  generateService(`${outputPath}/service.ts`,serviceName)

  
  // generate index: 
  return oas
}

