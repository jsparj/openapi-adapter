import type {specification} from '@openapi-adapter/core'
import { Type,Import } from "../codegen";
import { schemaToMetadata } from '../schema/schemaToMetadata';
import { getHeaderReference } from '../components/getHeaderReference';

export function headerToMetadata(
  oas: specification.OpenAPIObject,
  header: specification.HeaderObject
): {
  type: Type<any>
  header: specification.HeaderObject
  comments: string[]
  imports: Import[]
}{
  let imports: Import[] = []

  if (header.$ref) {
    let {typeName,object} = getHeaderReference(oas,header.$ref)
    
    return {
      type: Type.newRef("header."+typeName),
      comments: [],
      header: object,
      imports: [new Import('./headers',{header:null},undefined,true)]
    }
  }


  let comments: string[] = []
  if (header.deprecated) comments = comments.concat("@deprecated")
  if (header.summary) comments = comments.concat(`@summary ${header.summary}`)
  if (header.description) comments = comments.concat(`@description ${header.description}`)
  
  let definition: string[] = []
  if (header.allowEmptyValue !== undefined) definition = definition.concat(`- \`allowEmptyValue\`:${header.allowReserved}`)
  if (header.allowReserved !== undefined) definition = definition.concat(`- \`allowReserved\`:${header.allowReserved}`)
  if (header.explode !== undefined) definition = definition.concat(`- \`explode\`:${header.explode}`)
  if (header.style !== undefined) definition = definition.concat(`- \`style\`:${header.style}`)
  if (definition.length > 0) comments = comments.concat("@definition The schema has following definitions:", definition)
  
  if (header.content) {
    throw "response content not yet supported"
  }

  let type = Type.newString()

  if (header.schema) {
    type = schemaToMetadata(header.schema).type
  }

  return {
    type,
    header: header,
    comments,
    imports,
  }
}