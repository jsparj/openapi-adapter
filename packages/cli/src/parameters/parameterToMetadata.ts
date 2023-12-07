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
  imports: Import[]
}{
  let imports: Import[] = []

  if (parameter.$ref) {
    const {object,typeName} = getParameterReference(oas,parameter.$ref)
    return {
      parameter: object,
      type: Type.newRef("parameter."+typeName,[]),
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

  let serialization: Type<"ref">

  switch(parameter.in){
    case 'cookie':
      serialization = Type.newObject({
        explode: Type.newBoolean(parameter.explode??false)
      })
      break

    case 'header':
      serialization = Type.newObject({
        explode: Type.newBoolean(parameter.explode??false)
      })
      break

    case 'path':
      serialization = Type.newObject({
        explode: Type.newBoolean(parameter.explode??false),
        style: Type.newString(parameter.style??'simple')
      })
      break
    
    case 'query':
      serialization = Type.newObject({
        explode: Type.newBoolean(parameter.explode??true),
        style: Type.newString(parameter.style??'form'),
        allowReserved: Type.newBoolean(parameter.allowReserved??false),
      })
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
      value: schema.type,
    }, {
      comments,
      optional: !parameter.required
    }), 
    imports,
  }
}