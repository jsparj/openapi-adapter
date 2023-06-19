import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter {
    
    export interface IFetch<
        NS extends string,
        T extends Definition,
        Settings extends settings.Object<any, any>
    >{
        /**
         * This action lets you do requests against `adapter.Definition` that you have provided.
         * <para>Have request parameters and response has full support for intellisence and matches perfectly to provided api definition.</para>
         * @param pathId Available pathIds to provided OpenApi 3.x path map in `paths/*`
         * @param method Available HttpMethods for provided `pathId`
         * @param requestParams Request parameters for provided `pathId` and `method`
         * @param responseDeserialization (optional) Deserialization settings for response content and headers.
         */
        request<
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>,
            RequestParams extends request.ExtractParams<T, PathId, HttpMethod, Settings['serialization']>,
            ResponseOptions extends settings.ExtractResponseOptions<T, PathId, HttpMethod>,
        >(
            pathId: PathId,
            method: HttpMethod,
            requestParams: RequestParams,
            responseDeserialization?: ResponseOptions
        ): Promise<response.Object<
            NS,
            T,
            PathId,
            HttpMethod,
            ResponseOptions,
            Settings['deserialization']
        >>
    }

    export interface IAuthorization<T extends Definition> {
        initializeAuth(authData: auth.RequiredAuthData<T>): void
        updateAuthData(authData: auth.OptionalAuthData<T>,): void
    }

    export interface ISerializer<SerializedRequestBody> {
        pathString(pathId: string, parameters: request.PathParams | undefined): string
        headerParameters(parameters: request.HeaderParams | undefined): Record<string, string>
        queryString(parameters: request.QueryParams | undefined): string
        requestBody(body: component.Media|undefined): Promise<SerializedRequestBody>
    }

    export interface IDeserializer<RawResponseContent> {
        headers(
            headers: Record<string, string>,
            responseOptions?: settings.ResponseOptions
        ): Record<string, adapter.component.Any>
        responseData(
            mediaType: specification.MediaType,
            data: RawResponseContent
        ): Promise<adapter.component.Any>
    }

    export interface ICookieManager {
        getCookie(name: string): string
        getAllCookies(): Record<string, string>
        setCookie(name: string, value: string): void
    }

    export type Definition<
        T extends { auth: auth.Object, refs: ref.Map, path: path.Object } = any
    > = T

    export namespace serialization {

        export type PathParameterSerializer = (
            key: string,
            value: component.Any,
            serialization: PathSerialization,
            constants: ValueConstants
        ) => string

        export type HeaderParameterSerializer = (
            key: string,
            value: component.Any,
            serialization: HeaderSerialization,
            constants: ValueConstants
        ) => string

        export type QueryParameterSerializer = (
            key: string,
            value: component.Any,
            serialization: QuerySerialization,
            constants: QueryConstants
        ) => string
        
        export type MediaParameterSerializer = (
            mediaType: specification.MediaType,
            key: string,
            value: component.Any
        ) => string

        export type RequestBodySerializer<SerializedRequestBody> = (
            mediaType: specification.MediaType,
            value: component.Any
        ) => Promise<SerializedRequestBody>

        export type ValueConstants = {
            nullString: string
            undefinedString: string
            trueString: string
            falseString: string
        }

        export type QueryConstants = ValueConstants & {
            /** @default `?` */
            prefix: string
            /** @default `&` */
            seperator: string
        }

        export type MediaSerialization = {
            /**@default (unspecified) */
            mediaType: specification.MediaType
        }

        export type ParameterSerialization =
            | PathSerialization
            | HeaderSerialization
            | QuerySerialization

        export type PathSerialization = {
            /**@default simple */
            style: 'simple' | 'label' | 'matrix',
            
            /**@default false */
            explode: boolean,
        }

        export type CookieSerialization = {  
            /**@default false */
            explode: boolean,
        }

        export type HeaderSerialization = {  
            /**@default false */
            explode: boolean,
        }
                
        export type QuerySerialization = {
            /**@default form */
            style: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'
            
            /**@default true */
            explode: boolean,
            
            /**@default false */
            allowReserved: boolean
        }
    }
    export namespace deserializer
    {    
        export type ResponseHeaderDeserializer = (
            headerId: string,
            value: string,
            serialization: serialization.HeaderSerialization | serialization.MediaSerialization
        ) => component.Any
        export type ResponseDataDeserializer<RawData> = (mediaType: specification.MediaType, data: RawData) => Promise<component.Any>
    }
    
    /** @summary Types for ???*/
    export namespace component {
        export type Any = utility.Primitive | unknown[] | object | undefined
        export type Media<
            T extends string = specification.MediaType,
            U extends Any = Any
        > = {
            mediaType: T
            value: U
        }
    }

    /** @summary Types for ??? */
    export namespace auth
    {
        export type Object<
            Schemes extends auth.Schemes<any> = auth.Schemes<any>,
            Requirements extends auth.Requirements = auth.Requirements
        > = {
            schemes: Schemes
            global: Requirements
        }

        export type RequiredAuthData<T extends Definition> =
            T extends { auth: Object<infer schemes, Requirements<infer requirements>> }
            ? requirements extends infer requirement extends readonly string[]
            ? { [authId in requirement[number]]: authId extends keyof schemes ? schemes[authId] : never }
            : never
            : never
        
        export type OptionalAuthData<T extends Definition> =
            T extends { auth: Object<infer schemes, any> }
            ? { [authId in keyof schemes]?: schemes[authId] }
            : never

        export type Schemes<U extends {[authId in string]: Item<any, any>}> = U



        export type Item<T extends specification.SecuritySchemeType, U extends {
            /**
             * @full-support `apiKey`, `http`
             * @limited-support `oauth2`, `openIdConnect`: 
             * You will have to implement credential requests and refreshTokens yourself.
             */
            type: T
            payload: Payload<T>
        }> = U

        export type Payload<
            T extends specification.SecuritySchemeType
        > = 
            T extends 'apiKey' ? {
                key: Token
            } : 
            T extends 'http' ? {
                scheme: string
                key: Token
            } : 
            T extends 'oauth2' ? {
                accessToken: Token
            }: 
            T extends "openIdConnect" ? {
                accessToken: Token
            } : never

        export type Token<
            In extends Exclude<specification.ParameterLocation, 'path'> = Exclude<specification.ParameterLocation, 'path'>,
            Name extends string = string
        > = {
            in: In
            name: Name
            value: string
        }

        export type Requirements<Requirements extends readonly string[] = any> = Requirements
    }

    /** @summary Types for using api refeferce types: `#/components/${ComponentType}/${ObjectId}` */
    export namespace ref {
        export type Map<
            RefId extends string = string,
            T extends { [refId in RefId]: any } = { [refId in RefId]: any }
        > = T
    }

    /** @summary Base schema for types that are needed for infering request types. */
    export namespace path {

        export type Object<PathId extends string = any> = {
            [pathId in PathId]: {
                item: Item
                operations: OperationMap
            }
        }

        export type Item<RequestParams extends ItemRequestParams<any, any, any> = any> = {
            requestParams: RequestParams
        }

        export type OperationMap<HttpMethod extends specification.HttpMethod = any> = {
            [methodId in HttpMethod]: path.Operation<any,any>
        }
                
        export type Operation<
            RequestParams extends OperationRequestParams<any, any, any, any, any>,
            ResponseObject extends response.Map<any>
        > = {
            requestParams: RequestParams
            responseObject: ResponseObject
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
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>
            > = T extends { path: infer pathObject extends path.Object<PathId> }
            ? pathObject[PathId] extends {
                item: path.Item<infer itemRequestParams>,
                operations: infer operationMap extends path.OperationMap<HttpMethod>  
            }
            ? operationMap[HttpMethod] extends path.Operation<
                infer operationRequestParams,
                infer responseObject
            >
            ? {
                requestParams: itemRequestParams & operationRequestParams
                responseObject: responseObject
            }
            : never
            : never
            : never
    
        
        export type Parameter<T extends
            | serialization.PathSerialization
            | serialization.HeaderSerialization
            | serialization.QuerySerialization
        > = {
            /** For defining non-default serialization logics.*/
            serialization: T | serialization.MediaSerialization
            value: component.Any
        }
     
        export type PathParameter = Parameter<serialization.PathSerialization> 
        export type HeaderParameter = Parameter<serialization.HeaderSerialization>
        export type QueryParameter = Parameter<serialization.QuerySerialization>

        type ItemRequestParams<
            PathParams extends Record<string,PathParameter> | undefined = any,
            Headers extends Record<string,HeaderParameter> | undefined = any,
            Query extends Record<string, QueryParameter> | undefined = any
        > = utility.Intersect<
            | PathParams extends Record<string, PathParameter> ? { headers: Headers } : never
            | Headers extends Record<string, HeaderParameter> ? { headers: Headers } : never
            | Query extends Record<string, QueryParameter> ? { query: Query } : never
            >
        
        type OperationRequestParams<
            AuthRequirements extends auth.Requirements | undefined,
            PathParams extends Record<string, PathParameter> | undefined,
            Headers extends Record<string, HeaderParameter> | undefined,
            Query extends Record<string, QueryParameter> | undefined,
            Body extends component.Media | undefined
        > = utility.Intersect<
            | AuthRequirements extends auth.Requirements ? { security: AuthRequirements } : never
            | PathParams extends Record<string, PathParameter> ? { pathParams: PathParams } : never
            | Headers extends Record<string, HeaderParameter> ? { headers: Headers } : never
            | Query extends Record<string, QueryParameter> ? { query: Query } : never
            | Body extends component.Media ? { body: Body } : never
        >

    }

    /** @summary asd */
    export namespace settings {
        export type Default<SerializedRequestBody,RawResponseData> = {
            host: string
            serialization: {
                path: {
                    constants: {
                        trueString: 'true',
                        falseString: 'false',
                        nullString: 'null',
                        undefinedString: ''
                    },
                    default: {
                        style: 'simple',
                        explode: false,
                    },
                    defaultSerializer: serialization.PathParameterSerializer
                },
                header: {
                    constants: {
                        trueString: 'true',
                        falseString: 'false',
                        nullString: 'null',
                        undefinedString: ''
                    },
                    default: {
                        explode: false,
                    }
                    defaultSerializer: serialization.HeaderParameterSerializer
                },
                query: {
                    constants: {
                        trueString: 'true',
                        falseString: 'false',
                        nullString: 'null',
                        undefinedString: '',
                        prefix: '?',
                        seperator: '&'
                    },
                    default: {
                        style: 'form',
                        explode: true,
                        allowReserved: false
                    }
                    defaultSerializer: serialization.QueryParameterSerializer
                }
                requestBody: {
                    serializer: serialization.RequestBodySerializer<SerializedRequestBody>
                }
            }
            deserialization: {
                responseHeaders: {
                    default: {
                        explode: false,
                    },
                    deserializer: deserializer.ResponseHeaderDeserializer
                },
                responseData: {
                    defaultMediaType: 'application/json',
                    deserializer: deserializer.ResponseDataDeserializer<RawResponseData>
                }
            }
        }

        export type Object<
            SerializedRequestBody,
            RawResponseData,
            Serialization extends settings.Serialization<SerializedRequestBody> = settings.Serialization<SerializedRequestBody>,
            Deserialization extends settings.Deserialization<RawResponseData> = settings.Deserialization<RawResponseData>
        > = {
            host: string,
            serialization: Serialization
            deserialization: Deserialization
        }

        export type Serialization<
            SerializedRequestBody,
            Path extends PathSerialization = PathSerialization,
            Cookie extends CookieSerialization = CookieSerialization,
            Header extends HeaderSerialization = HeaderSerialization,
            Query extends QuerySerialization = QuerySerialization,
            RequestBody extends RequestBodySerialization<SerializedRequestBody> = RequestBodySerialization<SerializedRequestBody>
        > = {
            path: Path
            cookie: Cookie
            header: Header
            query: Query
            requestBody: RequestBody
        }

        export type Deserialization<
            RawResponseData,
            ResponseHeaders extends ResponseHeadersDeserialization = ResponseHeadersDeserialization,
            ResponseData extends ResponseDataDeserialization<RawResponseData> = ResponseDataDeserialization<RawResponseData>
        > =  {
            responseHeaders: ResponseHeaders
            responseData: ResponseData
        }

        export type PathSerialization<
            DefaultSerialization extends serialization.PathSerialization = serialization.PathSerialization,
        > = {
            constants: serialization.ValueConstants
            default: DefaultSerialization
            defaultSerializer: serialization.PathParameterSerializer
            mediaSerializer?: serialization.MediaParameterSerializer
        }
        
            export type CookieSerialization<
            DefaultSerialization extends serialization.HeaderSerialization = serialization.HeaderSerialization,
        > = {
            constants: serialization.ValueConstants
            default: DefaultSerialization
            defaultSerializer: serialization.HeaderParameterSerializer
            mediaSerializer?: serialization.MediaParameterSerializer
        }

        
        export type HeaderSerialization<
            DefaultSerialization extends serialization.HeaderSerialization = serialization.HeaderSerialization,
        > = {
            constants: serialization.ValueConstants
            default: DefaultSerialization
            defaultSerializer: serialization.HeaderParameterSerializer
            mediaSerializer?: serialization.MediaParameterSerializer
        }

        export type QuerySerialization<
            DefaultSerialization extends serialization.QuerySerialization = serialization.QuerySerialization,
        > = {
            constants: serialization.QueryConstants
            default: DefaultSerialization
            defaultSerializer: serialization.QueryParameterSerializer
            mediaSerializer?: serialization.MediaParameterSerializer
        }
        
        export type RequestBodySerialization<
            SerializedRequestBody,
            serializer extends serialization.RequestBodySerializer<SerializedRequestBody> = serialization.RequestBodySerializer<SerializedRequestBody>,
        > = {
            serializer: serializer
        }
        
        export type ResponseHeadersDeserialization<
            DefaultSerialization extends serialization.HeaderSerialization | serialization.MediaSerialization
                = serialization.HeaderSerialization | serialization.MediaSerialization,
            SerializationOverrides extends Record<string, serialization.HeaderSerialization | serialization.MediaSerialization>
                = Record<string, serialization.HeaderSerialization | serialization.MediaSerialization>
        > = {
            default: DefaultSerialization
            deserializer: deserializer.ResponseHeaderDeserializer
            serializationOverrides?: SerializationOverrides
        } 
        
        export type ResponseDataDeserialization<
            RawResponseData,
            DefaultMediaType extends specification.MediaType = specification.MediaType,
            Deserializer extends deserializer.ResponseDataDeserializer<RawResponseData>
                = deserializer.ResponseDataDeserializer<RawResponseData>
        > = {
            defaultMediaType: DefaultMediaType
            deserializer: Deserializer
        } 

        export type ExtractResponseOptions<
            T extends Definition,
            PathId extends adapter.path.Id<T>,
            HttpMethod extends adapter.path.HttpMethod<T, PathId>
        > = path.Context<T, PathId, HttpMethod> extends { responseObject: infer responseObject extends response.Map<any> }
            ? {
                headers?: Record<string, serialization.HeaderSerialization>
                data?: specification.MediaType
            }
            : never
        
        export type ResponseOptions = {
            headers?: Record<string, Partial<serialization.HeaderSerialization> | serialization.MediaSerialization>
            data?: specification.MediaType
        }
    }

    /** @summary Intellisence types for request paramters. */
    export namespace request {

        export type ExtractParams<
            T extends Definition,
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>,
            Settings extends settings.Serialization<any>
        > = path.Context<T, PathId, HttpMethod> extends { requestParams: infer requestParams }
            ? utility.Intersect<
                | (requestParams extends { security: infer security } ? { security: security } : never)
                | (requestParams extends { path: infer pathParams } ? ExtractPathParams<pathParams, Settings['path']> : never)
                | (requestParams extends { cookie: infer headers } ? ExtractHeaderParams<headers, Settings['cookie']> : never)
                | (requestParams extends { headers: infer headers } ? ExtractHeaderParams<headers, Settings['header']> : never)
                | (requestParams extends { query: infer query } ? ExtractQueryParams<query, Settings['query']> : never)
                | (requestParams extends { body: infer body } ? {body: body} :never)
            >
            : never
        
        export type PathParams = Record<string, Param<serialization.PathSerialization>>
        export type HeaderParams = Record<string, Param<serialization.HeaderSerialization>>
        export type QueryParams = Record<string, Param<serialization.QuerySerialization>>

        export type Params = {
            security?: auth.Requirements
            path?: PathParams
            headers?: HeaderParams
            query?: QueryParams
            body?: component.Media
        }

        export type Param<T extends serialization.ParameterSerialization> = component.Any | {
            __serialization__: T | serialization.MediaSerialization
            value: component.Any
        }

        type ExtractPathParams<
            T,
            Settings extends settings.PathSerialization
        > = 
            Settings extends { default: infer defaultSerialization extends serialization.PathSerialization }
            ? {
                path: {
                    [pathId in keyof T]: T[pathId] extends {
                        serialization: infer serialization extends serialization.ParameterSerialization
                        value: infer value
                    }
                    ? serialization extends defaultSerialization
                    ? value
                    : {
                        /** 
                         * Custom parameter serialization if this parameter needs different serialization than in 
                         * `adapter.settings.Object[serialization][path][default]` setting. 
                         * Configure this setting to match your most common path parameter serialization method for this API.
                         **/
                        __serialization__: utility.Intersect<
                            | (
                                serialization extends { mediaType: infer mediaType extends specification.MediaType }
                                ? { mediaType: mediaType } : never
                            )
                            | (
                                serialization extends { style: infer style }
                                ? defaultSerialization extends { style: style } ? never :{ style: style } : never
                            )
                            | (
                                serialization extends { explode: infer explode }
                                ?  defaultSerialization extends { explode: explode } ? never :{ explode: explode } : never
                            )
                        >
                        value: value
                    }
                    : never
                }
            }
            : never
        
        type ExtractHeaderParams<
            T,
            Settings extends settings.HeaderSerialization
        > = Settings extends { default: infer defaultSerialization extends serialization.HeaderSerialization }
            ? {
                headers: {
                    [headerId in keyof T]: T[headerId] extends infer headerParam
                    ? headerParam extends {
                        serialization: defaultSerialization
                        value: infer value
                    }
                    ? value 
                    : headerParam extends {
                        serialization: infer serialization
                        value: infer value
                    }
                    ? {
                        /** 
                         * Custom parameter serialization if this parameter needs different serialization than in 
                         * `adapter.settings.Object[serialization][header][default]` setting. 
                         * Configure this setting to match your most common header parameter serialization method for this API.
                         **/
                        __serialization__: utility.Intersect<
                            | (
                                serialization extends { mediaType: infer mediaType extends specification.MediaType }
                                ? { mediaType: mediaType } : never
                            )
                            | (
                                serialization extends { explode: infer explode }
                                ?  defaultSerialization extends { explode: explode } ? never :{ explode: explode } : never
                            )
                        >
                        value: value
                    }
                    : never
                    : never
                }
            }
            : never
        
       type ExtractQueryParams<
            T,
            Settings extends settings.QuerySerialization
        > = Settings extends { default: infer defaultSerialization extends serialization.QuerySerialization }
            ? {
                query: {
                    [queryId in keyof T]: T[queryId] extends infer headerParam
                    ? headerParam extends {
                        serialization: defaultSerialization
                        value: infer value
                    }
                    ? value 
                    : headerParam extends {
                        serialization: infer serialization
                        value: infer value
                    }
                    ? {
                        /** 
                         * Custom parameter serialization if this parameter needs different serialization than in 
                         * `adapter.settings.Object[serialization][query][default]` setting. 
                         * Configure this setting to match your most common query parameter serialization method for this API.
                         **/
                        __serialization__: utility.Intersect<
                            | (
                                serialization extends { mediaType: infer mediaType extends specification.MediaType }
                                ? { mediaType: mediaType } : never
                            )
                            | (
                                serialization extends { style: infer style }
                                ? defaultSerialization extends { style: style }
                                ? never : { style: style } : never
                            )
                            | (
                                serialization extends { explode: infer explode }
                                ? defaultSerialization extends { explode: explode }
                                ? never : { explode: explode } : never
                            )
                            | (
                                serialization extends { allowReserved: infer allowReserved }
                                ? defaultSerialization extends { allowReserved: allowReserved }
                                ? never : { allowReserved: allowReserved } : never
                            )
                        >
                        value: value
                    }
                    : never
                    : never
                }
            }
            : never
    }

     /** @summary Intellisence types for response paramters. */
    export namespace response
    {
        export type Object<
            NS extends string,
            T extends Definition,
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>,
            ResponseOptions extends settings.ExtractResponseOptions<T,PathId, HttpMethod>,
            Settings extends settings.Deserialization<any,any>
        > = path.Context<T, PathId, HttpMethod> extends {responseObject: infer responseObject extends response.Map<any>}
            ? utility.Intersect<{
                [statusCode in keyof responseObject]: statusCode extends 'default'
                ? {
                    status: number,
                    code: response.StatusLabel<NS, keyof response.HttpStatusLabels>,
                    headers: response.Headers<responseObject[statusCode], ResponseOptions, Settings>,
                    data: response.Data<responseObject[statusCode], ResponseOptions, Settings>,
                }
                : statusCode extends `${infer code extends number}`
                ? {
                    status: code,
                    code: response.StatusLabel<NS, code>,
                    headers: response.Headers<responseObject[statusCode], ResponseOptions, Settings>,
                    data: response.Data<responseObject[statusCode], ResponseOptions, Settings>,
                }
                : never
            }> extends infer responses ? responses[keyof responses]: never
            : never

        export type Result<RawResponseData> = {
            statusCode: number,
            headers: Record<string, string>
            data: RawResponseData
        }

        export type Headers<
            ResponseItem,
            ResponseOptions extends settings.ExtractResponseOptions<any, any, any>,
            Settings extends settings.Deserialization<any, any>
        > = ResponseItem extends { headers: infer headers extends object }
            ? headers extends Record<infer headerId, any>
            ? (
                (ResponseOptions extends { headers: infer desentralization } ? keyof desentralization : never) extends infer desentralizationIds
                ? (Settings extends { headerSerializations: infer settings } ? Exclude<keyof settings, desentralizationIds> : never) extends infer settingsIds
                ? utility.Intersect<
                    | (desentralizationIds extends headerId ? { [headerName in desentralizationIds]: headers[headerName] } : never)
                    | (settingsIds extends headerId ? { [headerName in settingsIds]: headers[headerName] } : never)
                    | (
                        /** standard deserialization */
                        Exclude<headerId, desentralizationIds | settingsIds> extends infer _headerId extends headerId
                        ? {
                            [headerName in _headerId]:
                                headers[headerName] extends (utility.Primitive | undefined)
                                    ? headers[headerName]
                                    : string
                        }
                        : never
                    )
                    | { [untypedHeaders: string]: utility.Primitive | undefined }
                >
                : never
                : never
            )  
            : never
            : { [untypedHeaders: string]: utility.Primitive | undefined }
        
        export type Data<
            ResponseItem,
            ResponseOptions extends settings.ExtractResponseOptions<any, any, any>,
            Settings extends settings.Deserialization<any,any>
        > =
            ResponseItem extends { data: infer data extends component.Media<infer _mediaType> }
            ? (
                ResponseOptions extends { data: infer mediaType extends _mediaType }
                    ? data extends component.Media<mediaType, infer value>
                    ? value: never
                : Settings extends { defaultMediaType: infer mediaType extends _mediaType }
                    ? data extends component.Media<mediaType, infer value>
                    ? value : never
                : never
            )
            : undefined

        export type Generic = {
            code: string,
            status: number,
            headers: Record<string, unknown>,
            data: component.Any
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
            Headers extends { [headerId in string]: component.Any } = any,
            Data extends component.Media = any
        > = {
            headers?: Headers
            data?: Data
        }
        
        export type Map<T extends {
            default: Item
            [statusCode: number]: Item
        }> = T

        export type HttpStatusLabels = import('../src/enums').HttpStatusLabels;
    }
}