import { component } from '.'
import { Intersect} from '../../common'
import * as raw from '../specification'

export namespace schema {

    export type ObjectName<T extends raw.OpenAPIObject> = T['components'] extends (infer componentsObject extends raw.ComponentsObject) ?
        keyof componentsObject['schemas'] : never


    export type Object<T extends raw.ComponentsObject | undefined, U extends raw.SchemaObject> = Exclude<
        U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
        U["enum"] extends Record<number, infer enumType> ? enumType :
        U["type"] extends "string" ? string :
        U["type"] extends "number" ? number :
        U["type"] extends "boolean" ? boolean :
        U["type"] extends "array" ? ObjectFromArray<T, U> :
        U["type"] extends "object" ? ObjectFromObject<T, U> :
        U['anyOf'] extends (infer anyOf extends readonly raw.SchemaObject[]) ? ObjectFromAnyOf<T, anyOf> :
        U['allOf'] extends (infer allOf extends readonly raw.SchemaObject[]) ? Intersect<Object<T, allOf[number]>> :
        U['oneOf'] extends (infer oneOf extends readonly raw.SchemaObject[]) ? Object<T, oneOf[number]> :
        never,
        U['not'] extends (infer not extends readonly raw.SchemaObject[]) ? Object<T, not[number]> : never
    >


    type ObjectFromArray<T extends raw.ComponentsObject | undefined, U extends raw.SchemaObject> =
        U['items'] extends raw.SchemaObject ? Object<T, U['items']>[] : unknown[]

    type ObjectFromObject<T extends raw.ComponentsObject | undefined, U extends raw.SchemaObject> = Intersect<
        | (U["properties"] extends (infer properties extends Record<keyof U["properties"], raw.SchemaObject>) ? ObjectFromObjectAndProperties<T, U, properties> : never)
        | (U["additionalProperties"] extends (infer additionalProperties extends true | raw.SchemaObject) ? ObjectFromObjectAndAdditionalProperties<T, additionalProperties> : never)
    >

    type ObjectFromObjectAndProperties<T extends raw.ComponentsObject | undefined, U extends raw.SchemaObject, Properties extends Record<keyof U["properties"], raw.SchemaObject>> =
        U['required'] extends Record<number, (infer required extends keyof Properties)>
        ?
        & { [key in required]: Object<T, Properties[key]> }
        & { [key in Exclude<keyof Properties, required>]?: Object<T, Properties[key]> }
        :
        { [key in keyof Properties]?: Object<T, Properties[key]> }

    type ObjectFromObjectAndAdditionalProperties<T extends raw.ComponentsObject | undefined, AdditionalProperties extends true | raw.SchemaObject> =
        AdditionalProperties extends raw.SchemaObject ? Object<T, AdditionalProperties> : Record<any, unknown>


    // TODO: not exact type match:
    type ObjectFromAnyOf<T extends raw.ComponentsObject | undefined, AnyOf extends readonly raw.SchemaObject[]> = Object<T, AnyOf[number]> extends infer schemas ?
        Partial<Intersect<schemas>> : never

}