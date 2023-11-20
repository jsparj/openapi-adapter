import type {specification} from '@openapi-adapter/core'
import { Interface, Type, Import} from '../../codegen'
import { nameToTypename } from '../../utils/nameToTypename'


export function generateAuth(oas: specification.OpenAPIObject, definition: Interface): Import[] {
  
  
  let global = Type.newUnion()
  if (oas.security) {
    global = Type.newUnion(
      ...oas.security.map(s => 
        Type.newTuple(
          ...Object.keys(s).sort().map(id => Type.newString(id))
        )
      )
    )
  }
  let imports: Import[] = []
  let schemes = Type.newObject({})
  if(oas.components?.securitySchemes) {
    imports = imports.concat(new Import('./securitySchemes',{securityScheme:null},undefined,true))
    Object.keys(oas.components.securitySchemes).forEach(s => {
      schemes.tryAddField(`'${s}'`,Type.newRef("securityScheme."+nameToTypename(s)))
    })
  }

  let auth = Type.newObject({schemes: {type: schemes}, global: {type:global}})
  
  definition.tryAddField("auth",auth)
  return imports
}
