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
     type: Type.newRef("securityScheme."+typeName,[]),
     imports: [new Import('./securitySchemes', {securityScheme:null},undefined,true)]
    }
  }
  
  return {
    type: Type.newObject({
      type: Type.newString(securityScheme.type),
      payload: Type.newObject({
        in: Type.newString(securityScheme.in),
        name: Type.newString(securityScheme.name),
        value: Type.newString(),
      })
    }),
    imports: []
  }
}