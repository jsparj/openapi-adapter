import fs from 'fs'
import util from 'util'
import type {specification} from '@openapi-adapter/core'
import {File} from '../codegen'
import { generateSchemas } from '../schema/generateSchemas'

export namespace generate {
  export type Options = {
    force: boolean
  }
}

export function generate(oasPath: string, outputPath: string, options: generate.Options) {
  let oas: specification.OpenAPIObject
  
  if (!options.force && fs.existsSync(outputPath)){
    throw `Output file already exists in: [${outputPath}], use --force to override file`
  } else if (!fs.existsSync(oasPath)){
    throw `OpenApi specification was not found from: [${oasPath}]`
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

  let file = new File()
  generateSchemas(oas,file)


  console.log(util.inspect(file, {showHidden: false, depth: null, colors: true}))

  fs.writeFileSync(outputPath,file.toString())
  return oas
}

