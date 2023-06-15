import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter {
    
    export interface IFetch<NS extends string, T extends Definition, Settings extends adapter.Settings> {
        /**
         * This action lets you do requests against `adapter.path.Map`that you have provided.
         * <para>Have request parameters and response has full support for intellisence and matches perfectly to provided api definition.</para>
         * @param pathId Available pathIds to provided OpenApi 3.x path map in `paths/*`
         * @param method Available HttpMethods for provided `pathId`
         * @param requestParams Request parameters for provided `pathId` and `method`
         * @param responseDeserialization (optional) Deserialization settings for response content and headers.
         */
        request<
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>,
            RequestParams extends request.Params<T, PathId, HttpMethod>,
            ResponseDeserialization extends response.Deserialization<T, PathId, HttpMethod>,
        >(
            pathId: PathId,
            method: HttpMethod,
            requestParams: RequestParams,
            responseDeserialization?: ResponseDeserialization
        ): Promise<Responses<
            NS,
            T,
            PathId,
            HttpMethod,
            ResponseDeserialization,
            Settings['response']>
        >
    }

    export interface IAuthorization<T extends Definition> {
        initializeAuth(): void

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
        pathString(pathId: string, parameters: Record<string, request.PathParameter> | undefined): string
        queryString(parameters: Record<string, request.QueryParameter> | undefined): string
        headerParameters(parameters: Record<string, request.HeaderParameter> | undefined): Record<string, string>
        requestBody(body: component.ContentObject): Promise<SerializedRequestBody>
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

    export type Settings = {
        host: string,
        response: response.Settings
    }

    export type Definition<T extends {
        auth: auth.Object
        path: path.Object
        refs: ref.Map
    } = any> = T

    export type Responses<
        NS extends string,
        T extends Definition,
        PathId extends path.Id<T>,
        HttpMethod extends path.HttpMethod<T, PathId>,
        Deserialization extends response.Deserialization<T,PathId, HttpMethod>,
        Settings extends response.Settings
    > = path.Context<T, PathId, HttpMethod> extends {
        responseObject: infer responseObject extends response.Object<any>
    } ? keyof responseObject extends infer statusCodes extends keyof responseObject
        ?{
            [statusCode in statusCodes]: statusCode extends 'default'
            ? (
                responseObject extends { default: infer defaultItem extends response.Item }
                ? {
                    status: number,
                    code: response.StatusLabel<NS, keyof response.HttpStatusLabels>,
                    headers: response.Headers<defaultItem, Deserialization, Settings>,
                    data: response.Data<defaultItem, Deserialization, Settings>,
                }
                : never
            )
            : statusCode extends `${infer code extends number}`
            ? (
                responseObject[statusCode] extends infer statusItem extends response.Item
                ? {
                    status: code,
                    code: response.StatusLabel<NS, code>,
                    headers: response.Headers<statusItem, Deserialization, Settings>,
                    data: response.Data<statusItem, Deserialization, Settings>,
                }
                : never
            )
            : never
        }[statusCodes]
        : never
        : never
    export namespace serialization {
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

        export type PathParameter = {
            /**@default undefined */
            mediaType: specification.MediaType
        }

        export type HeaderParameter = {
            /**@default undefined */
            mediaType?: specification.MediaType
            
            /**@default false */
            explode?: boolean,
        }
                
        export type QueryParameter = {
            /**@default undefined */
            mediaType?: specification.MediaType

            /**@default form */
            style?: Exclude<specification.ParameterStyle, 'matrix' | 'label' | 'simple'>
            
            /**@default true */
            explode?: boolean,
            
            /**@default false */
            allowReserved?: boolean
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
        export type SchemaObject = utility.Primitive | unknown[] | object 
        export type ContentObject<
            T extends string = specification.MediaType,
            U extends SchemaObject = SchemaObject
        > = {
            mediaType: T
            value: U
        }
    }


    export namespace auth
    {
        export type Requirements<Requirements extends readonly string[] = any> = Requirements

        export type Object<
            Schemes extends auth.Schemes<string, any> = auth.Schemes<string, any>,
            Requirements extends auth.Requirements = auth.Requirements
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
            T extends { auth: Object<infer schemes, any>} ?
            keyof schemes
            : never
        
        export type OAuth2Id<T extends Definition> = 
            T extends { auth: Object<infer schemes, any> }
            ? keyof schemes extends infer authId extends keyof schemes
            ? schemes[authId] extends Item<infer authType, any>
            ? authType extends 'oauth2' ? authId
            : never
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

        export type Object<PathId extends string = any> = {
            [pathId in PathId]: {
                item: Item
                operations: OperationMap
            }
        }

        export type Item<RequestPathParams extends request.PathParams<any,any,any> = any> = {
            requestParams: RequestPathParams
        }

        export type Id<T extends Definition> =
            T extends { path: Object<infer pathId> }
            ? pathId
            : never
        
        export type HttpMethod<T extends Definition, PathId extends Id<T>> =
            T extends { path: infer pathObject extends Object<PathId> }
            ? pathObject[PathId] extends { operations: path.OperationMap<infer httpMethod>}
            ? httpMethod
            : never
            : never
        
        export type Context<
            T extends Definition,
            PathId extends Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>
        > = T extends {
                path: infer pathObject extends path.Object<PathId>
            } ? pathObject[PathId] extends {
                item: path.Item<infer requestPathParams>,
                operations: infer operationMap extends path.OperationMap<HttpMethod>  
            }? operationMap[HttpMethod] extends path.Operation<
                infer requestOperationParams,
                infer responseObject
            >
            ? {
                requestParams: requestPathParams & requestOperationParams
                responseObject: responseObject
            }
            : never
            : never
            : never

        

        export type Operation<
            RequestOperationParams extends request.OperationParams<any,any,any,any, any>,
            ResponseObject extends response.Object<any>
        > = {
            requestParams: RequestOperationParams
            responseObject: ResponseObject
        }
        
        export type OperationMap<HttpMethod extends specification.HttpMethod = any> = {
            [methodId in HttpMethod]: path.Operation<any,any>
        }
    }

    export namespace ref {
        export type Map<
            RefId extends string = string,
            T extends { [refId in RefId]: any } = { [refId in RefId]: any }
        > = T
    }

    export namespace request {
        export type Params<
            T extends Definition,
            PathId extends adapter.path.Id<T>,
            HttpMethod extends adapter.path.HttpMethod<T, PathId>
        > = path.Context<T,PathId,HttpMethod> extends { requestParams: infer requestParams }
            ? requestParams
            : never
        
        export type PathParams<
            PathParams extends Record<string, PathParameter> | undefined = any,
            Headers extends Record<string, HeaderParameter> | undefined = any,
            Query extends Record<string, QueryParameter> | undefined = any
        > = utility.Intersect<
            | PathParams extends Record<string, PathParameter> ? { pathParams: PathParams } : never
            | Headers extends Record<string, HeaderParameter> ? { headers: Headers } : never
            | Query extends Record<string, QueryParameter> ? { query: Query } : never
        >
        
        export type OperationParams<
            AuthRequirements extends auth.Requirements,
            PathParams extends Record<string, PathParameter>,
            Headers extends Record<string, HeaderParameter>,
            Query extends Record<string, QueryParameter>,
            Body extends component.ContentObject
        > = utility.Intersect<
            | AuthRequirements extends auth.Requirements ? { security: AuthRequirements } : never
            | PathParams extends Record<string, PathParameter> ? { pathParams: PathParams } : never
            | Headers extends Record<string, HeaderParameter> ? { headers: Headers } : never
            | Query extends Record<string, QueryParameter> ? { query: Query } : never
            | Body extends component.ContentObject ? { body: Body } : never
            >
        
        export type PathParameter = component.SchemaObject | { __serialization__:  component.ContentObject }
        export type QueryParameter = {
            /** For defining non-default serialization logics.*/ 
            __serialization__: serialization.QueryParameter
            value: component.SchemaObject 
        }
        |  component.SchemaObject    
        
        export type HeaderParameter = {
            /** For defining non-default serialization logics.*/ 
            __serialization__: serialization.HeaderParameter
            value:  component.SchemaObject
        }
        | component.SchemaObject
    }

    export namespace response {
        export type Settings = {
            defaultDataMediaType: specification.MediaType
            headerSerializations?: Record<string, serialization.HeaderParameter>
        }

        export type Deserialization<
            T extends Definition,
            PathId extends adapter.path.Id<T>,
            HttpMethod extends adapter.path.HttpMethod<T, PathId>
        > = path.Context<T, PathId, HttpMethod> extends { responseObject: infer responseObject extends Object<any> }
            ? {
                headers?: Record<string, serialization.HeaderParameter>
                data?: specification.MediaType
            }
            : never
        
        export type Result = {
            statusCode: number,
            headers: Record<string, unknown>
            data: unknown
        }

        export type GenericType =
            | 'info'
            | 'success'
            | 'redirect'
            | 'unknown'
            | 'error:client'
            | 'error:server'
        
        export type Headers<
            ResponseObject extends response.Item,
            Deserialization extends response.Deserialization<any, any, any>,
            Settings extends response.Settings
        > = ResponseObject extends { headers: infer headers extends object }
            ? headers extends Record<infer headerId, any>                
            ? (
                (Deserialization extends { headers: infer desentralization }
                    ? keyof desentralization : never) extends infer desentralizationIds extends headerId
                ? (Settings extends { headerSerializations: infer settings }
                    ? Exclude<keyof settings, desentralizationIds> : never) extends infer settingsIds extends headerId
                ? {
                    [headerName in desentralizationIds]: 'des'
                }
                &
                {
                    [headerName in settingsIds]: 'sett'
                }
                &
                {
                    [headerName in Exclude<headerId, settingsIds>]: headers[headerName] extends (utility.Primitive | undefined)
                        ? headers[headerName]
                        : string
                }
                &
                {
                    [untypedHeaders: string]: string | undefined
                }
                : never
                : never
            )  
            : never
            : undefined
        
        export type Data<
            ResponseObject extends response.Item<any>,
            Deserialization extends response.Deserialization<any, any, any>,
            Settings extends response.Settings
        > =
            ResponseObject extends { data: infer data extends component.ContentObject<infer _mediaType> }
            ? (
                (
                    (
                        Deserialization extends { data: infer mediaTypeSetting extends _mediaType }
                            ? data extends component.ContentObject<infer mediaType extends mediaTypeSetting, infer value>
                            ? component.ContentObject<mediaType, value> : never
                        : Settings extends { defaultDataMediaType: infer mediaTypeSetting extends _mediaType }
                            ? data extends component.ContentObject<infer mediaType extends mediaTypeSetting, infer value>
                            ? component.ContentObject<mediaType, value>
                        : never
                        : never
                    )
                    | {
                        mediaType: 'other'
                        value: unknown
                    }
                )
            )
            : undefined
            
        
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

        export type StatusLabel<NS extends string, StatusCode extends number> =
            StatusCode extends keyof HttpStatusLabels
                ? HttpStatusLabels[StatusCode] extends (infer label)
                ? label extends string ? `${NS}/${label}`
                : label extends undefined ? `${NS}/${StatusCode}`
                : never
                : never
                : never

        export type Item<
            Headers extends { [headerId in string]: component.SchemaObject } = any,
            Data extends component.ContentObject = any
        > = {
            headers?: Headers
            data?: Data
        }
        
        export type Object<T extends {
            default: Item
            [statusCode: number]: Item
        }> = T

        export type HttpStatusLabels = import('../src/enums').HttpStatusLabels;
    }
}