import fs from 'fs'
import { File, Import,TypeVariable, Namespace, Type, Export } from '../codegen'
import { Const } from '../codegen/Const'
import { Class } from '../codegen/Class'
import { ClassMethod } from '../codegen/ClassMethod'

export function generateService(
  filePath: string, 
  serviceName: string, 
  adapterImport: string,
  indexFile: File
) {  
  let file = new File()

  file.tryAddImports(
    new Import(adapterImport,{"OpenApiAdapter":null}),
    new Import('./definition',{generated:null}),
  )
  const serviceNS = new Namespace(serviceName,true) 
  
  const settings = new Const('settings','OpenApiAdapter.createDefaultSettings()',false)
  const service = new Class(
    serviceName,
    true,
    Type.newRef('OpenApiAdapter',[
      Type.newString(serviceName),
      Type.newRef(`${serviceName}.Definition`,[]),
      Type.newRef(`${serviceName}.Settings`,[]),
    ]),
    undefined,
    undefined,
    []
  )

  const serviceConstructor = new ClassMethod(
    'constructor',
    undefined,
    [{name: 'host', type: Type.newString()}]
  )

  serviceConstructor.addLines(
    `super('${serviceName}', host, settings)`
  )

  service.tryAddMethod(serviceConstructor)
  
  serviceNS.tryAddObjects(
    new TypeVariable("Definition",true,Type.newRef("generated.Definition",[])),
    new TypeVariable('Settings',true,Type.newRef('typeof settings',[]))
  )

  file.tryAddObjects(
    serviceNS,
    settings,
    service
  )

  indexFile.tryAddExports(new Export('./service',{[serviceName]:null}))
  fs.writeFileSync(filePath,file.toString())
}