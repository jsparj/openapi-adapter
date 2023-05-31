import {Intersect} from '../common'
import * as raw from './specification'

import { parameter, response, requestBody } from './component';


export namespace path {
    type ExtractPathParams<T extends string> =
        T extends `${infer First}/${infer Rest}`
        ? First extends `{${infer _First}}`
        ? _First | ExtractPathParams<Rest>
        : ExtractPathParams<Rest>
        : T extends `{${infer _T}}`
        ? _T
        : never;

    type ExtractParams<
        T extends raw.OpenAPIObject,
        RawOperation extends raw.OperationObject,
        Source extends raw.ParameterLocation
    > = Intersect<
        RawOperation['parameters'] extends readonly raw.ParameterObject[]
        ? RawOperation['parameters'][number] extends infer Param
        ? Param extends raw.ParameterObject<Source>
        ? { [name in Param["name"]]: parameter.BaseObject<T['components'], Param> }
        : never
        : never
        : never
    >

    type ExtractResponses<
        T extends raw.OpenAPIObject,
        RawOperation extends raw.OperationObject,
    > = response.ObjectMap<T['components'], RawOperation['responses'], false>;

    export type OperationResponse<
        T extends raw.OpenAPIObject,
        Path extends keyof T['paths'],
        Method extends keyof T['paths'][Path],
        StatusCode extends keyof T['paths'][Path][Method]['responses' & keyof T['paths'][Path][Method]]
        > = Method extends raw.HttpMethod
        ? T['paths'][Path] extends (infer pathItem extends raw.PathItemObject)
        ? Method extends keyof pathItem
        ? pathItem[Method] extends (infer rawOperation extends raw.OperationObject)
        ? response.Object<T['components'], rawOperation['responses'][StatusCode & keyof rawOperation['responses']], false>
        : never
        : never
        : never
        : never

    export type Operation<
        T extends raw.OpenAPIObject,
        Path extends keyof T['paths'],
        Method extends keyof T['paths'][Path]
        > =
        Method extends raw.HttpMethod
        ? T['paths'][Path] extends (infer pathItem extends raw.PathItemObject)
        ? Method extends keyof pathItem
        ? pathItem[Method] extends (infer rawOperation extends raw.OperationObject)
        ? {
            request: Intersect<
                | (ExtractParams<T, rawOperation, 'path'> extends (infer paths extends Record<string, any>) ? { pathParams: paths } : never)
                | (ExtractParams<T, rawOperation, 'header'> extends (infer headers extends Record<string, any>) ? { headers: headers } : never)
                | (ExtractParams<T, rawOperation, 'query'> extends (infer queries extends Record<string, any>) ? { query: queries } : never)
                | (rawOperation['requestBody'] extends (infer requestBody extends raw.RequestBodyObject) ? { body: requestBody.Object<T['components'], requestBody> } : never)
            >
            responses: ExtractResponses<T, rawOperation>;
        }
        : never
        : never
        : never
        : never

    
    export type Params<Path extends string | number | symbol> = Path extends string
        ? Record<ExtractPathParams<Path>, string | number>
        : never;
    

    export type Item<T extends raw.OpenAPIObject, PathId extends keyof T['paths']> = T['paths'] extends raw.PathsObject
        ? PathId extends keyof T['paths'] ? {
            [httpMethod in (keyof T['paths'][PathId]) & raw.HttpMethod]: Operation<T, PathId, httpMethod>
        }: never : never

        
    
    export type Paths<T extends raw.OpenAPIObject> = T['paths'] extends raw.PathsObject
        ?{[pathRoute in keyof T['paths']]: Item<T, pathRoute>} : never
}