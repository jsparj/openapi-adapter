import type {specification} from '@openapi-adapter/core'
import { Type } from "../codegen/Type";
import { schemaToTypeAndComments } from '../schema/schemaToTypeAndComments';


export function responseToTypeAndComments(
  response: specification.ResponseObject
): {
  data: {type: Type<any>, comments: string[]}
  headers: {type: Type<any>, comments: string[]}
}{

  if (!!response.$ref) {
    let parts = response.$ref.split("/")
    return {
     data: { type: Type.newRef(`responses.${parts[parts.length-1]}['data']`), comments: []},
     headers: { type: Type.newRef(`responses.${parts[parts.length-1]}['headers']`), comments: []},
    }
  }

  let dataComments : string[] = []
  if(response.summary) {
    dataComments = dataComments.concat(`@summary ${response.summary}`)
  }
  if(response.description) {
    dataComments = dataComments.concat(`@description ${response.description}`)
  }

  let content = response.content
  let data = {type: Type.newAny(), comments: dataComments}

  if (content) {
    const mediaTypes = Object.keys(content)
    if (mediaTypes.length ==0) {
      throw "response does not have any mediaTypes, but it still has 'content' field"
    }

    data.type = Type.newUnion(
      ...mediaTypes.map(mt => {

        let v = content![mt as specification.MediaType]

        if (!v || !v.schema) {
          return Type.newObject({
            mediaType: {type: Type.newString(mt), comments: []},
            value: {type: Type.newAny(), comments: []}
          })
        } 

        let fields: Record<string, {
          type: Type<any>;
          comments: string[];
        }> = {
          mediaType: {type: Type.newString(mt), comments: []},
          value: schemaToTypeAndComments(v.schema)
        }

        if(v.encoding) {
          throw "requestBody encoding not yet supported"
        }

        return Type.newObject(fields)
      })
    )
  }

  let headersType = Type.newObject({})
  let headers= {type: headersType, comments: []}

  if (response.headers)
  {
    Object.entries(response.headers).map(([headerId,h])=>{

      let comments: string[] = []
      if (h.deprecated) comments = comments.concat("@deprecated")
      if (h.summary) comments = comments.concat(`@summary ${h.summary}`)
      if (h.description) comments = comments.concat(`@description ${h.description}`)
      
      let definition: string[] = []
      if (h.allowEmptyValue !== undefined) definition = definition.concat(`- \`allowEmptyValue\`:${h.allowReserved}`)
      if (h.allowReserved !== undefined) definition = definition.concat(`- \`allowReserved\`:${h.allowReserved}`)
      if (h.explode !== undefined) definition = definition.concat(`- \`explode\`:${h.explode}`)
      if (h.style !== undefined) definition = definition.concat(`- \`style\`:${h.style}`)
      if (definition.length > 0) comments = comments.concat("@definition The schema has following definitions:", definition)
      
      if (h.content) {
        throw "response content not yet supported"
      }

      let type = Type.newString()

      if (h.schema) {
        type = schemaToTypeAndComments(h.schema).type
      }

      headersType.tryAddField(headerId+(h.required === false?'?':''),type,...comments)
    })
  }


  return {
    data,
    headers,
  }
}