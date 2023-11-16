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
  .argument('<in>', 'Source of the OpenApi 3.x specification, can be in format of .json or .yaml')
  .argument('<out>', 'Output file path where the class will be generated')
  .option('-f, --force', 'Override output if it already exists.')
  .action((inPath,outPath,options)=>{
    const pwd = process.cwd();
    try {
      generate(
        `${pwd}/${inPath}`,
        `${pwd}/${outPath}`,
        {
          force: !!options.force
        }
      )
    } catch(e: any) {
      console.error("Error: ",e)
    }
  })




program.parse()