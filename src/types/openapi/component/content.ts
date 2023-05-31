import {Intersect} from '../../common'
import * as raw from '../specification'
import { schema } from './schema';

export namespace content {
    export type Object<T extends raw.ComponentsObject | undefined, U extends raw.ContentObject, ByMediaType extends boolean> = ByMediaType extends true
        ? Intersect<{
            [mediaType in keyof U]:
            U[mediaType] extends raw.MediaTypeObject
            ? U[mediaType]['schema'] extends raw.SchemaObject
            ? schema.Object<T, U[mediaType]['schema']>
            : never
            : never
        }>
        : U[keyof U] extends raw.MediaTypeObject
        ? U[keyof U]['schema'] extends raw.SchemaObject
        ? schema.Object<T, U[keyof U]['schema']>
        : never
        : never
}



