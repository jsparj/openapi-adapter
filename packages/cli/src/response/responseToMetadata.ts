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
     type: Type.newRef("response."+typeName),
     imports: [new Import('./responses', {response:null},undefined,true)]
    }
  }

  let imports : Import[] = []

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
            mediaType: {type: Type.newString(mt)},
            value: {type: Type.newAny()}
          })
        } 

        const schema = schemaToMetadata(v.schema)
        let fields = {
          mediaType: {type: Type.newString(mt)},
          value: { comments: schema.comments, type: schema.type}
        }

        imports = imports.concat(schema.imports)

        if(v.encoding) {
          throw "requestBody encoding not yet supported"
        }

        return Type.newObject(fields)
      })
    )
  }

  let headersType = Type.newObject({})
  let headers= {type: headersType}

  if (response.headers)
  {
    Object.entries(response.headers).map(([headerId,h])=>{
      const m = headerToMetadata(oas,h)
      const opt = m.header.required === false?'?':''
      headersType.tryAddField(`'${headerId}'${opt}`,m.type,...m.comments)
    })
  }


  return {
    type: Type.newObject({data,headers}),
    imports,
  }
}