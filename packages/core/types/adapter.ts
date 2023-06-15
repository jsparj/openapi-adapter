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
        requestBody(body: component.Media): Promise<SerializedRequestBody>
    }

    export interface IDeserializer<RawResponseContent> {
        responseContent(
            mediaType: specification.MediaType,
            data: RawResponseContent,
        ): Promise<adapter.component.Any>
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
    } ? utility.Intersect<{
            [statusCode in keyof responseObject]: statusCode extends 'default'
            ? {
                status: number,
                code: response.StatusLabel<NS, keyof response.HttpStatusLabels>,
                headers: response.Headers<responseObject[statusCode], Deserialization, Settings>,
                data: response.Data<responseObject[statusCode], Deserialization, Settings>,
            }
            : statusCode extends `${infer code extends number}`
            ? {
                status: code,
                code: response.StatusLabel<NS, code>,
                headers: response.Headers<responseObject[statusCode], Deserialization, Settings>,
                data: response.Data<responseObject[statusCode], Deserialization, Settings>,
            }
            : never
        }> extends infer responses ? responses[keyof responses]: never
        : never
    export namespace serialization {
        export type Settings<SerializedRequestBody> = {
            pathString: PathStringOptions
            queryString: QueryStringOptions 
            header: HeaderOptions
            requestBody: RequestBodyOptions<SerializedRequestBody>
        }

        export type ParameterContentSerializer<ReturnType> = (
            mediaType: specification.MediaType,
            key: string,
            value: component.Any
        ) => ReturnType

        export type ContentSerializer<ReturnType> = (
            mediaType: specification.MediaType,
            value: component.Any
        ) => ReturnType

        export type PathStringOptions = {
            constants: ValueConstants
            defaultSerialization: serialization.PathSerialization
            contentSerializer?: ParameterContentSerializer<string>
        }

        export type QueryStringOptions = {
            constants: QueryConstants
            defaultSerialization: serialization.QuerySerialization
            contentSerializer?: ParameterContentSerializer<string>
        }

        export type HeaderOptions = {
            constants: ValueConstants
            defaultSerialization: serialization.HeaderSerialization
            contentSerializer?: ParameterContentSerializer<string>
        }

        export type RequestBodyOptions<SerializedRequestBody> = {
            defaultSerializer: ContentSerializer<Promise<SerializedRequestBody>>
            serializerOverrides?: {
                [mediaType in specification.MediaType]?: (body: component.Any) => Promise<SerializedRequestBody>;
            }
        }

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

    export namespace deserializer {
        export type Settings<RawResponseContent> = {
            responseContent: {
                defaultDeserializer: (content: RawResponseContent, mediaType: specification.MediaType) => Promise<component.Any>
                deserializerOverrides?: {
                    [mediaType in specification.MediaType]?: (content: RawResponseContent) => Promise<component.Any>
                }
            } 
        }
    }
    
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
            Body extends component.Media
        > = utility.Intersect<
            | AuthRequirements extends auth.Requirements ? { security: AuthRequirements } : never
            | PathParams extends Record<string, PathParameter> ? { pathParams: PathParams } : never
            | Headers extends Record<string, HeaderParameter> ? { headers: Headers } : never
            | Query extends Record<string, QueryParameter> ? { query: Query } : never
            | Body extends component.Media ? { body: Body } : never
        >
        export type Parameter<T extends
            | serialization.PathSerialization
            | serialization.HeaderSerialization
            | serialization.QuerySerialization
        > = {
            /** For defining non-default serialization logics.*/
            __serialization__: Partial<T> | serialization.MediaSerialization
            value: component.Any
        }
        | component.Any

        export type PathParameter = Parameter<serialization.PathSerialization> 
        export type HeaderParameter = Parameter<serialization.HeaderSerialization>
        export type QueryParameter = Parameter<serialization.QuerySerialization>
    }

    export namespace response {
        export type Settings = {
            defaultDataMediaType: specification.MediaType
            headerSerializations?: Record<string, serialization.HeaderSerialization>
        }

        export type Deserialization<
            T extends Definition,
            PathId extends adapter.path.Id<T>,
            HttpMethod extends adapter.path.HttpMethod<T, PathId>
        > = path.Context<T, PathId, HttpMethod> extends { responseObject: infer responseObject extends Object<any> }
            ? {
                headers?: Record<string, serialization.HeaderSerialization>
                data?: specification.MediaType
            }
            : never
        
        export type Result = {
            statusCode: number,
            headers: Record<string, unknown>
            data: unknown
        }

        export type Headers<
            ResponseItem,
            Deserialization extends response.Deserialization<any, any, any>,
            Settings extends response.Settings
        > = ResponseItem extends { headers: infer headers extends object }
            ? headers extends Record<infer headerId, any>
            ? (
                (Deserialization extends { headers: infer desentralization } ? keyof desentralization : never) extends infer desentralizationIds
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
            Deserialization extends response.Deserialization<any, any, any>,
            Settings extends response.Settings
        > =
            ResponseItem extends { data: infer data extends component.Media<infer _mediaType> }
            ? (
                Deserialization extends { data: infer mediaType extends _mediaType }
                    ? data extends component.Media<mediaType, infer value>
                    ? value: never
                : Settings extends { defaultDataMediaType: infer mediaType extends _mediaType }
                    ? data extends component.Media<mediaType, infer value>
                    ? value : never
                : never
            )
            : undefined

        export type Generic = {
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
            Headers extends { [headerId in string]: component.Any } = any,
            Data extends component.Media = any
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