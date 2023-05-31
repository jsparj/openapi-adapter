import { component } from './index';
import * as raw from '../specification'
import { schema } from './schema';


export namespace parameter {
    export type ObjectName<T extends raw.OpenAPIObject> = T['components'] extends (infer componentsObject extends raw.ComponentsObject) ?
        keyof componentsObject['parameters'] : never
    
    export type Object<T extends raw.ComponentsObject|undefined, U extends raw.BaseParameterObject> = parameter.BaseObject<T, U>    

    export type BaseObject<T extends raw.ComponentsObject|undefined, U extends raw.BaseParameterObject> = 
    U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key> ):
    (
        | (U['schema'] extends raw.SchemaObject ? schema.Object<T, U['schema']>: unknown)
        | (U['required'] extends true ? never : undefined) 
    )
}


