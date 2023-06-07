import { specification } from './specification'
import { DeepPartial, Intersect, Primitive } from './utility'
import { HttpStatusLabels } from '../enums'


export namespace adapter {

    export interface IFetch<NS extends string, T extends path.Map<any>> {
        /**
         * This action lets you do requests against `adapter.path.Map`that you have provided.
         * <para>Have request parameters and response has full support for intellisence and matches perfectly to provided api definition.</para>
         * @param pathId available pathIds to provided OpenApi 3.x path map in `paths/*`
         * @param method available HttpMethods for provided `pathId`
         * @param requestParams request parameters for provided `pathId` and `method`
         */
        request<
            PathId extends keyof T = keyof T,
            HttpMethod extends keyof T[PathId] = keyof T[PathId]
        >(
            pathId: PathId,
            method: HttpMethod,
            requestParams: RequestParams<T, PathId, HttpMethod>
        ): Promise<Responses<NS, T, PathId, HttpMethod>>
    }

    export interface ISerializer<SerializedQueryParameters,SerializedBody> {
        pathParameters(pathId: string, parameters: Record<string, component.PathParameter> | undefined): string
        queryParameters(parameters: Record<string, component.QueryParameter> | undefined): SerializedQueryParameters
        headerParameters(parameters: Record<string, component.HeaderParameter> | undefined): Record<string, string> 
        body(body: component.RequestBody): SerializedBody
    }

    export interface IDeserializer {
        data<T>(
            data: unknown,
            mediaTypeOverride?: specification.MediaType
        ): T

        headerParameters<T>(
            parameters: Record<string, string> | undefined,
            mediaTypeOverrides?: Record<string, specification.MediaType>
        ): T 
    }

    export interface IResponseValidator {
        validate(responseResult: response.Result): void
    }

    export type Settings<T extends path.Map<any>> = {
        host: string
        global: path.Settings
        pathOverrides: {
            [pathId in keyof T]?: DeepPartial<path.Settings>
        }
    }

    export type RequestParams<
        T extends path.Map<any>,
        PathId extends keyof T,
        HttpMethod extends keyof T[PathId]
    > = T[PathId][HttpMethod] extends (infer operation extends path.Operation<any,any,any>)
        ? operation['request']
        : never

    export type Responses<
        NS extends string,
        T extends path.Map<any>,
        PathId extends keyof T,
        HttpMethod extends keyof T[PathId]
    > = T[PathId][HttpMethod] extends (infer operation extends path.Operation<any,any,any>)
        ? Intersect<{
            [statusCode in keyof operation['responses']]:
            response.StatusCode<statusCode> extends (infer code extends number) ?
            {
                /**
                 * TYPE: Defined status codes in the OpenApi object.
                 */
                status: code,
                /**
                 * TYPE: `${namespace}/${httpStatusLabel}`
                 */
                code: response.StatusLabel<NS, code>,
                /**
                 * TYPE: `unknown` when the OpenApi object doesn't define response headers or schema for this response.
                 */
                headers: response.Headers<operation, statusCode>,
                /**
                 * TYPE: `unknown` when the OpenApi object doesn't define response content or schema for this response.
                 */
                data: response.Content<operation, statusCode>,
            }
            : never
        }>[keyof operation['responses']]
        : never

    export namespace component {
        export type SchemaObject = Primitive | unknown[] | object | undefined
        export type ContentObject = {
            [mediaType in specification.MediaType]?: SchemaObject
        } | undefined

        export type PathParameter = Exclude<SchemaObject,undefined>

        export type QueryParameter = {
            style: Exclude<specification.ParameterStyle, 'matrix' | 'label' | 'simple'>
            explode: boolean,
            allowReserved?: true
            value: SchemaObject 
        }
        export type HeaderParameter = {
            style: Exclude<specification.ParameterStyle, 'matrix' | 'label' | 'simple'>
            explode: boolean
            mediaType: specification.MediaType
            value: SchemaObject | ContentObject
        }
            
        export type RequestBody = ContentObject 
        export type ResponseBody = ContentObject
    }
    
    export namespace path {

        export type Settings = {
            security: request.Security
            headers: Record<string, unknown>
            queries: Record<string, unknown>
        }

        export type Operation<
            Request_ extends request.Object<any>,
            Responses_ extends request.ObjectMap<any>,
            Security_ extends request.Security
        > = {
            request: Request_
            security: Security_
            responses: Responses_
        }

        export type PathItem<T extends {
            [method in specification.HttpMethod]?: Operation<any, any, any>
        }> = T
    
        export type Map<T extends {
            [pathId: string]: PathItem<any>
        }> = T
    }

    export namespace deserializer {
        export type Settings = {
            response: {
                bodyMediaType: specification.MediaType
                headerMediaType: specification.MediaType
            }
        }
    }

    export namespace request {



        export type Object<T extends {
            pathParams: Record<string, component.PathParameter>
            headers: Record<string, component.HeaderParameter>
            query: Record<string, component.QueryParameter>
            body: component.RequestBody
        }> = T

        export type ObjectMap<T extends {
            [statusCode in 'default' | number]: request.Object<any>
        }> = T


        export type Security = {}
    }

    export namespace response {

        export type Result = {
            statusCode: number,
            headers: Record<string, unknown>
            data: unknown
        }

        export type Options = {
            overrides?: {
                dataMediaType?: specification.MediaType,
                headerMediaTypes?: Record<string, specification.MediaType>
            }
        }

        export type StatusCode<Code> =
            Code extends 'default' ? number
            : Code extends `${infer statusCode extends number}`? statusCode
            : never

        export type GenericType =
            | 'info'
            | 'success'
            | 'redirect'
            | 'unknown'
            | 'error:client'
            | 'error:server'
        
        export type GenericRespose = {
            type: GenericType
            code: string,
            status: number,
            headers: Record<string, unknown>,
            data: unknown
        }

        export type Identity<NS extends string>= {
            namespace: NS
            pathId: string
            method: specification.HttpMethod
            statusCode: number
        }

    
        export type StatusLabel<NS extends string, StatusCode extends string|number> =
            typeof HttpStatusLabels extends (infer statusLabels)
            ? StatusCode extends keyof statusLabels
            ? statusLabels[StatusCode] extends (infer label)
            ? label extends string ? `${NS}/${label}`
            : label extends undefined ? `${NS}/${StatusCode}`
            : never
            : never
            : never
            : never
        
        export type Object<T extends {
            headers?: Record<string, string>
            content?: any
        }> = T
        
        
        export type Headers<Operation, StatusCode> =
            Operation extends (path.Operation<any, infer responses, any>)
            ? StatusCode extends keyof responses
            ? responses[StatusCode] extends (Object<infer response>) 
            ? response['headers']
            : never
            : never 
            : never
        
        export type Content<Operation, StatusCode> =
            Operation extends (path.Operation<any, infer responses, any>)
            ? StatusCode extends keyof responses
            ? responses[StatusCode] extends (Object<infer response>) 
            ? response['content'][keyof response['content']]
            : 'n3'
            : 'n2'
            : 'n1'
    }
}
