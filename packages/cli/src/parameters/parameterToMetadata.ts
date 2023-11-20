import type {specification} from '@openapi-adapter/core'
import { Type,Import } from "../codegen";
import { schemaToMetadata } from '../schema/schemaToMetadata';
import { getParameterReference } from '../components/getParameterReference';

export function parameterToMetadata(
  oas: specification.OpenAPIObject,
  parameter: specification.ParameterObject
): {
  parameter: specification.ParameterObject
  type: Type<any> 
  comments: string[]
  imports: Import[]
}{
  let imports: Import[] = [new Import('@openapi-adapter/core',{adapter:null},undefined,true)]

  if (parameter.$ref) {
    const {object,typeName} = getParameterReference(oas,parameter.$ref)
    return {
      parameter: object,
      type: Type.newRef("parameter."+typeName),
      comments: [],
      imports: [new Import('./parameters',{parameter:null},undefined,true)],
    }
  }

  let comments: string[] = []

  if (!!parameter.deprecated) {
    comments = comments.concat(`@deprecated`)
  }
  if (parameter.summary) {
    comments = comments.concat(`@summary ${parameter.summary}`)
  }
  if (parameter.description) {
    comments = comments.concat(`@description ${parameter.description}`)
  }

  let serialization: {
    type: Type<"ref">;
    comments: never[];
  } 

  switch(parameter.in){
    case 'cookie':
      serialization = { 
        type: Type.newRef(`adapter.serialization.CookieSerialization`),
        comments: [],
      }
      break

    case 'header':
      serialization = { 
        type: Type.newRef(`adapter.serialization.HeaderSerialization`),
        comments: [],
      }
      break

    case 'path':
      serialization = { 
        type: Type.newRef(`adapter.serialization.PathSerialization`),
        comments: [],
      }
      break
    
    case 'query':
      serialization = { 
        type: Type.newRef(`adapter.serialization.QuerySerialization`),
        comments: [],
      }
      break
    default:
      throw `unknown parameter location: ${parameter.in}`
  }

  const schema = schemaToMetadata(parameter.schema!)
  imports = imports.concat(schema.imports)

  return {
    parameter,
    type: Type.newObject({
      serialization,
      value: {type: schema.type, comments: schema.comments}
    }), 
    comments,
    imports,
  }
}