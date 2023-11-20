import type {specification} from '@openapi-adapter/core'
import { nameToTypename } from '../utils/nameToTypename'

/**
 * @throws on not found, or ref type mismatch
 */
export function getHeaderReference(
  oas: specification.OpenAPIObject,
  $ref: string
):{
  typeName: string
  object: specification.HeaderObject
} 
{
  let parts = $ref.split('/')

  if (parts.length !== 4) throw `reference must have 4 parts seperated by '/'`
  if (parts[2] !== 'headers') throw `reference is not for headers`
  if (!oas.components) throw `provided OpenAPIObject does not have 'components' field`
  if (!oas.components.headers) throw `provided OpenAPIObject does not have 'components.headers' field`

  let p = oas.components.headers[parts[3]]
  if (!p) throw `provided OpenAPIObject does not have reference for: ${$ref}`

  return {
    typeName: nameToTypename(parts[3]),
    object: p
  }
}