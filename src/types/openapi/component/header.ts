import { component } from './index';
import * as raw from '../specification'
import { schema } from './schema';
import { parameter } from './parameter';


export namespace header {
    export type ObjectName<T extends raw.OpenAPIObject> = T['components'] extends (infer componentsObject extends raw.ComponentsObject) ?
        keyof componentsObject['headers'] : never
    
    export type Object<T extends raw.ComponentsObject | undefined, U extends raw.BaseParameterObject> = parameter.BaseObject<T, U>
    
    export type ObjectMap<T extends raw.ComponentsObject | undefined, U extends raw.HeadersObject> = {
        [headerId in keyof U]: Object<T, U[headerId]>
    }
}


