import type {specification} from '@openapi-adapter/core'
import { Interface, Type, Import} from '../../codegen'
import { requestBodyToMetadata } from '../../requestBody/requestBodyToMetadata'
import { responseToMetadata } from '../../response/responseToMetadata'
import { parameterToMetadata } from '../../parameters/parameterToMetadata'

const HTTP_METHODS = <const>["get" , "put" , "post" , "delete" , "options" , "head" , "patch" , "trace"]

export function generatePaths(oas: specification.OpenAPIObject, definition: Interface): Import[] {
  let paths = Type.newObject({})
  let imports: Import[] = []
  definition.tryAddField("path",paths)
  
  if (!oas.paths){
    return imports
  }
  
  Object.entries(oas.paths).forEach(([pathId,pathObject])=>{    
    let pathItemRequestParams = Type.newObject({})
    if (pathObject.parameters) {
     const p = getPathVariables(oas, pathObject.parameters)
      pathItemRequestParams.tryAddField("path",Type.newObject(p.path))
      pathItemRequestParams.tryAddField("query",Type.newObject(p.query))
      pathItemRequestParams.tryAddField("header",Type.newObject(p.header))
      pathItemRequestParams.tryAddField("cookie",Type.newObject(p.cookie))
      imports = imports.concat(p.imports)
    }
    let pathItem = Type.newObject({
      requestParams:pathItemRequestParams
    })


    let operations = Type.newObject({})
    HTTP_METHODS.forEach(method => {
      const m = pathObject[method]
 
      if (!!m) {
        // operation Request parameters:
        let operationItemRequestParams = Type.newObject({})
        if (m.parameters) {
         const p = getPathVariables(oas, m.parameters)
          operationItemRequestParams.tryAddField("path",Type.newObject(p.path))
          operationItemRequestParams.tryAddField("query",Type.newObject(p.query))
          operationItemRequestParams.tryAddField("header",Type.newObject(p.header))
          operationItemRequestParams.tryAddField("cookie",Type.newObject(p.cookie))
          imports = imports.concat(p.imports)
        }
        if(m.security && m.security.length >0) {
          operationItemRequestParams.tryAddField("security",Type.newUnion(
            m.security.map(s => {
              return Type.newTuple(
                Object.keys(s).sort().map(id => Type.newString(id))
              )
            })
          ))
        }

        if(!!m.requestBody) {
          const b = requestBodyToMetadata(m.requestBody)
          operationItemRequestParams.tryAddField("body", b.type)
          imports = imports.concat(b.imports)
        }

        // responses:
        let responses = Type.newObject({})
        Object.keys(m.responses).forEach(statusCode => {
          let r = m.responses[statusCode]
          if(!r) return
          
          const rm = responseToMetadata(oas,r)
          responses.tryAddField(statusCode, rm.type)
          imports = imports.concat(rm.imports)
        })

        let operation = Type.newObject({
          requestParams: operationItemRequestParams,
          responseObject: responses
        })
        
        operations.tryAddField(method,operation)
      }
    })
  


    let pathOperations = Type.newObject({
      item: pathItem,
      operations: operations
    })
    paths.tryAddField(pathId,pathOperations)
  }) 
  
  return imports
}

function getPathVariables(oas: specification.OpenAPIObject, parameters: readonly specification.ParameterObject<specification.ParameterLocation>[]): {
  path: Record<string, Type<any>>
  cookie: Record<string,Type<any>>
  query: Record<string,Type<any>>
  header: Record<string, Type<any>>
  imports: Import[]
} {
  let path: Record<string,Type<any>> = {}
  let cookie: Record<string,Type<any>> = {}
  let query: Record<string,Type<any>> = {}
  let header: Record<string,Type<any>> = {}

  let imports: Import[] = []

  if (parameters && parameters.length>0) {
    parameters.forEach(p => {
      const m = parameterToMetadata(oas,p)

      imports = imports.concat(m.imports)
      switch(m.parameter.in){
        case 'cookie':cookie[m.parameter.name!] = m.type; break
        case 'header':header[`'${m.parameter.name!}'`] = m.type; break
        case 'path': path[m.parameter.name!]  = m.type; break
        case 'query': query[m.parameter.name!]  = m.type; break
      }
    })
  }

  return {
    path,
    cookie,
    query,
    header,
    imports,
  }
}