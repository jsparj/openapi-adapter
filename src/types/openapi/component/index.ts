import { RequiredChild } from '../../common';
import * as raw from '../specification'
import { parameter} from './parameter'
import { response } from './response'
import { schema } from './schema'
import { requestBody } from './requestBody'

export * from './schema'
export * from './parameter'
export * from './response'
export * from './requestBody'
export * from './header';

export namespace component {
  export type Type =
    | 'schemas'
    | 'responses'
    | 'parameters'
    | 'examples'
    | 'requestBodies'
    | 'headers'
    | 'securitySchemes'
    | 'links'
    | 'callbacks';
  

  export type RefVariable<T extends raw.ComponentsObject, U extends Type, K extends string> =
    U extends 'schemas' ? schema.Object<T, RequiredChild<T, U>[K]> : 
    U extends 'parameters' | 'headers' ? parameter.BaseObject<T, RequiredChild<T, U>[K]> : 
    U extends 'responses' ? response.Object<T, RequiredChild<T, U>[K], false> :
    U extends 'requestBodies' ? requestBody.Object<T,RequiredChild<T,U>[K]> :
    never
}