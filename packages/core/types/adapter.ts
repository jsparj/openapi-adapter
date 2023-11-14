import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter
{
    /** @summary */
    export type Definition<T extends { auth: auth.Object, path: path.Object } = any> = T

    /** @summary */
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
        >(
            pathId: PathId,
            method: HttpMethod,
            requestParams: RequestParams,
        ): Promise<response.Object<
            NS,
            T,
            PathId,
            HttpMethod,
            Settings['deserialization']
        >>
    }

    /** @summary */
    export interface IAuthorization<T extends Definition> {
        initializeAuth(authData: auth.RequiredAuthData<T>): void
        updateAuthData(authData: auth.OptionalAuthData<T>,): void
    }

    /** @summary */
    export interface ISerializer<SerializedRequestBody> {
        pathString(pathId: string, parameters: request.PathParams | undefined): string
        cookieParameters(parameters: request.CookieParams | undefined): string | undefined
        headerParameters(parameters: request.HeaderParams | undefined): Record<string, string>
        queryString(parameters: request.QueryParams | undefined): string
        requestBody(body: component.Media|undefined): Promise<SerializedRequestBody>
    }

    /** @summary */
    export interface IDeserializer<RawResponseContent> {
        responseData(
            mediaType: specification.MediaType,
            data: RawResponseContent
        ): Promise<adapter.component.Any>
    }

    /** @summary */
    export interface ICookieManager {
        getCookie(name: string): string
        getAllCookies(): Record<string, string>
        setCookie(name: string, value: string): void
    }

    /** @summary Settings for OpenApiAdapter. */
    export namespace settings {
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
            ResponseData extends ResponseDataDeserialization<RawResponseData> = ResponseDataDeserialization<RawResponseData>
        > =  {
            responseData: ResponseData
        }
        
        export type ParameterSerialization<
            T extends serialization.ParameterSerialization,
            U extends serialization.Constants,
        > = {
            default: T
            constants: U
            defaultSerializer: serialization.ParameterSerializer<T,U>
            mediaSerializer?: serialization.MediaParameterSerializer
        }

        export type PathSerialization = ParameterSerialization<
            serialization.PathSerialization,
            serialization.ValueConstants
        >
        
        export type CookieSerialization = ParameterSerialization<
            serialization.CookieSerialization,
            serialization.CookieConstants
        >
        
        export type HeaderSerialization = ParameterSerialization<
            serialization.HeaderSerialization,
            serialization.ValueConstants
        >

        export type QuerySerialization = ParameterSerialization<
            serialization.QuerySerialization,
            serialization.QueryConstants
        >
        
        export type RequestBodySerialization<SerializedRequestBody> = {
          serializer: serialization.RequestBodySerializer<SerializedRequestBody>
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

        export type ResponseOptions = {
            responseData?: specification.MediaType
        }
    }

    /** @summary Types for ???*/
    export namespace serialization {
        export type ParameterSerializer<
            T extends ParameterSerialization,
            U extends ValueConstants | QueryConstants
        > = (
            key: string,
            value: component.Any,
            serialization: T,
            constants: U
        ) => string

        export type PathSerializer = ParameterSerializer<PathSerialization, ValueConstants>
        export type HeaderSerializer = ParameterSerializer<HeaderSerialization, ValueConstants>
        export type CookieSerializer = ParameterSerializer<CookieSerialization, CookieConstants>
        export type QuerySerializer = ParameterSerializer<QuerySerialization, QueryConstants>
        
        export type MediaParameterSerializer = (
            mediaType: specification.MediaType,
            key: string,
            value: component.Any
        ) => string

        export type RequestBodySerializer<SerializedRequestBody> = (
            mediaType: specification.MediaType,
            value: component.Any
        ) => Promise<SerializedRequestBody>

        export type Constants = ValueConstants | QueryConstants | CookieConstants

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

        export type CookieConstants = ValueConstants & {
            /** @default `; ` */
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

    /** @summary Types for ???*/
    export namespace deserializer
    {    
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

    /** @summary Types for authentication logics. */
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

        export type Schemes<U extends {[authId in string]: Item }> = U



        export type Item<
            T extends specification.SecuritySchemeType = specification.SecuritySchemeType,
        > = {
            /**
             * @full-support `apiKey`, `http`
             * @limited-support `oauth2`, `openIdConnect`: 
             * You will have to implement credential requests and refreshTokens yourself.
             */
            type: T
            token: Token
        }

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

    /** @summary Base schema for types that are needed for infering request types. */
    export namespace path {

        export type Object<PathId extends string = string> = {
            [pathId in PathId]: {
                item: Item
                operations: OperationMap
            }
        }

        export type Item<RequestParams = ItemRequestParams> = {
            requestParams: ItemRequestParams
        }

        export type OperationMap<HttpMethod extends specification.HttpMethod = any> = {
            [methodId in HttpMethod]: path.Operation<any,any>
        }
                
        export type Operation<
            RequestParams extends OperationRequestParams,
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
                requestParams: {
                    security: operationRequestParams extends { security: infer security } ? security : undefined
                    body: operationRequestParams extends { body: infer body } ? body : undefined
                    path:
                        & (itemRequestParams extends { path: infer pathParams } ? pathParams : {})
                        & (operationRequestParams extends { path: infer pathParams } ? pathParams : {})
                    header:
                        & (itemRequestParams extends { header: infer headerParams } ? headerParams : {})
                        & (operationRequestParams extends { header: infer headerParams } ? headerParams : {})
                    cookie:
                        & (itemRequestParams extends { cookie: infer cookieParams } ? cookieParams : {})
                        & (operationRequestParams extends { cookie: infer cookieParams } ? cookieParams : {})
                    query:
                        & (itemRequestParams extends { query: infer queryParams } ? queryParams : {})
                        & (operationRequestParams extends { query: infer queryParams } ? queryParams : {})
                } 
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
        export type CookieParameter = Parameter<serialization.CookieSerialization> 
        export type QueryParameter = Parameter<serialization.QuerySerialization>

        export type ItemRequestParams = {
            //path: Record<string, PathParameter>
            //header: Record<string, HeaderParameter>
            //cookie: Record<string, CookieParameter>
            //query: Record<string, QueryParameter>
        }
        
        export type OperationRequestParams = {    
            path: Record<string, PathParameter>
            header: Record<string, HeaderParameter>
            cookie: Record<string, CookieParameter>
            query: Record<string, QueryParameter>
            security: auth.Requirements | undefined
            body: component.Media | undefined 
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
                | (requestParams extends { body: infer body } ? {body: body} : never)
            >
            & {
                path: requestParams extends { path: infer pathParams } ? ExtractPathParams<pathParams, Settings['path']> : undefined
                cookie: requestParams extends { cookie: infer headers } ? ExtractCookieParams<headers, Settings['cookie']> : undefined
                header: requestParams extends { header: infer headers } ? ExtractHeaderParams<headers, Settings['header']> : undefined
                query: requestParams extends { query: infer query } ? ExtractQueryParams<query, Settings['query']> : undefined
            }
            : never
        
        export type PathParams = Record<string, Param<serialization.PathSerialization>>
        export type CookieParams = Record<string, Param<serialization.CookieSerialization>>
        export type HeaderParams = Record<string, Param<serialization.HeaderSerialization>>
        export type QueryParams = Record<string, Param<serialization.QuerySerialization>>

        export type Params = {
            security?: auth.Requirements
            path?: PathParams
            cookies?: CookieParams
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
            : never

        type ExtractCookieParams<
            T,
            Settings extends settings.CookieSerialization
        > = Settings extends { default: infer defaultSerialization extends serialization.CookieSerialization }
            ? {
                [cookieId in keyof T]: T[cookieId] extends infer cookieParam
                ? cookieParam extends {
                    serialization: defaultSerialization
                    value: infer value
                }
                ? value 
                : cookieParam extends {
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
            : never
        
        type ExtractHeaderParams<
            T,
            Settings extends settings.HeaderSerialization
        > = Settings extends { default: infer defaultSerialization extends serialization.HeaderSerialization }
            ? {
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
            : never
        
       type ExtractQueryParams<
            T,
            Settings extends settings.QuerySerialization
        > = Settings extends { default: infer defaultSerialization extends serialization.QuerySerialization }
            ? {
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
            : never
    }

    /** @summary Intellisence types for response parameters. */
    export namespace response
    {
        export type Object<
            NS extends string,
            T extends Definition,
            PathId extends path.Id<T>,
            HttpMethod extends path.HttpMethod<T, PathId>,
            Settings extends settings.Deserialization<any,any>
        > = path.Context<T, PathId, HttpMethod> extends {responseObject: infer responseObject extends response.Map<any>}
            ? utility.Intersect<{
                [statusCode in keyof responseObject]: statusCode extends 'default'
                ? {
                    status: number,
                    code: response.StatusLabel<NS, keyof response.HttpStatusLabels>,
                    headers: response.Headers<responseObject[statusCode]>,
                    data: response.Data<responseObject[statusCode], Settings>,
                }
                : statusCode extends `${infer code extends number}`
                ? {
                    status: code,
                    code: response.StatusLabel<NS, code>,
                    headers: response.Headers<responseObject[statusCode]>,
                    data: response.Data<responseObject[statusCode], Settings>,
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
        > = ResponseItem extends { headers: infer headers extends object }
            ? headers extends Record<infer headerId, any>
            ? (
                utility.Intersect<
                    {
                        [headerName in headerId]: headers[headerName] extends string
                            ? headers[headerName]
                            : string
                    }
                    | { [untyped: string]: string | undefined }
                >
            )  
            : never
            : { [untyped: string]: string | undefined }
        
        export type Data<
            ResponseItem,
            Settings extends settings.Deserialization<any,any>
        > =
            ResponseItem extends { data: infer data extends component.Media<infer _mediaType> }
            ? (
                Settings extends { defaultMediaType: infer mediaType extends _mediaType }
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