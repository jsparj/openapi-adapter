import * as raw from './specification'
import { HttpStatus, HttpStatusLabels } from '../../enums'
import type { component, schema, header, parameter, requestBody, response as _response } from './component'
import type { path as _path } from './path'
import { DeepPartial, Digit, StringLength } from '../common'


export namespace openapi {

  

    export namespace adapter {


        /**
         * @param NS API Namespace
         * @param T `readonly` OpenAPIObject
         */
        export interface IFetch<NS extends string, T extends raw.OpenAPIObject> {
            /**
             * 
             * @param pathId 
             * @param method 
             * @param request
             * @throws {DOMException | TypeException} https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions
             * @throws {openapi.response.ValidationException} If response validation is not switched off
             */
            fetch<
                PathId extends keyof T['paths'] = keyof T['paths'],
                HttpMethod extends keyof T['paths'][PathId] = keyof T['paths'][PathId],
                Operation extends path.Operation<T, PathId, HttpMethod> = path.Operation<T, PathId, HttpMethod>
            >(
                pathId: PathId,
                method: HttpMethod,
                request: Operation['request']
            ): Promise<FetchResult<NS, T, PathId, HttpMethod, Operation>>
        }

        export type Settings<
            T extends raw.OpenAPIObject
        > = {
            host: string
            global: PathSettings
            pathOverrides: {
                [pathId in keyof T['paths']]?: DeepPartial<PathSettings>
            }
        }
        
        export type PathSettings = {
            useResponseValidatoon: boolean
            headers: Record<string, any>
            queries: Record<string, any> 
            requestInit: RequestInit
            formatters: settings.Formatters
            responseValidation: settings.ResponseValidation
        }
            

        export type FetchResult<
            NS extends string,
            T extends raw.OpenAPIObject,
            PathId extends keyof T['paths'],
            Method extends keyof T['paths'][PathId],
            Operation extends _path.Operation<T, PathId, Method>
        > = Operation['responses'] extends (infer responses)
            ? keyof responses extends (infer statusCode extends string | number)
            ? responses[statusCode & keyof responses] extends (infer res)
            ? res extends null
            ? {
                type: response.ResponseType<statusCode> 
                code: response.StatusCodeLabel<NS, statusCode>,
                response: Response
                headers: {},
                content: undefined,
            }
            : res extends { content?: any, headers?: any}
            ? {
                type: response.ResponseType<statusCode> 
                code: response.StatusCodeLabel<NS,statusCode>,
                response: Response
                headers: res['headers'],
                content: res['content'],
            }
            : never
            : never
            : never
            : never
 
        export namespace settings {
            export type Formatters = {
                header: (header: unknown, settings: HeaderFormatterSettings) => string
                query: (parameters: Record<string, unknown>, settings: QueryFormatterSettings) => string
                headerFormatterParams: { [headerKey: string]: HeaderFormatterSettings }
                queryFormatterParams: QueryFormatterSettings
            }

            export type HeaderFormatterSettings = {
                
            }

            export type QueryFormatterSettings = {
                undefinedValue: string
                nullValue: string
                numberFormatter: (value: number) => string
                bigintFormatter: (value: bigint) => string
                stringFormatter: (value: string) => string
                objectFormatter: (value: object) => string
                arrayFormatter: (value: unknown[]) => string
            }

            export type ResponseValidation = {
                
                responseValidator: validation.ResponseValidator
                headersValidator: validation.HeaderValidator
                contentValidator: validation.ContentValidator
                schemaValidator: validation.SchemaValidator
                
                header: {
                    default: validation.Resolution
                    override?: { [headerKey: string]: validation.Resolution }
                }
                content: {
                    default: validation.Resolution
                    schemaOverride?: { [schemaName: string]: validation.Resolution }
                }
            }
        }
    }

    export namespace response {

        export type Universal = {
            type: 'info' | 'success' | 'redirect' | 'unknown' | 'error:client' | 'error:server' 
            code: string,
            headers: Record<string, string>
            content: any,
            response: Response
        }

        export type StatusLabel<T extends number | string> = T extends keyof typeof HttpStatusLabels
            ? typeof HttpStatusLabels[T]
            : 'unknown' 
        
        export type ResponseType<StatusCode extends number | string> = `${StatusCode}` extends (infer code)
            ? code extends `1${Digit}${Digit}` ? 'info'
            : code extends `2${Digit}${Digit}` ? 'success'
            : code extends `3${Digit}${Digit}` ? 'redirect'
            : code extends `4${Digit}${Digit}` ? 'error:client'
            : code extends `5${Digit}${Digit}` ? 'error:server'
            : 'unknown'
            : never
        
        export type StatusCodeLabel<NS extends string, StatusCode extends number | string> =
            | `${NS}/info/${StatusLabel<Select1XX<StatusCode>>}`
            | `${NS}/success/${StatusLabel<Select2XX<StatusCode>>}`
            | `${NS}/redirect/${StatusLabel<Select3XX<StatusCode>>}`
            | `${NS}/client/${StatusLabel<Select4XX<StatusCode>>}`
            | `${NS}/server/${StatusLabel<Select5XX<StatusCode>>}`
            | `${NS}/${`${StatusCode}` extends `${'1'|'2'|'3'|'4'|'5'}${Digit}${Digit}`?StatusCode:never}`
        
        

        
       
        


   

        
        
        type _SelectStatusCode<T extends number | string, U extends Digit> =
            `${T}` extends infer T_String
            ? T_String extends `${U}${infer rest}`
            ? StringLength<rest> extends 2
            ? `${U}${rest}` extends `${infer Code extends number}`
            ? Code : never : never : never : never;
        type Select1XX<T extends number | string> = _SelectStatusCode<T, "1">;
        type Select2XX<T extends number | string> = _SelectStatusCode<T, "2">;
        type Select3XX<T extends number | string> = _SelectStatusCode<T, "3">;
        type Select4XX<T extends number | string> = _SelectStatusCode<T, "4">;
        type Select5XX<T extends number | string> = _SelectStatusCode<T, "5">;
    }

    export namespace ref {
        /** Gets variable type from `#/components/schemas/${Name}` */
        export type SchemaObject<T extends raw.OpenAPIObject, Name extends schema.ObjectName<T>> = T['components'] extends raw.ComponentsObject
        ? component.RefVariable<T['components'], 'schemas', Name> : never
        
        /** Gets variable type from `#/components/parameters/${Name}` */
        export type HeaderObject<T extends raw.OpenAPIObject, Name extends header.ObjectName<T>> = T['components'] extends raw.ComponentsObject
            ? component.RefVariable<T['components'], 'headers', Name> : never
        
        /** Gets variable type from `#/components/parameters/${Name}` */
        export type ParameterObject<T extends raw.OpenAPIObject, Name extends parameter.ObjectName<T>> = T['components'] extends raw.ComponentsObject
            ? component.RefVariable<T['components'], 'parameters', Name> : never
        
        /** Gets variable type from `#/components/responses/${Name}` */
        export type ResponsesObject<T extends raw.OpenAPIObject, Name extends _response.ObjectName<T>> = T['components'] extends raw.ComponentsObject
            ? component.RefVariable<T['components'], 'responses', Name> : never
        
        /** Gets variable type from `#/components/requestBodies/${Name}` */
        export type RequestBodiesObject<T extends raw.OpenAPIObject, Name extends requestBody.ObjectName<T>> = T['components'] extends raw.ComponentsObject
            ? component.RefVariable<T['components'], 'requestBodies', Name>: never
    }

    export namespace path {
        export type Operation<
            T extends raw.OpenAPIObject,
            Path extends keyof T['paths'],
            Method extends keyof T['paths'][Path]
        > = _path.Operation<T,Path,Method>
    }

    export namespace validation {

        export type ValidationError = 'not-defined' | 'disallowed-empty-value'
        export type ErrorResolution = 'none' | 'warn' | 'error' | 'throw'

        export type ExceptionCode =
            | 'unknown'
            | 'path/not-found'
            | 'operation/not-found'
            | 'response/not-found'
            | `header/${ValidationError}`
        
                
        export interface Exception extends Error { 
            code: ExceptionCode
        }

        export type Resolution = {
            default: ErrorResolution
        } & {
            [error in ValidationError]?: ErrorResolution
        }


             
        export type ResponseValidator = (
            specificaton: raw.OpenAPIObject,
            pathId: string,
            method: string,
            statusCode: number,
            headers: Record<string, string>,
            content: unknown,
            settings: adapter.settings.ResponseValidation
        ) => void

        export type HeaderValidator = (
            specification: raw.OpenAPIObject,
            actual: Record<string, string>,
            expect: raw.HeadersObject | undefined,
            settings: openapi.adapter.settings.ResponseValidation
        ) => void

        export type ContentValidator = (
            specification: raw.OpenAPIObject,
            actual: unknown,
            expect: raw.ContentObject | undefined,
            settings: openapi.adapter.settings.ResponseValidation
        ) => void

        export type SchemaValidator = (
            specification: raw.OpenAPIObject,
            actual: unknown,
            expected: raw.SchemaObject | undefined,
            settings: openapi.adapter.settings.ResponseValidation,
            source: 'header' | 'content'
        ) => void

    }
}