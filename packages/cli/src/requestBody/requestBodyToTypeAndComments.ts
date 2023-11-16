import type {specification} from '@openapi-adapter/core'
import { Type } from "../codegen/Type";
import { schemaToTypeAndComments } from '../schema/schemaToTypeAndComments';


export function requestBodyToTypeAndComments(
  requestBody: specification.RequestBodyObject
): {
  type: Type<any> 
  required: boolean
  comments: string[]
}{
  if (!!requestBody.$ref) {
    let parts = requestBody.$ref.split("/")
    return {
     type: Type.newRef(`requestBody.${parts[parts.length-1]}`),
     required: !!requestBody.required,
     comments: []
    }
  }

  let comments : string[] = []
  if(requestBody.summary) {
    comments = comments.concat(`@summary ${requestBody.summary}`)
  }
  if(requestBody.description) {
    comments = comments.concat(`@description ${requestBody.description}`)
  }

  let content = requestBody.content
  if (!content) {
    throw "requestBody does not have 'content' or '$ref' field"
  }

  const mediaTypes = Object.keys(content)
  if (mediaTypes.length ==0) {
    throw "requestBody does not have any mediaTypes, but it still has 'content' field"
  }

  let type = Type.newUnion(
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

  return {
    type,
    comments,
    required: !!requestBody.required,
  }
}