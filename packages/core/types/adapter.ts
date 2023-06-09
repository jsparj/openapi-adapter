import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter {
    type HttpStatusLabels = import('../src/enums').HttpStatusLabels;
    
    export interface IFetch<NS extends string, T extends Definition> {
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

    export interface IAuthorization<T extends Definition> {
        configureApiKey<AuthId extends auth.SecuritySchemeId<T>>(
            authId: AuthId
        ): void

        /**
         * Sets Authorization header for all requests that need this authentication method.
         * @remarks You will have to manage `refreshToken` logics for yourself.
         * @param securitySchemeId Security scheme id.
         * @param accessToken Full content of `Authorization` header value.
         */
        configureOAuth2<SecuritySchemeId extends auth.OAuth2Id<T>>(
            securitySchemeId: SecuritySchemeId,
            accessToken: string
        ): void
        configureOpenIdConnect<AuthId extends auth.SecuritySchemeId<T>>(
            authId: AuthId
        ): void
        configureHttpAuthentication<AuthId extends auth.SecuritySchemeId<T>>(
            authId: AuthId
        ): void
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

    export type Settings<T extends Definition> = {
        host: string
        global: path.Settings
        pathOverrides: {
            [pathId in keyof T]?: utility.DeepPartial<path.Settings>
        }
    }

    export type Definition<T extends {
            auth: auth.Object<any, any, any>
            path: path.Map    
            refs: ref.Map<any>
        } = {
            auth: auth.Object<any, any, any>
            path: path.Map    
            refs: ref.Map<any>
        }
    > = T

    export type Responses<
        NS extends string,
        T extends Definition,
        PathId extends keyof T,
        HttpMethod extends keyof T[PathId],
        ContentMediaType extends response.ContentType<T,PathId,HttpMethod>
        > = T extends {paths: infer paths extends path.Map<any>}
        ? paths[PathId][HttpMethod] extends (infer operation extends path.Operation<any, any>)
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
        : never


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
    
    export namespace component {
        export type SchemaObject = utility.Primitive | unknown[] | object | undefined
        export type ContentObject = {
            [mediaType in specification.MediaType]?: SchemaObject
        } | undefined

        export type PathParameter = Exclude<SchemaObject,undefined>

        export type QueryParameter = {
            /** For defining non-default serialization logics.*/ 
            __serialization__: QueryParameterSerialization
            value: SchemaObject 
        }
        | { __content__: ContentObject }
        | SchemaObject

        export type QueryParameterSerialization = {
            /**@default form */
            style?: Exclude<specification.ParameterStyle, 'matrix' | 'label' | 'simple'>
            
            /**@default true */
            explode?: boolean,
            
            /**@default false */
            allowReserved?: boolean
        }

        export type HeaderParameter = {
             /** For defining non-default serialization logics.*/ 
            __serialization__: HeaderParameterSerialization
            value: SchemaObject
        } 
        | { __content__: ContentObject }
        | SchemaObject

        export type HeaderParameterSerialization = {
            /**@default false */
            explode?: boolean,
        }

        export type RequestBody = {
            mediaType: specification.MediaType
            value: SchemaObject
        }

        export type ResponseBody = ContentObject
    }


    export namespace auth
    {
        export type Object<
            T extends string = string,
            Schemes extends auth.Schemes<T, any> = auth.Schemes<T, any>,
            Requirements extends readonly string[] = readonly string[]
        > = {
            schemes: Schemes
            global: Requirements
        }

        export type Schemes<T extends string, U extends {
            [authId in T]: Item<any, any>
        }> =  U
        
        export type Item<T extends specification.SecuritySchemeType, U extends {
            type: T
            payload: Payload<T>
        }> = U

        export type SecuritySchemeId<T extends Definition> = 
            T extends { auth: Object<infer id, any, any>} ?
            id : never
        
        export type OAuth2Id<T extends Definition> = 
            T extends { auth: Object<infer id, infer scheme, any>} ?
            scheme[id & keyof scheme] extends Item<infer authType, any>?
            authType extends 'oauth2' ? id
            : never
            : never
            : never

        export type Payload<T extends specification.SecuritySchemeType> = 
            T extends 'apiKey' ? {
                name: string
                in: Exclude<specification.ParameterLocation, 'path'>
                apiKey: string
            } : 
            T extends 'http' ? {
                scheme: string
                token: string
            } : 
            T extends 'oauth2' ? {
                accessToken: string
            }: 
            T extends "openIdConnect" ? {
                openIdConnectUrl: string
            } : never
    }

    export namespace path {

        export type Settings = {
            headers: Record<string, unknown>
            queries: Record<string, unknown>
        }

        export type Map<PathId extends string = string> = {
            [pathId in PathId]: path.Item<any>
        }

        export type Operation<
            Request_ extends request.Object<any>,
            Responses_ extends response.ObjectMap<any>
        > = {
            request: Request_
            responses: Responses_
        }

        export type Item<T extends {
            [method in specification.HttpMethod]?: Operation<any, any>
        }> = T
    }

    export namespace ref {
        export type Map<T extends {[refId: string]: any}> = T
    }

    export namespace request
    {
        export type Params<
            T extends Definition,
            PathId extends keyof T,
            HttpMethod extends keyof T[PathId]
        > = T[PathId][HttpMethod] extends (infer operation extends path.Operation<any,any>)
            ? operation['request']
            : never

        export type Object<T extends {
            pathParams: Record<string, component.PathParameter>
            headers: Record<string, component.HeaderParameter>
            query: Record<string, component.QueryParameter>
            body: component.RequestBody
        }> = T
    }

    export namespace response
    {
        export type ContentType<
            T extends Definition,
            PathId extends keyof T,
            HttpMethod extends keyof T[PathId]
        > = T[PathId][HttpMethod] extends path.Operation<any, infer responses> ?
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
            [statusCode in 'default' | number]: Object<any>
        }> = T
        
        export type Headers<Operation, StatusCode> =
            Operation extends (path.Operation<any, infer responses>)
            ? StatusCode extends keyof responses
            ? responses[StatusCode] extends (Object<infer response>) 
            ? response['headers']
            : never
            : never 
            : never
        
        export type Content<Operation, StatusCode, MediaType> =
            Operation extends (path.Operation<any, infer responses>)
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
