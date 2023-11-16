import type {specification} from '@openapi-adapter/core'
import {Namespace,Interface,Type} from '../codegen'
import { schemaToTypeAndComments } from '../schema/schemaToTypeAndComments'
import { requestBodyToTypeAndComments } from '../requestBody/requestBodyToTypeAndComments'
import { responseToTypeAndComments } from '../response/responseToTypeAndComments'

const HTTP_METHODS = <const>["get" , "put" , "post" , "delete" , "options" , "head" , "patch" , "trace"]

export function generatePaths(oas: specification.OpenAPIObject, generatedNS: Namespace) {
  let paths = new Interface("path",true)
  generatedNS.tryAddObjects(paths)
  if (!oas.paths){
    return
  }
  
  Object.entries(oas.paths).forEach(([pathId,pathObject])=>{    
    let pathItemRequestParams = Type.newObject({})
    if (pathObject.parameters) {
     const p = getPathVariables(pathObject.parameters)
      if(Object.keys(p.path).length>0) pathItemRequestParams.tryAddField("path",Type.newObject(p.path))
      if(Object.keys(p.query).length>0) pathItemRequestParams.tryAddField("query",Type.newObject(p.query))
      if(Object.keys(p.header).length>0) pathItemRequestParams.tryAddField("header",Type.newObject(p.header))
      if(Object.keys(p.cookie).length>0) pathItemRequestParams.tryAddField("cookie",Type.newObject(p.cookie))
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
         const p = getPathVariables(m.parameters)
          if(Object.keys(p.path).length>0) operationItemRequestParams.tryAddField("path",Type.newObject(p.path))
          if(Object.keys(p.query).length>0) operationItemRequestParams.tryAddField("query",Type.newObject(p.query))
          if(Object.keys(p.header).length>0) operationItemRequestParams.tryAddField("header",Type.newObject(p.header))
          if(Object.keys(p.cookie).length>0) operationItemRequestParams.tryAddField("cookie",Type.newObject(p.cookie))
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
        if(!!m.requestBody) {
          const {
            type,
            required,
            comments
          } = requestBodyToTypeAndComments(m.requestBody)
          operationItemRequestParams.tryAddField("body"+(required?"":"?"),type,...comments)
        }


        // responses:
        let responses = Type.newObject({})
        Object.keys(m.responses).forEach(statusCode => {
          let r = m.responses[statusCode]
          if(!r) {
            responses.tryAddField(statusCode, Type.newObject({
              data: {type: Type.newAny(), comments: []},
              headers: {type: Type.newMap(
                Type.newString(),
                Type.newUnion(Type.newUndefined(), Type.newString())
              ), comments: []},
            }))
            return
          }

          const {data, headers}= responseToTypeAndComments(r)
          responses.tryAddField(statusCode, Type.newObject({
            data,
            headers,
          }))
        })

        let operation = Type.newObject({
          requestParams: {type: operationItemRequestParams, comments: []},
          responseObject: {type: responses, comments: []}
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
}

function getPathVariables(parameters: readonly specification.ParameterObject<specification.ParameterLocation>[]): {
  path: Record<string,{type: Type<any>, comments:string[]}>
  cookie: Record<string,{type: Type<any>, comments:string[]}>
  query: Record<string,{type: Type<any>, comments:string[]}>
  header: Record<string,{type: Type<any>, comments:string[]}>
} {
  let path: Record<string,{type: Type<any>, comments:string[]}> = {}
  let cookie: Record<string,{type: Type<any>, comments:string[]}> = {}
  let query: Record<string,{type: Type<any>, comments:string[]}> = {}
  let header: Record<string,{type: Type<any>, comments:string[]}> = {}

  if (parameters && parameters.length>0) {
    parameters.forEach(p => {

      let {type} = schemaToTypeAndComments(p.schema!)
      let comments: string[] = []

      if (!!p.deprecated) {
        comments = comments.concat(`@deprecated`)
      }
      if (p.summary) {
        comments = comments.concat(`@summary ${p.summary}`)
      }
      if (p.description) {
        comments = comments.concat(`@description ${p.description}`)
      }

      switch(p.in){
        case 'cookie':
          cookie[p.name!] = {
            type: Type.newObject({
              serialization: { 
                type: Type.newRef(`import('@openapi-adapter/core').adapter.serialization.CookieSerialization`),
                comments: [],
              },
              value: { 
                type,
                comments,
              }
            }), 
            comments:[],
          }

        case 'header':
          header[p.name!] = {
            type: Type.newObject({
              serialization: { 
                type: Type.newRef(`import('@openapi-adapter/core').adapter.serialization.HeaderSerialization`),
                comments: [],
              },
              value: { 
                type,
                comments,
              }
            }), 
            comments:[],
          }

        case 'path':
          path[p.name!] = {
            type: Type.newObject({
              serialization: { 
                type: Type.newRef(`import('@openapi-adapter/core').adapter.serialization.PathSerialization`),
                comments: [],
              },
              value: { 
                type,
                comments,
              }
            }), 
            comments:[],
          }
        case 'query':
          query[p.name!] = {
            type: Type.newObject({
              serialization: { 
                type: Type.newRef(`import('@openapi-adapter/core').adapter.serialization.QuerySerialization`),
                comments: [],
              },
              value: { 
                type,
                comments,
              }
            }), 
            comments:[],
          }
      }
    })
  }

  return {
    path,
    cookie,
    query,
    header
  }
}