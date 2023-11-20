import type { adapter } from './adapter';
import type { specification } from './specification';
import type { utility } from './utility';

export namespace iterated {

    export type Definition<T extends specification.OpenAPIObject> = {
        auth: auth.Object<T>
        path: path.Object<T>
        ref: component.ref.ValueMap<T>
    }

    export namespace component {

        export type Sanitize<
            T extends specification.OpenAPIObject,
            Component,
        > = Component extends { $ref: `#/components/${infer typeKey extends specification.ComponentType}/${infer objectKey}` }
            ? ref.Raw<T,typeKey,objectKey>
            : never

        export namespace ref {
            export type Name<
                T extends specification.OpenAPIObject
            > = | `headers/${header.Name<T>}`
                | `parameters/${parameter.Name<T>}`
                | `requestBodies/${requestBody.Name<T>}`
                | `responses/${response.Name<T>}`
                | `schemas/${schema.Name<T>}`
                | `securitySchemes/${securityScheme.Name<T>}`

            export type Raw<
                T extends specification.OpenAPIObject,
                ComponentType extends specification.ComponentType,
                ObjectKey extends string
            > = T extends { components: infer components extends specification.ComponentsObject } ?
                utility.RequiredChild<components, ComponentType>[ObjectKey]
                : never

            export type Object<
                T extends specification.OpenAPIObject, RefId
            > = RefId extends `${infer componentType}/${infer objectKey}`?
                componentType extends 'schemas' ? schema.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'parameters' | 'headers' ? parameter.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'responses' ? response.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'requestBodies' ? requestBody.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'securitySchemes' ? securityScheme.Object<T, Raw<T, componentType, objectKey>>
                : never
                : never
            
            export type Value<
                T extends specification.OpenAPIObject, RefId
            > = RefId extends `${infer componentType}/${infer objectKey}`?
                componentType extends 'schemas' ? schema.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'parameters' | 'headers' ? parameter.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'responses' ? response.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'requestBodies' ? requestBody.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'securitySchemes' ? securityScheme.Object<T, Raw<T, componentType, objectKey>>
                : never
                : never
            
            export type ValueMap<T extends specification.OpenAPIObject> = {
                [refId in Name<T>]: Value<T, refId>
            }
        }
        
        export namespace schema {

            export type Name<T extends specification.OpenAPIObject> = T['components'] extends (infer componentsObject extends specification.ComponentsObject) ?
                keyof componentsObject['schemas'] : never

            export type Object<T extends specification.OpenAPIObject, U extends specification.SchemaObject> = Exclude<
                U extends { $ref: `#/components/${infer refId}` }
                ? ref.Object<T, refId> :
                U extends { enum: Record<number, infer enumType> } ? enumType :
                U extends { type: 'string' } ? string :
                U extends { type: 'integer' | 'number' } ? number :
                U extends { type: 'boolean' } ? boolean :
                U extends { type: 'null' } ? null :
                U extends { type: 'array' } ? ObjectFromArray<T, U> :
                U extends { type: 'object' } ? ObjectFromObject<T, U> :
                U extends { anyOf: infer anyOf extends readonly specification.SchemaObject[] } ? ObjectFromAnyOf<T, anyOf> :
                U extends { allOf: infer allOf extends readonly specification.SchemaObject[] } ? utility.Intersect<Object<T, allOf[number]>> :
                U extends { oneOf: infer oneOf extends readonly specification.SchemaObject[] } ? Object<T, oneOf[number]> : never,
                U extends { not: infer not extends specification.SchemaObject } ? Object<T, not> : never
            >
    
            type ObjectFromArray<T extends specification.OpenAPIObject, U extends specification.SchemaObject> =
                U extends { items: infer items extends specification.SchemaObject } ? Object<T, items>[] : unknown[]
    
            type ObjectFromObject<
                T extends specification.OpenAPIObject,
                U extends specification.SchemaObject
            > = utility.Intersect<
                | (
                    U extends {properties: infer properties extends Record<keyof U['properties'], specification.SchemaObject>}
                    ? ObjectFromObjectAndProperties<T, U, properties>
                    : never
                )
                | (
                    U extends { additionalProperties: infer additionalProperties extends true | specification.SchemaObject }
                    ? ObjectFromObjectAndAdditionalProperties<T, additionalProperties>
                    : never
                )
            >
    
            type ObjectFromObjectAndProperties<
                T extends specification.OpenAPIObject,
                U extends specification.SchemaObject,
                Properties extends Record<keyof U['properties'], specification.SchemaObject>
            > =
                U['required'] extends Record<number, (infer required extends keyof Properties)>
                ?
                & { [key in required]: Object<T, Properties[key]> }
                & { [key in Exclude<keyof Properties, required>]?: Object<T, Properties[key]> }
                :
                { [key in keyof Properties]?: Object<T, Properties[key]> }
    
            type ObjectFromObjectAndAdditionalProperties<
                T extends specification.OpenAPIObject,
                AdditionalProperties extends true | specification.SchemaObject
            > =
                AdditionalProperties extends specification.SchemaObject
                ? Record<any,Object<T, AdditionalProperties>>
                : Record<any, any>
    
            // TODO: not exact type match:
            type ObjectFromAnyOf<T extends specification.OpenAPIObject, AnyOf extends readonly specification.SchemaObject[]> =
                Object<T, AnyOf[number]> extends infer schemas ?
                Partial<utility.Intersect<schemas>> : never
        }
    
        export namespace header {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['headers'] :
                never
    
            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.BaseParameterObject
            > = parameter.Value<T, U>
    
            export type ObjectMap<
                T extends specification.OpenAPIObject,
                U extends specification.HeadersObject
            > = {
                [headerId in keyof U]: Object<T, U[headerId]>
            }
        }
    
        export namespace response {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['responses'] : never

            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.ResponseObject
            > =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` }
                ? ref.Object<T, refId>
                : utility.Intersect<
                    | (U extends { headers: infer headers extends specification.HeadersObject } ? { headers: header.ObjectMap<T, headers> } : never)
                    | (U extends { content: infer content extends specification.ContentObject } ? { data: content.Object<T, content> } : never)
                >
        }
    
        export namespace content {
            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.ContentObject
            > = U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` }
                ? ref.Object<T, refId>
                : {
                    [mediaType in keyof U]: U[mediaType] extends {
                        schema: infer schema extends specification.SchemaObject
                    } ? {
                        mediaType: mediaType
                        value: schema.Object<T, schema>
                    }
                    : never
                }[keyof U]
            
            export type MediaObject<
                T extends specification.OpenAPIObject,
                U extends specification.ContentObject
            > = U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` }
                ? ref.Object<T, refId>
                : {
                    [mediaType in keyof U]: U[mediaType] extends {
                        schema: infer schema extends specification.SchemaObject
                    }
                    ? schema.Object<T, schema>
                    : never
                }
        }
    
        export namespace parameter {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['parameters'] : never

            export type Raw<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { $ref: `#/components/${infer typeKey extends specification.ComponentType}/${infer key}` }? ref.Raw<T,typeKey,key>
                : U

            export type Object<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` } ?
                ref.Object<T, refId> :
                U extends { in: 'path' } ? PathParameter<T, U> : 
                U extends { in: 'header' } ? HeaderParameter<T, U> : 
                U extends { in: 'query'} ? QueryParameter<T, U> : 
                never

            export type Value<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` } ?
                ref.Value<T, refId> :
                | (U extends { schema: specification.SchemaObject } ? schema.Object<T, U['schema']> : never)
                | (U extends { required: true } ? never : undefined)

            
            /** @returns `adapter.path.PathParameter` */
            export type PathParameter<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { content: infer rawContent extends specification.ContentObject }
                ? (
                    component.content.Object<T, rawContent> extends infer content extends adapter.component.Media
                    ? {
                        serialization: {
                            mediaType: content['mediaType']
                        },
                        value: content['value']
                    }
                    : never
                )
                : {
                    serialization: {
                        style: U extends { style: infer style } ? style : 'simple'
                        explode: U extends { explode: infer explode } ? explode : false
                    }
                    value: Value<T,U>
                }

            /** @returns `adapter.path.HeaderParameter` */
            export type HeaderParameter<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { content: infer rawContent extends specification.ContentObject }
                ? (
                    component.content.Object<T, rawContent> extends infer content extends adapter.component.Media
                    ? {
                        serialization: {
                            mediaType: content['mediaType']
                        },
                        value: content['value']
                    }
                    : never
                )
                : {
                    serialization: {
                        explode: U extends { explode: infer explode extends boolean}? explode : false
                    }
                    value: Value<T,U>
                }
            
            /** @returns `adapter.path.QueryParameter` */
            export type QueryParameter<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { content: infer rawContent extends specification.ContentObject }
                ? (
                    component.content.Object<T,rawContent> extends infer content extends adapter.component.Media?
                    {
                        serialization: {
                            mediaType: content['mediaType']
                        },
                        value: content['value']
                    }
                    : never
                )
                : {
                    serialization: {
                        style: U extends { style: infer style } ? style : 'form'
                        explode: U extends { explode: infer explode } ? explode : true
                        allowReserved: U extends { allowReserved: infer allowReserved } ? allowReserved : false
                    }
                    value: Value<T,U>
                }
        }
    
        export namespace requestBody {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['requestBodies'] : never
    
    
            export type Object<T extends specification.OpenAPIObject, U extends specification.RequestBodyObject> =
                (U extends { $ref: `#/components/${infer typeKey extends specification.ComponentType}/${infer objectKey}` }
                ? ref.Raw<T, typeKey, objectKey> : U) extends infer requestBody
                ? (
                    | (requestBody extends { required: true } ? undefined : never)
                    | (
                        requestBody extends { content: infer contentObject extends specification.ContentObject }
                        ? component.content.Object<T, contentObject>
                        : never
                    )
                )
            : never
        }

        export namespace securityScheme {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['securitySchemes'] : never

            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.SecuritySchemeObject
            > = 
                U extends { $ref: `#/components/${infer typeKey extends specification.ComponentType}/${infer key}` } ?
                Object<T, ref.Raw<T, typeKey, key> & specification.SecuritySchemeObject> :
                (
                    U extends { type: 'apiKey' }? 
                    {
                        type: 'apiKey'
                        token: {
                            in: U['in']
                            name: U['name']
                            value: string
                        }
                    } :
                    U extends { type: 'http' }? 
                    {
                        type: 'http'
                        token: {
                            in: 'header'
                            name: 'Authorization',
                            value: string
                        }
                    } :
                    U extends { type: infer type }? 
                    {
                        type: type
                        token?: {
                            in:  "query" | "header" | "cookie"
                            name: string
                            value: string
                        }
                        /**@type https.AgentOptions */
                        agent?: unknown
                    } :
                    never
                )
            export type All<T extends specification.OpenAPIObject
                > = T extends {components: infer components extends specification.ComponentsObject}
                ? components extends {securitySchemes: infer schemes extends Record<string, specification.SecuritySchemeObject>}
                ? {[securitySchemeId in keyof schemes]: Object<T, schemes[securitySchemeId]>}
                : {}
                : {}
        }
    }

    export namespace auth {
        export type ExtractRequirements<T extends readonly specification.SecurityRequirementObject[]> = T[number] extends infer requirements ?
            requirements extends infer requirement ?
            utility.UnionToTuple<keyof requirement>
            : never
            : never

        export type Object<T extends specification.OpenAPIObject> = {
            global: T extends {
                security: infer requirementsArray extends readonly specification.SecurityRequirementObject[]
            }
            ? ExtractRequirements<requirementsArray> : []
            schemes: component.securityScheme.All<T>
        }
    }

    /** @summary  */
    export namespace path {

        export type Object<T extends specification.OpenAPIObject> = T extends { paths: infer paths extends specification.PathsObject }
            ? { [pathId in keyof paths]:
                paths[pathId] extends infer pathItemObject extends specification.PathItemObject
                ? {
                    item: Item<T, pathItemObject>
                    operations: OperationMap<T, pathItemObject>
                } : never
            } 
            : never

        export type Item<
            T extends specification.OpenAPIObject,
            PathItemObject extends specification.PathItemObject
        > = {
                requestParams: PathItemObject extends { parameters: infer pathParameters extends readonly specification.ParameterObject[] }
                    ? request.PathParams<T, pathParameters>
                    : {}
        }
        
        export type OperationMap<
            T extends specification.OpenAPIObject,
            PathItemObject extends specification.PathItemObject
        > = {
            [methodId in (keyof PathItemObject & specification.HttpMethod)]: PathItemObject[methodId] extends specification.OperationObject
                ? Operation<T, PathItemObject[methodId]>
                : never
        } 

        export type Operation<
            T extends specification.OpenAPIObject,
            OperationObject extends specification.OperationObject
        > = {
            requestParams: request.OperationParams<T, OperationObject>
            responseObject: response.ExtractObject<T, OperationObject['responses']>
        }

        export type ExtractSecurity<
            RawOperation extends specification.OperationObject
            > = RawOperation extends { security: infer authRequirements extends readonly specification.SecurityRequirementObject[] }
            ? auth.ExtractRequirements<authRequirements>
            : never
    }

    export namespace request {
        export type PathParams<
            T extends specification.OpenAPIObject,
            PathParams extends readonly specification.ParameterObject[]
            > = {
            path: ExtractParams<T, PathParams, 'path'>
            cookie: ExtractParams<T, PathParams, 'cookie'> 
            header: ExtractParams<T, PathParams, 'header'>
            query: ExtractParams<T, PathParams, 'query'>
        }
        
        export type OperationParams<
            T extends specification.OpenAPIObject,
            OperationObject extends specification.OperationObject
        > = { 
            security: OperationObject extends { security: infer authRequirements extends readonly specification.SecurityRequirementObject[] }
                ? auth.ExtractRequirements<authRequirements> : undefined
            path: OperationObject extends { parameters: infer operationParams extends readonly specification.ParameterObject[] }
                ? ExtractParams<T, operationParams, 'path'> : {}
            cookie: OperationObject extends { parameters: infer operationParams extends readonly specification.ParameterObject[] }
                ? ExtractParams<T, operationParams, 'cookie'> : {}
            header: OperationObject extends { parameters: infer operationParams extends readonly specification.ParameterObject[] }
                ? ExtractParams<T, operationParams, 'header'> : {}
            query: OperationObject extends { parameters: infer operationParams extends readonly specification.ParameterObject[] }
                ? ExtractParams<T, operationParams, 'query'> : {}
            body: OperationObject extends { requestBody: infer requestBody extends specification.RequestBodyObject }
                ? component.requestBody.Object<T, requestBody> : undefined
        }

        export type ExtractParams<
            T extends specification.OpenAPIObject,
            ParameterArray extends readonly specification.ParameterObject[],
            Source extends specification.ParameterLocation
        > = utility.Intersect<
            ParameterArray[number] extends infer possiblyRawParam extends specification.ParameterObject?
            component.parameter.Raw<T, possiblyRawParam> extends infer param
            ? param extends specification.ParameterObject<Source>
            ? param extends { name: infer paramName extends string | number }
            ? { [name in paramName]: component.parameter.Object<T, param> } : never
            : {}
            : never
            : never
        > 
    }

    export namespace response {
        export type ExtractObject<
            T extends specification.OpenAPIObject,
            ResponsesObject extends specification.ResponsesObject
        > = {
            [statusCode in keyof ResponsesObject]: 
                ResponsesObject[statusCode] extends infer responseObject extends specification.ResponseObject
                ? component.response.Object<T, responseObject>
                : never
        }
    }
}