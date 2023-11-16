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

  return {
    data,
    comments,
  }
}