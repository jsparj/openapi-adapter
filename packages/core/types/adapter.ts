import type { specification } from './specification';
import type { utility } from './utility';

export namespace adapter
{
    /** @summary */
    export type Definition<T extends { auth: auth.Object, path: path.Object } = { auth: auth.Object, path: path.Object }> = T

    /** @summary */
    export interface IFetch<
        NS extends string,
        T extends Definition,
        Settings extends settings.Object<any, any>
    >{
        /**
         * This action lets you do requests against `adapter.Definition` that you have provided.
         * <para>Request parameters and and response have full support for intellisence and matches perfectly to the source api definition.</para>
         * @param pathId Available pathIds to provided OpenApi 3.x path map in `paths/*`
         * @param method Available HttpMethods for provided `pathId`
         * @param requestParams Request parameters for provided          `pathId` and `method`
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
            Schemes extends auth.Schemes = auth.Schemes,
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

        export type Schemes<U extends {[authId in string]: Item } = {[authId in string]: Item }> = U

        export type Item = {
            type: specification.SecuritySchemeType
            token?: Token
            mutualTLS?: MutualTLS
        }

        export type Token<
            In extends "query" | "header" | "cookie" = "query" | "header" | "cookie",
            Name extends string = string
        > = {
            in: In
            name: Name
            value: string
        }

        export type MutualTLS =  tls.SecureContextOptions | {
            /**
             * Only supported in browser environments.
             */
            credentialSource: "include" | "omit" | "same-origin"
        }

        export type Requirements<Requirements extends readonly string[] = readonly string[]> = Requirements

        export namespace tls {
            export type SecureVersion = "TLSv1.3" | "TLSv1.2" | "TLSv1.1" | "TLSv1";

            export interface KeyObject {
                /**
                 * Private keys in PEM format.
                 */
                pem: string
                /**
                 * Optional passphrase.
                 */
                passphrase?: string 
            }

            export interface PxfObject {
                /**
                 * PFX or PKCS12 encoded private key and certificate chain.
                 */
                buf: string
                /**
                 * Optional passphrase.
                 */
                passphrase?: string 
            }
        
            /**
             * Only supported with `@openapi-adapter/node-fetch`
             */
            export interface SecureContextOptions {
                /**
                 * If set, this will be called when a client opens a connection using the ALPN extension.
                 * One argument will be passed to the callback: an object containing `servername` and `protocols` fields,
                 * respectively containing the server name from the SNI extension (if any) and an array of
                 * ALPN protocol name strings. The callback must return either one of the strings listed in `protocols`,
                 * which will be returned to the client as the selected ALPN protocol, or `undefined`,
                 * to reject the connection with a fatal alert. If a string is returned that does not match one of
                 * the client's ALPN protocols, an error will be thrown.
                 * This option cannot be used with the `ALPNProtocols` option, and setting both options will throw an error.
                 */
                ALPNCallback?: ((arg: { servername: string; protocols: string[] }) => string | undefined) 
                /**
                 * Optionally override the trusted CA certificates. Default is to trust
                 * the well-known CAs curated by Mozilla. Mozilla's CAs are completely
                 * replaced when CAs are explicitly specified using this option.
                 */
                ca?: string | Array<string> 
                /**
                 *  Cert chains in PEM format. One cert chain should be provided per
                 *  private key. Each cert chain should consist of the PEM formatted
                 *  certificate for a provided private key, followed by the PEM
                 *  formatted intermediate certificates (if any), in order, and not
                 *  including the root CA (the root CA must be pre-known to the peer,
                 *  see ca). When providing multiple cert chains, they do not have to
                 *  be in the same order as their private keys in key. If the
                 *  intermediate certificates are not provided, the peer will not be
                 *  able to validate the certificate, and the handshake will fail.
                 */
                cert?: string | Array<string> 
                /**
                 *  Colon-separated list of supported signature algorithms. The list
                 *  can contain digest algorithms (SHA256, MD5 etc.), public key
                 *  algorithms (RSA-PSS, ECDSA etc.), combination of both (e.g
                 *  'RSA+SHA384') or TLS v1.3 scheme names (e.g. rsa_pss_pss_sha512).
                 */
                sigalgs?: string 
                /**
                 * Cipher suite specification, replacing the default. For more
                 * information, see modifying the default cipher suite. Permitted
                 * ciphers can be obtained via tls.getCiphers(). Cipher names must be
                 * uppercased in order for OpenSSL to accept them.
                 */
                ciphers?: string 
                /**
                 * Name of an OpenSSL engine which can provide the client certificate.
                 */
                clientCertEngine?: string 
                /**
                 * PEM formatted CRLs (Certificate Revocation Lists).
                 */
                crl?: string | Array<string> 
                /**
                 * `'auto'` or custom Diffie-Hellman parameters, required for non-ECDHE perfect forward secrecy.
                 * If omitted or invalid, the parameters are silently discarded and DHE ciphers will not be available.
                 * ECDHE-based perfect forward secrecy will still be available.
                 */
                dhparam?: string 
                /**
                 * A string describing a named curve or a colon separated list of curve
                 * NIDs or names, for example P-521:P-384:P-256, to use for ECDH key
                 * agreement. Set to auto to select the curve automatically. Use
                 * crypto.getCurves() to obtain a list of available curve names. On
                 * recent releases, openssl ecparam -list_curves will also display the
                 * name and description of each available elliptic curve. Default:
                 * tls.DEFAULT_ECDH_CURVE.
                 */
                ecdhCurve?: string 
                /**
                 * Attempt to use the server's cipher suite preferences instead of the
                 * client's. When true, causes SSL_OP_CIPHER_SERVER_PREFERENCE to be
                 * set in secureOptions
                 */
                honorCipherOrder?: boolean 
                /**
                 * Private keys in PEM format. PEM allows the option of private keys
                 * being encrypted. Encrypted keys will be decrypted with
                 * options.passphrase. Multiple keys using different algorithms can be
                 * provided either as an array of unencrypted key strings or buffers,
                 * or an array of objects in the form {pem: <string|buffer>[,
                 * passphrase: <string>]}. The object form can only occur in an array.
                 * object.passphrase is optional. Encrypted keys will be decrypted with
                 * object.passphrase if provided, or options.passphrase if it is not.
                 */
                key?: string | Array<string | KeyObject> 
                /**
                 * Name of an OpenSSL engine to get private key from. Should be used
                 * together with privateKeyIdentifier.
                 */
                privateKeyEngine?: string 
                /**
                 * Identifier of a private key managed by an OpenSSL engine. Should be
                 * used together with privateKeyEngine. Should not be set together with
                 * key, because both options define a private key in different ways.
                 */
                privateKeyIdentifier?: string 
                /**
                 * Optionally set the maximum TLS version to allow. One
                 * of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
                 * `secureProtocol` option, use one or the other.
                 * **Default:** `'TLSv1.3'`, unless changed using CLI options. Using
                 * `--tls-max-v1.2` sets the default to `'TLSv1.2'`. Using `--tls-max-v1.3` sets the default to
                 * `'TLSv1.3'`. If multiple of the options are provided, the highest maximum is used.
                 */
                maxVersion?: SecureVersion 
                /**
                 * Optionally set the minimum TLS version to allow. One
                 * of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
                 * `secureProtocol` option, use one or the other.  It is not recommended to use
                 * less than TLSv1.2, but it may be required for interoperability.
                 * **Default:** `'TLSv1.2'`, unless changed using CLI options. Using
                 * `--tls-v1.0` sets the default to `'TLSv1'`. Using `--tls-v1.1` sets the default to
                 * `'TLSv1.1'`. Using `--tls-min-v1.3` sets the default to
                 * 'TLSv1.3'. If multiple of the options are provided, the lowest minimum is used.
                 */
                minVersion?: SecureVersion 
                /**
                 * Shared passphrase used for a single private key and/or a PFX.
                 */
                passphrase?: string 
                /**
                 * PFX or PKCS12 encoded private key and certificate chain. pfx is an
                 * alternative to providing key and cert individually. PFX is usually
                 * encrypted, if it is, passphrase will be used to decrypt it. Multiple
                 * PFX can be provided either as an array of unencrypted PFX buffers,
                 * or an array of objects in the form {buf: <string|buffer>[,
                 * passphrase: <string>]}. The object form can only occur in an array.
                 * object.passphrase is optional. Encrypted PFX will be decrypted with
                 * object.passphrase if provided, or options.passphrase if it is not.
                 */
                pfx?: string | Array<string | PxfObject> 
                /**
                 * Optionally affect the OpenSSL protocol behavior, which is not
                 * usually necessary. This should be used carefully if at all! Value is
                 * a numeric bitmask of the SSL_OP_* options from OpenSSL Options
                 */
                secureOptions?: number  // Value is a numeric bitmask of the `SSL_OP_*` options
                /**
                 * Legacy mechanism to select the TLS protocol version to use, it does
                 * not support independent control of the minimum and maximum version,
                 * and does not support limiting the protocol to TLSv1.3. Use
                 * minVersion and maxVersion instead. The possible values are listed as
                 * SSL_METHODS, use the function names as strings. For example, use
                 * 'TLSv1_1_method' to force TLS version 1.1, or 'TLS_method' to allow
                 * any TLS protocol version up to TLSv1.3. It is not recommended to use
                 * TLS versions less than 1.2, but it may be required for
                 * interoperability. Default: none, see minVersion.
                 */
                secureProtocol?: string 
                /**
                 * Opaque identifier used by servers to ensure session state is not
                 * shared between applications. Unused by clients.
                 */
                sessionIdContext?: string 
                /**
                 * The number of seconds after which a TLS session created by the
                 * server will no longer be resumable. See Session Resumption for more
                 * information. Default: 300.
                 */
                sessionTimeout?: number 
            }
        }
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
            requestParams: RequestParams
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

        export type Id<T> =
            T extends { path: Object<infer pathId> }
            ? pathId
            : never
        
        export type HttpMethod<T, PathId extends Id<T>> =
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
            path?: Record<string, PathParameter>
            header?: Record<string, HeaderParameter>
            cookie?: Record<string, CookieParameter>
            query?: Record<string, QueryParameter>
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
                | (requestParams extends {security: infer security}? {security: security } : never)
                | (requestParams extends {body: infer body}        ? {body: body} : never)
                | (requestParams extends {path: infer pathParams}  ? keyof pathParams extends never? never : {path: ExtractPathParams<pathParams,Settings['path']>} : never)
                | (requestParams extends {query: infer query}      ? keyof query extends      never? never : {query: ExtractQueryParams<query, Settings['query']>}: never)
                | (requestParams extends {cookie: infer cookie}    ? keyof cookie extends     never? never : {cookie:ExtractCookieParams<cookie, Settings['cookie']>} : never)
                | (requestParams extends {header: infer headers}   ? keyof headers extends    never? never : {header:ExtractHeaderParams<headers, Settings['header']>} : never)
            >
            :{}

            export type PathParams = Record<string, Param<serialization.PathSerialization>>
            export type CookieParams = Record<string, Param<serialization.CookieSerialization>>
            export type HeaderParams = Record<string, Param<serialization.HeaderSerialization>>
            export type QueryParams = Record<string, Param<serialization.QuerySerialization>>

            export type Params = {
            security?: auth.Requirements
            path?: PathParams
            cookie?: CookieParams
            header?: HeaderParams
            query?: QueryParams
            body?: component.Media
        }

        export type Param<T extends serialization.ParameterSerialization> = component.Any | {
            __serialization__: T | serialization.MediaSerialization
            value: component.Any
        }

        type ExtractPathParams<T,Settings extends settings.PathSerialization> = 
            Settings extends { default: infer defaultSerialization }
            ? {
                [pathParamId in keyof T]: T[pathParamId] extends infer pathParam?
                pathParam extends { 
                    serialization: defaultSerialization
                    value: infer value
                }
                ? value
                : pathParam extends {
                    serialization: infer serialization
                    value: infer value
                }
                ? {
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
                                ? defaultSerialization extends { style: style } 
                                    ? never :{ style: style } 
                                : never
                        )
                        | (
                            serialization extends { explode: infer explode }
                                ? defaultSerialization extends { explode: explode } 
                                    ? never 
                                    :{ explode: explode } 
                                : never
                        )
                    >
                    value: value
                }
                : never
                : never            
            }
            : never

        type ExtractCookieParams<T,Settings extends settings.CookieSerialization> = 
            Settings extends { default: infer defaultSerialization}
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
        
        type ExtractHeaderParams<T,Settings extends settings.HeaderSerialization> = 
            Settings extends { default: infer defaultSerialization extends serialization.HeaderSerialization }
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
                Settings extends { responseData: infer responseDataSettings extends settings.ResponseDataDeserialization<any> }
                    ? responseDataSettings extends { defaultMediaType: infer mediaType extends specification.MediaType }
                        ? data extends component.Media<mediaType, infer value>
                            ? value 
                            : never
                        : never
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