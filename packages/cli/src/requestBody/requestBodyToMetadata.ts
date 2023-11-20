import type {specification} from '@openapi-adapter/core'
import {Type,Import} from "../codegen";
import {schemaToMetadata} from '../schema/schemaToMetadata';


export function requestBodyToMetadata(
  requestBody: specification.RequestBodyObject
): {
  type: Type<any> 
  required: boolean
  comments: string[]
  imports: Import[] 
}{
  if (!!requestBody.$ref) {
    let parts = requestBody.$ref.split("/")
    let name =  parts[parts.length-1]

    return {
     type: Type.newRef(`requestBody.${name}`),
     required: !!requestBody.required,
     comments: [],
     imports: [new Import("./requestBodies",{[name]:null})]
    }
  }

  let imports: Import[] = []

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
          mediaType: {type: Type.newString(mt)},
          value: {type: Type.newAny()}
        })
      } 

      let schema = schemaToMetadata(v.schema)
    
      let fields = {
        mediaType: {type: Type.newString(mt)},
        value: {type: schema.type, comments: schema.comments}
      }
      imports = imports.concat(schema.imports)

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
    imports,
  }
}