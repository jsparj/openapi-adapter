import {Intersect} from '../../common'
import * as raw from '../specification'
import { component } from './index';
import { header } from './header';
import { content } from './content'

export namespace response {

    export type ObjectName<T extends raw.OpenAPIObject> = T['components'] extends (infer componentsObject extends raw.ComponentsObject) ?
        keyof componentsObject['responses'] : never



    export type ObjectMap<T extends raw.ComponentsObject | undefined, U extends raw.ResponsesObject, ContentByMediaType extends boolean> = {
        [statusCode in keyof U]: Object<T, U[statusCode], ContentByMediaType>
    }

    export type Object<T extends raw.ComponentsObject | undefined, U extends raw.ResponseObject, ContentByMediaType extends boolean> =
        U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
        Intersect<
            | (U['content'] extends raw.ContentObject ? { content: content.Object<T, U['content'], ContentByMediaType> } : never)
            | (U['headers'] extends raw.HeadersObject ? { headers: header.ObjectMap<T, U['headers']> } : never)
        > extends infer response ? (response extends Record<any, any> ? response : null) : never
}
