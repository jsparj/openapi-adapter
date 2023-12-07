import type {specification} from '@openapi-adapter/core'
import { Type,Import } from "../codegen";
import { headerToMetadata } from '../headers/headerToMetadata';
import { schemaToMetadata } from '../schema/schemaToMetadata';
import { refToTypename } from '../utils/refToTypename';


export function responseToMetadata(
  oas: specification.OpenAPIObject,
  response: specification.ResponseObject
): {
  type: Type<any>
  imports: Import[]
}{
  if (!!response.$ref) {
    let typeName = refToTypename(response.$ref)
    return {
     type: Type.newRef("response."+typeName,[]),
     imports: [new Import('./responses', {response:null},undefined,true)]
    }
  }

  let imports : Import[] = []

  let comments : string[] = []
  if(response.summary) {
    comments = comments.concat(`@summary ${response.summary}`)
  }
  if(response.description) {
    comments = comments.concat(`@description ${response.description}`)
  }

  let content = response.content
  let data = Type.newUndefined({optional: false, comments})

  if (content) {
    const mediaTypes = Object.keys(content)
    if (mediaTypes.length===0) {
      throw "response does not have any mediaTypes, but it still has 'content' field"
    }

    data = Type.newUnion(
      mediaTypes.map(mt => {

        let v = content![mt as specification.MediaType]

        if (!v || !v.schema) {
          return Type.newObject({
            mediaType: Type.newString(mt),
            value: Type.newAny()
          })
        } 

        const schema = schemaToMetadata(v.schema)
        let fields = {
          mediaType: Type.newString(mt),
          value: schema.type
        }

        imports = imports.concat(schema.imports)

        if(v.encoding) {
          throw "requestBody encoding not yet supported"
        }

        return Type.newObject(fields)
      }),
      {
        optional: false,
        comments: comments
      }
    )
  }

  let headers = Type.newObject({})
  
  if (response.headers)
  {
    Object.entries(response.headers).map(([headerId,h])=>{
      const m = headerToMetadata(oas,h)
      headers.tryAddField(headerId,m.type)
      imports = imports.concat(m.imports)
    })
  }

  return {
    type: Type.newObject({data,headers}),
    imports,
  }
}