import type { adapter, specification, utility } from '@openapi-adapter/core';

export namespace iterated {

    /**
     * This type maps types from your OpenAPI definition to `adapter.path.Map`
     * @example
     * You can use following way to provide valid OpenAPI 3.x definition type: 
     * ```ts
     * export interface YourApiDefinition
     * // Copy-Paste your OpenAPI 3.x definition in json here: 
     * { 
     *      "openapi": "3.0.0",
     *      "components": {
     *          ...
     *      },
     *      "paths": {
     *          ...
     *      },
     *      ...
     * }
     * ``` 
     * Then use `YourApiDefinition` in place of `T`.
     * @param T Literal typing to your OpenAPI 3.x object. 
     */
    export type Definition<T extends specification.OpenAPIObject> = {
        auth: auth.Object<T>
        path: path.Map<T>
        refs: component.ref.Map<T>
    }

    export namespace component {
    
        export namespace ref {
            export type Name<T extends specification.OpenAPIObject> =
                | `schemas/${schema.Name<T>}`
                | `parameters/${parameter.Name<T>}`
                | `headers/${header.Name<T>}`
                | `responses/${response.Name<T>}`
                | `requestBodies/${requestBody.Name<T>}`
                | `securitySchemes/${securityScheme.Name<T>}`

            export type Raw<
                T extends specification.OpenAPIObject,
                ComponentType extends specification.ComponentType,
                ObjectKey extends string
            > =
                T['components'] extends (infer components extends specification.ComponentsObject)?
                utility.RequiredChild<components, ComponentType>[ObjectKey]
                : never
            
            
            export type Object<T extends specification.OpenAPIObject, RefId> = 
                RefId extends `${infer componentType}/${infer objectKey}`?
                componentType extends 'schemas' ? schema.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'parameters' | 'headers' ? parameter.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'responses' ? response.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'requestBodies' ? requestBody.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'securitySchemes' ? securityScheme.Object<T, Raw<T, componentType, objectKey>>
                : never
                : never
            
            export type Value<T extends specification.OpenAPIObject, RefId> = 
                RefId extends `${infer componentType}/${infer objectKey}`?
                componentType extends 'schemas' ? schema.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'parameters' | 'headers' ? parameter.Value<T, Raw<T, componentType, objectKey>> :
                componentType extends 'responses' ? response.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'requestBodies' ? requestBody.Object<T, Raw<T, componentType, objectKey>> :
                componentType extends 'securitySchemes' ? securityScheme.Object<T, Raw<T, componentType, objectKey>>
                : never
                : never
            
            export type Map<T extends specification.OpenAPIObject> = {
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
                U extends { oneOf: infer oneOf extends readonly specification.SchemaObject[] } ? Object<T, oneOf[number]> :
                never,
                U extends { not: infer not extends readonly specification.SchemaObject[] } ? Object<T, not[number]> : never
            >
    
            type ObjectFromArray<T extends specification.OpenAPIObject, U extends specification.SchemaObject> =
                U['items'] extends specification.SchemaObject ? Object<T, U['items']>[] : unknown[]
    
            type ObjectFromObject<
                T extends specification.OpenAPIObject,
                U extends specification.SchemaObject
            > = utility.Intersect<
                | (
                    U['properties'] extends (infer properties extends Record<keyof U['properties'], specification.SchemaObject>)
                    ? ObjectFromObjectAndProperties<T, U, properties>
                    : never
                )
                | (
                    U['additionalProperties'] extends (infer additionalProperties extends true | specification.SchemaObject)
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
                AdditionalProperties extends specification.SchemaObject ? Object<T, AdditionalProperties> : Record<any, unknown>
    
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
    
            export type ObjectMap<
                T extends specification.OpenAPIObject,
                U extends specification.ResponsesObject
            > = {
                [statusCode in keyof U]: U[statusCode] extends specification.ResponseObject
                ? Object<T, U[statusCode]>
                : never
            }
    
            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.ResponseObject
            > =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` } ?
                ref.Object<T, refId> :
                utility.Intersect<
                    | (U['content'] extends specification.ContentObject ? { content: content.Object<T, U['content']> } : never)
                    | (U['headers'] extends specification.HeadersObject ? { headers: header.ObjectMap<T, U['headers']> } : never)
                > extends infer response ? (response extends Record<any, any> ? response : {}) : never
        }
    
        export namespace content {
            export type Object<
                T extends specification.OpenAPIObject,
                U extends specification.ContentObject
            > = {
                [mediaType in keyof U]: U[mediaType]['schema' & keyof U[mediaType]] extends (infer schema extends specification.SchemaObject)
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
                U extends { in: 'path' } ? Value<T, U> : 
                U extends { in: 'header' } ? HeaderParameter<T, U> : 
                U extends { in: 'query'} ? QueryParameter<T, U> : 
                never

            type HeaderParameter<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { content: infer content } ? { __content__: content } :
                U extends { explode: true } ?
                {
                    __serialization__: {
                        explode: true
                    }
                    value: Value<T,U>
                }
                : Value<T,U>
            
            type QueryParameter<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { content: infer content } ? { __content__: content } :
                QuerySerialization<U> extends infer serialization extends (
                    | { explode: false }
                    | { style: "spaceDelimited" | "pipeDelimited" | "deepObject" }
                    | { allowReserved: true }
                ) ?
                {
                    __serialization__: serialization
                    value: Value<T,U>
                }
                : Value<T,U>

            type QuerySerialization<U extends specification.ParameterObject> =
                utility.Intersect<
                    | U extends { explode: infer explode } ? { explode: explode }: never
                    | U extends { style: infer style } ? { style: style } : never
                    | U extends { allowReserved: infer allowReserved } ? { allowReserved: allowReserved } : never
                    | {}
                >
            

            export type Value<T extends specification.OpenAPIObject, U extends specification.ParameterObject> =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` } ?
                ref.Value<T, refId> :
                | (U extends { schema: specification.SchemaObject } ? schema.Object<T, U['schema']> : never)
                | (U extends { required: true } ? never : undefined)
        }
    
        export namespace requestBody {
            export type Name<T extends specification.OpenAPIObject> =
                T extends { components: infer componentsObject extends specification.ComponentsObject } ?
                keyof componentsObject['requestBodies'] : never
    
    
            export type Object<T extends specification.OpenAPIObject, U extends specification.RequestBodyObject> =
                U extends { $ref: `#/components/${infer refId extends ref.Name<T>}` } ?
                ref.Value<T, refId> :
                (
                    | (U['content'] extends specification.ContentObject ? content.Object<T, U['content']> : never)
                    | (U['required'] extends true ? never : undefined)
                )
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
                        payload: {
                            name: U['name']
                            in: U['in']
                            apiKey: string
                        }
                    } :
                    U extends { type: 'http' }? 
                    {
                        type: 'http'
                        payload: {
                            scheme: U['scheme']
                            token: string
                        }
                    } :
                    U extends { type: 'oauth2' }? 
                    {
                        type: 'oauth2'
                        payload: {
                            accessToken: string
                        }
                    } :
                    U extends { type: 'openIdConnect' }? 
                    {
                        type: 'openIdConnect'
                        payload: {

                        }
                    } :
                    never
                )
            export type All<T extends specification.OpenAPIObject
                > = T extends specification.ComponentsObject ?
                T['securitySchemes'] extends (infer schemes extends Record<string, specification.SecuritySchemeObject>) ?
                {[securitySchemeId in keyof schemes]: Object<T, schemes[securitySchemeId]>}
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
            global: T['security'] extends (infer requirementsArray extends readonly specification.SecurityRequirementObject[]) ?
                ExtractRequirements<requirementsArray> : []
        
            schemes: component.securityScheme.All<T>
        }
    }

    export namespace path {
        export type Map<T extends specification.OpenAPIObject> = iterated.path.Paths<T> extends (infer map extends adapter.path.Map<any>)
        ? map
        : never

        export type OperationResponse<
            T extends specification.OpenAPIObject,
            Path extends keyof T['paths'],
            Method extends keyof T['paths'][Path],
            StatusCode extends keyof T['paths'][Path][Method]['responses' & keyof T['paths'][Path][Method]]
        > = Method extends specification.HttpMethod
            ? T['paths'][Path] extends (infer pathItem extends specification.PathItemObject)
            ? Method extends keyof pathItem
            ? pathItem[Method] extends (infer operation extends specification.OperationObject)
            ? StatusCode extends keyof operation['responses']
            ? operation['responses'][StatusCode] extends (infer response extends specification.ResponseObject)
            ? component.response.Object<T, response>
            : never
            : never
            : never
            : never
            : never
            : never
    
        export type Operation<
            T extends specification.OpenAPIObject,
            Path extends keyof T['paths'],
            Method extends keyof T['paths'][Path]
        > =
            T['paths'][Path] extends (infer pathItem extends specification.PathItemObject)
            ? Method extends (keyof pathItem | specification.HttpMethod)
            ? pathItem[Method] extends (infer rawOperation extends specification.OperationObject)
            ? {
                request: utility.Intersect<
                    | (ExtractParams<T, rawOperation, 'path'> extends (infer paths) ? {
                        pathParams: paths
                    } : never)
                    | (ExtractParams<T, rawOperation, 'header'> extends (infer headers) ? {
                        headers: headers
                    } : never)
                    | (ExtractParams<T, rawOperation, 'query'> extends (infer queries) ? {
                        query: queries
                    } : never)
                    | (rawOperation['requestBody'] extends (infer requestBody extends specification.RequestBodyObject) ? {
                        body: component.requestBody.Object<T, requestBody>
                    } : never)
                >
                security: ExtractSecurity<rawOperation>
                responses: ExtractResponses<T, rawOperation>
            }
            : never
            : never
            : never
    
    
        export type Item<T extends specification.OpenAPIObject, PathId extends keyof T['paths']> = T['paths'] extends specification.PathsObject
            ? PathId extends keyof T['paths'] ? {
                [method in (keyof T['paths'][PathId]) & specification.HttpMethod]: Operation<T, PathId, method>
            } : never : never
    
        
    
        export type Paths<T extends specification.OpenAPIObject> = T['paths'] extends specification.PathsObject
            ? { [pathRoute in keyof T['paths']]: Item<T, pathRoute> } : never
        
        
        export type ExtractParams<
            T extends specification.OpenAPIObject,
            Operation extends specification.OperationObject,
            Source extends specification.ParameterLocation
        > = utility.Intersect<
            Operation['parameters'] extends (infer parameters extends readonly specification.ParameterObject[]) ?
            parameters[number] extends infer possiblyRawParam extends specification.ParameterObject?
            component.parameter.Raw<T, possiblyRawParam> extends infer param ?
            param extends specification.ParameterObject<Source> ?
            param extends { name: infer paramName extends string | number } ?
            { [name in paramName]: component.parameter.Object<T, param> }
            : never
            : never
            : never
            : never
            : never
        >    
        
        export type ExtractSecurity<
            RawOperation extends specification.OperationObject
        > = RawOperation['security'] extends readonly specification.SecurityRequirementObject[]
            ? auth.ExtractRequirements<RawOperation['security']>
            : RawOperation['security']
    
        export type ExtractResponses<
            T extends specification.OpenAPIObject,
            RawOperation extends specification.OperationObject
        > = component.response.ObjectMap<T, RawOperation['responses']>;
    }

}



type sd<T> = T extends Record<any,never> ? true : false

type SD = sd<{}>