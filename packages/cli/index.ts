#!/usr/bin/env node

import {program} from 'commander'
import packageJson from './package.json' 
import {generate} from './src/commands/generate'

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)

program 
  .command('generate')
  .description('Generate class from openapi 3.x specification for doing fully typed requests.')
  .argument('<specification>', `Relative path to the OpenApi 3.x specification, must have '.json' file extension.`)
  .argument('<outFolder>', `Output folder where the adapter will be generated.`)
  .option('-f, --force', 'Override output folder even if it already exists.', false)
  .option('-n, --service-name [serviceName]', 'Name of the service class. (default: <specification filename>)')
  .option('-a, --adapter-import [adapterImport]', `Which adapter class to use: (default: 'fetch')
  options: 
  \tfetch:
  \t\tUse this if target project is ran on browser environment.
  \t\tIf project environment is node.js, use this option only if specification does not define 'mutualTLS' security scheme.
  \t\tGenerated adapter will use native fetch found in browser or node.js environment.
  \t\tYou will also need to install '@openapi-adapter/fetch' to your project.

  \tnode-fetch
  \t\tUse this if target project is ran on node.js environment and OpenAPI specification defines 'mutualTLS' security scheme.
  \t\tGenerated adapter will use 'node-fetch' library for all requests.
  \t\tYou will also need to install '@openapi-adapter/node-fetch' to your project.
  
  \t<your-own-import-path>
  \t\tUse your own adapter, import path must include class 'OpenApiAdapter'.`
  )
  .action((specification,outFolder,options)=>{
    const pwd = process.cwd();
    try {
      generate(
        `${pwd}/${specification}`,
        `${pwd}/${outFolder}`,
        {
          serviceName: options.serviceName,
          adapterImport: options.adapterImport??'fetch',
          force: !!options.force
        }
      )
    } catch(e: any) {
      console.error("Error: ",e)
    }
  })




program.parse()