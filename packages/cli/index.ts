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
  .argument('<inPath>', 'Source of the OpenApi 3.x specification, can be in format of .json or .yaml')
  .argument('<outPath>', 'Output folder where the service will be generated')
  .option('-f, --force', 'Override output if it already exists.', false)
  .option('-n, --name <serviceName>', 'Name of the service class, default is output folder name.')
  .action((inPath,outPath,options)=>{
    const pwd = process.cwd();
    try {
      generate(
        `${pwd}/${inPath}`,
        `${pwd}/${outPath}`,
        {
          serviceName: options.serviceName,
          force: !!options.force
        }
      )
    } catch(e: any) {
      console.error("Error: ",e)
    }
  })




program.parse()