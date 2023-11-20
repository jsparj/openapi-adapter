import type {specification} from '@openapi-adapter/core'
import { Type,Import } from "../codegen";
import { refToTypename } from '../utils/refToTypename';


export function securitySchemeToMetadata(securityScheme: specification.SecuritySchemeObject): {
  type: Type<any>
  imports: Import[]
}{
  if (!!securityScheme.$ref) {
    let typeName = refToTypename(securityScheme.$ref)
    return {
     type: Type.newRef("securityScheme."+typeName),
     imports: [new Import('./securitySchemes', {securityScheme:null},undefined,true)]
    }
  }
  
  return {
    type: Type.newObject({
      type: {type: Type.newString(securityScheme.type)},
      payload: {type: Type.newObject({
        in: {type: Type.newString(securityScheme.in)},
        name: {type: Type.newString(securityScheme.name)},
        value: {type: Type.newString()},
      })},
    }),
    imports: []
  }
}