import fs from 'fs'
import type {specification} from '@openapi-adapter/core'
import {File} from '../codegen'
import { generateSchemas } from '../schema/generateSchemas'
import { generateDefinition } from '../definition/generateDefinition'
import { generateService } from '../service/generateService'
import { generateParameters } from '../parameters/generateParameters'
import { generateResponses } from '../response/generateResponses'
import { generateHeaders } from '../headers/generateHeaders'
import { generateSecuritySchemes } from '../securitySchemes/generateSecuritySchemes'
import { generateRequestBodies } from '../requestBody/generateRequestBodies'

const STANDARD_ADAPTERS = <const>['fetch','node-fetch']

export namespace generate {
  export type Options = {
    adapterImport: string
    serviceName?: string
    force: boolean
  }

  export type StandardAdapter = typeof STANDARD_ADAPTERS[number]
}

export function generate(oasPath: string, outputPath: string, options: generate.Options) {
  let oas: specification.OpenAPIObject
  let serviceName: string
  let adapterImport:string = options.adapterImport

  if (STANDARD_ADAPTERS.includes(options.adapterImport as generate.StandardAdapter)) {
    adapterImport = `@openapi-adapter/${options.adapterImport}`
  }
  
  if (!fs.existsSync(oasPath)){
    throw `OpenApi specification was not found from: [${oasPath}]`
  } 

  if (fs.existsSync(outputPath)){
    if (!options.force)  {
      throw `Output folder already exists in: [${outputPath}], use --force to override file`
    }
  } else {
    fs.mkdirSync(outputPath)
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

  if (!options.serviceName) {
    let parts = outputPath.split('/')
    serviceName = parts[parts.length-1]
  } else {
    serviceName = options.serviceName
  }

  let indexFile = new File()

  generateDefinition(oas,`${outputPath}/definition.ts`)
  generateSchemas(oas,`${outputPath}/schemas.ts`,indexFile)
  generateParameters(oas,`${outputPath}/parameters.ts`,indexFile)
  generateResponses(oas,`${outputPath}/responses.ts`,indexFile)
  generateHeaders(oas,`${outputPath}/headers.ts`,indexFile)
  generateRequestBodies(oas,`${outputPath}/requestBodies.ts`,indexFile)
  generateSecuritySchemes(oas,`${outputPath}/securitySchemes.ts`,indexFile)
  if(options.serviceName) generateService(`${outputPath}/service.ts`,serviceName, adapterImport, indexFile)

  fs.writeFileSync(`${outputPath}/index.ts`,indexFile.toString())
  
  // generate index: 
  return oas
}

