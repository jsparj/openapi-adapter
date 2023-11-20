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
      requestParams:{type: pathItemRequestParams,comments: []}
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
            ...m.security.map(s => {
              return Type.newTuple(
                ...Object.keys(s).sort().map(id => Type.newString(id))
              )
            })
          ))
        }
        else {
          operationItemRequestParams.tryAddField("security",Type.newUndefined())
        }

        if(!!m.requestBody) {
          const b = requestBodyToMetadata(m.requestBody)
          operationItemRequestParams.tryAddField("body"+(b.required?"":"?"),b.type,...b.comments)
          imports = imports.concat(b.imports)
        }else {
          operationItemRequestParams.tryAddField("body",Type.newUndefined())
        }


        // responses:
        let responses = Type.newObject({})
        Object.keys(m.responses).forEach(statusCode => {
          let r = m.responses[statusCode]
          let key = statusCode === "default"?statusCode:`'${statusCode}'` 
          if(!r) {
            responses.tryAddField(key, Type.newObject({
              data: {type: Type.newAny()},
              headers: {type: Type.newMap(
                Type.newString(),
                Type.newUnion(Type.newUndefined(), Type.newString())
              )},
            }))
            return
          }
     
          const rm = responseToMetadata(oas,r)
          responses.tryAddField(key, rm.type)
          imports = imports.concat(rm.imports)
        })

        let operation = Type.newObject({
          requestParams: {type: operationItemRequestParams},
          responseObject: {type: responses}
        })
        
        operations.tryAddField(method,operation)
      }
    })
  


    let pathOperations = Type.newObject({
      item: {type: pathItem,comments: []},
      operations: {type: operations,comments: []}
    })
    paths.tryAddField(`"${pathId}"`,pathOperations)
  }) 
  
  return imports
}

function getPathVariables(oas: specification.OpenAPIObject, parameters: readonly specification.ParameterObject<specification.ParameterLocation>[]): {
  path: Record<string,{type: Type<any>}>
  cookie: Record<string,{type: Type<any>}>
  query: Record<string,{type: Type<any>}>
  header: Record<string,{type: Type<any>}>
  imports: Import[]
} {
  let path: Record<string,{type: Type<any>}> = {}
  let cookie: Record<string,{type: Type<any>}> = {}
  let query: Record<string,{type: Type<any>}> = {}
  let header: Record<string,{type: Type<any>}> = {}

  let imports: Import[] = []

  if (parameters && parameters.length>0) {
    parameters.forEach(p => {
      const m = parameterToMetadata(oas,p)

      let parameter = {
        type: m.type,
        comments: m.comments
      }
      imports = imports.concat(m.imports)
      switch(m.parameter.in){
        case 'cookie':cookie[m.parameter.name!] = parameter; break
        case 'header':header[`'${m.parameter.name!}'`] = parameter; break
        case 'path': path[m.parameter.name!] = parameter; break
        case 'query': query[m.parameter.name!] = parameter; break
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