import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter {
    type HttpStatusLabels = import('../src/enums').HttpStatusLabels;
    
    export interface IFetch<NS extends string, T extends path.Map<any>> {
        /**
         * This action lets you do requests against `adapter.path.Map`that you have provided.
         * <para>Have request parameters and response has full support for intellisence and matches perfectly to provided api definition.</para>
         * @param pathId Available pathIds to provided OpenApi 3.x path map in `paths/*`
         * @param method Available HttpMethods for provided `pathId`
         * @param requestParams Request parameters for provided `pathId` and `method`
         * @param contentType (optional) Available content media types, default content-type header will be used if this is not provided.
         */
        request<
            PathId extends keyof T = keyof T,
            HttpMethod extends keyof T[PathId] = keyof T[PathId],
            ContentMediaType extends response.ContentType<T,PathId,HttpMethod> = response.ContentType<T,PathId,HttpMethod>
        >(
            pathId: PathId,
            method: HttpMethod,
            requestParams: request.Params<T, PathId, HttpMethod>,
            contentType?: ContentMediaType
        ): Promise<Responses<NS, T, PathId, HttpMethod, ContentMediaType>>
    }
    export interface ISerializer<SerializedRequestBody> {
        pathString(pathId: string, parameters: Record<string, component.PathParameter> | undefined): string
        queryString(parameters: Record<string, component.QueryParameter> | undefined): string
        headerParameters(parameters: Record<string, component.HeaderParameter> | undefined): Record<string, string> 
        requestBody(body: component.RequestBody): Promise<SerializedRequestBody>
    }

    export interface IDeserializer<RawResponseContent> {
        responseContent(
            content: RawResponseContent,
            mediaTypeOverride?: specification.MediaType
        ): Promise<unknown>
    }

    export interface IResponseValidator {
        validate(responseResult: response.Result): void
    }

    export type Settings<T extends path.Map<any>> = {
        host: string
        global: path.Settings
        pathOverrides: {
            [pathId in keyof T]?: utility.DeepPartial<path.Settings>
        }
    }


    export type Responses<
        NS extends string,
        T extends path.Map<any>,
        PathId extends keyof T,
        HttpMethod extends keyof T[PathId],
        ContentMediaType extends response.ContentType<T,PathId,HttpMethod>
    > = T[PathId][HttpMethod] extends (infer operation extends path.Operation<any,any,any>)
        ? utility.Intersect<{
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
                content: response.Content<operation, statusCode, ContentMediaType>,
            }
            : never
        }>[keyof operation['responses']]
        : never

    export namespace component {
        export type SchemaObject = utility.Primitive | unknown[] | object | undefined
        export type ContentObject = {
            [mediaType in specification.MediaType]?: SchemaObject
        } | undefined

        export type PathParameter = Exclude<SchemaObject,undefined|null>

        export type QueryParameter = {
            /** For defining non-default serialization logics.*/ 
            __serialization__: QueryParameterSerialization
            value: SchemaObject 
        } | SchemaObject

        export type QueryParameterSerialization = {
            /**@default form */
            style?: Exclude<specification.ParameterStyle, 'matrix' | 'label' | 'simple'>
            
            /**@default true */
            explode?: boolean,
            
            /**@default false */
            allowReserved?: boolean
            
            /**@default `application/json` */
            mediaType?: specification.MediaType
        }

        export type HeaderParameter = {
             /** For defining non-default serialization logics.*/ 
            __serialization__: HeaderParameterSerialization
            value: SchemaObject
        } | SchemaObject

        export type HeaderParameterSerialization = {
            /**@default false */
            explode?: boolean,
            
            /**@default `application/json` */
            mediaType?: specification.MediaType
        }

        export type RequestBody = {
            mediaType: specification.MediaType
            value: SchemaObject
        }

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
            Responses_ extends response.ObjectMap<any>,
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

    export namespace serializer {
        export type Settings<SerializedRequestBody> = {
            pathString: PathStringOptions
            queryString: QueryStringOptions 
            header: HeaderOptions
            requestBody: RequestBodyOptions<SerializedRequestBody>
        }

        export type PathStringOptions = {
            constants: ValueConstants
            contentObjectSerializer?: (pathParameter: component.ContentObject) => string
        }

        export type QueryStringOptions = {
            constants: ValueConstants
            contentObjectSerializer?: (queryParameter: component.ContentObject) => string
        }

        export type HeaderOptions = {
            constants: ValueConstants
            contentObjectSerializer?: (headerParameter: component.ContentObject) => string
        }

        export type RequestBodyOptions<SerializedRequestBody> = {
            defaultSerializer: (body: component.SchemaObject, mediaType: specification.MediaType) => Promise<SerializedRequestBody>;
            serializerOverrides?: {
                [mediaType in specification.MediaType]?: (body: component.SchemaObject) => Promise<SerializedRequestBody>;
            }
        }

        export type ValueConstants = {
            nullString: string
            undefinedString: string
            trueString: string
            falseString: string
        }
    }

    export namespace deserializer {
        export type Settings<RawResponseContent> = {
            responseContent: {
                defaultDeserializer: (content: RawResponseContent, mediaType: specification.MediaType) => Promise<unknown>
                deserializerOverrides?: {
                    [mediaType in specification.MediaType]?: (content: RawResponseContent) => Promise<unknown>
                }
            } 
        }
    }

    export namespace request
    {
        export type Params<
            T extends path.Map<any>,
            PathId extends keyof T,
            HttpMethod extends keyof T[PathId]
        > = T[PathId][HttpMethod] extends (infer operation extends path.Operation<any,any,any>)
            ? operation['request']
            : never

        export type Object<T extends {
            pathParams: Record<string, component.PathParameter>
            headers: Record<string, component.HeaderParameter>
            query: Record<string, component.QueryParameter>
            body: component.RequestBody
        }> = T


        export type Security = {}
    }

    export namespace response {

        export type ContentType<
            T extends path.Map<any>,
            PathId extends keyof T,
            HttpMethod extends keyof T[PathId]
        > = T[PathId][HttpMethod] extends path.Operation<any, infer responses, any> ?
            responses[keyof responses] extends response.Object<infer res> ?
            keyof res['content']
            : never
            : never



        export type Result = {
            statusCode: number,
            headers: Record<string, unknown>
            data: unknown
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
            StatusCode extends keyof HttpStatusLabels
            ? HttpStatusLabels[StatusCode] extends (infer label)
            ? label extends string ? `${NS}/${label}`
            : label extends undefined ? `${NS}/${StatusCode}`
            : never
            : never
            : never
        
        export type Object<T extends {
            headers?: Record<string, string>
            content?: any
        }> = T
        
        export type ObjectMap<T extends {
            [statusCode in 'default' | number]: request.Object<any>
        }> = T
        
        export type Headers<Operation, StatusCode> =
            Operation extends (path.Operation<any, infer responses, any>)
            ? StatusCode extends keyof responses
            ? responses[StatusCode] extends (Object<infer response>) 
            ? response['headers']
            : never
            : never 
            : never
        
        export type Content<Operation, StatusCode, MediaType> =
            Operation extends (path.Operation<any, infer responses, any>)
            ? StatusCode extends keyof responses
            ? responses[StatusCode] extends (Object<infer response>) 
            ? MediaType extends keyof response['content']
            ? response['content'][MediaType]
            : never
            : never
            : never
            : never
    }
}