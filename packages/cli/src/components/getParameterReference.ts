import type {specification} from '@openapi-adapter/core'
import { nameToTypename } from '../utils/nameToTypename'

/**
 * @throws on not found, or ref type mismatch
 */
export function getParameterReference(
  oas: specification.OpenAPIObject,
  $ref: string
):{
  typeName: string
  object: specification.ParameterObject
} 
{
  let parts = $ref.split('/')

  if (parts.length !== 4) throw `reference must have 4 parts seperated by '/'`
  if (parts[2] !== 'parameters') throw `reference is not for parameter`
  if (!oas.components) throw `provided OpenAPIObject does not have 'components' field`
  if (!oas.components.parameters) throw `provided OpenAPIObject does not have 'components.parameters' field`

  let p = oas.components.parameters[parts[3]]
  if (!p) throw `provided OpenAPIObject does not have reference for: ${$ref}`

  return {
    typeName: nameToTypename(parts[3]),
    object: p
  }
}