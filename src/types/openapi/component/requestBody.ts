import {Intersect} from '../../common'
import * as raw from '../specification'
import { component } from './index';
import { content } from './content'


export namespace requestBody {
    export type ObjectName<T extends raw.OpenAPIObject> = T['components'] extends (infer componentsObject extends raw.ComponentsObject) ?
        keyof componentsObject['requestBodies'] : never


    export type Object<T extends raw.ComponentsObject | undefined, U extends raw.RequestBodyObject> =
        U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
        (
            | (U['content'] extends raw.ContentObject ? content.Object<T, U['content']> : never)
            | (U['required'] extends true ? never : undefined)
        )
}
