import { adapter, specification, utility } from '@openapi-adapter/core';

export declare namespace iterated {

    export namespace component {
        export type Type =
          | 'schemas'
          | 'responses'
          | 'parameters'
          | 'examples'
          | 'requestBodies'
          | 'headers'
          | 'securitySchemes'
          | 'links'
          | 'callbacks';
      
    
        export type RefVariable<T extends specification.ComponentsObject, U extends Type, K extends string> =
          U extends 'schemas' ? schema.Object<T, utility.RequiredChild<T, U>[K]> :
          U extends 'parameters' | 'headers' ? parameter.BaseObject<T, utility.RequiredChild<T, U>[K]> :
          U extends 'responses' ? response.Object<T, utility.RequiredChild<T, U>[K]> :
          U extends 'requestBodies' ? requestBody.Object<T, utility.RequiredChild<T, U>[K]> :
            never
        
        export namespace ref {
            /** Gets variable type from `#/components/schemas/${Name}` */
            export type SchemaObject<T extends specification.OpenAPIObject, Name extends schema.ObjectName<T>> = T['components'] extends specification.ComponentsObject
                ? component.RefVariable<T['components'], 'schemas', Name> : never
            
            /** Gets variable type from `#/components/parameters/${Name}` */
            export type HeaderObject<T extends specification.OpenAPIObject, Name extends header.ObjectName<T>> = T['components'] extends specification.ComponentsObject
                ? component.RefVariable<T['components'], 'headers', Name> : never
            
            /** Gets variable type from `#/components/parameters/${Name}` */
            export type ParameterObject<T extends specification.OpenAPIObject, Name extends parameter.ObjectName<T>> = T['components'] extends specification.ComponentsObject
                ? component.RefVariable<T['components'], 'parameters', Name> : never
            
            /** Gets variable type from `#/components/responses/${Name}` */
            export type ResponsesObject<T extends specification.OpenAPIObject, Name extends response.ObjectName<T>> = T['components'] extends specification.ComponentsObject
                ? component.RefVariable<T['components'], 'responses', Name> : never
            
            /** Gets variable type from `#/components/requestBodies/${Name}` */
            export type RequestBodiesObject<T extends specification.OpenAPIObject, Name extends requestBody.ObjectName<T>> = T['components'] extends specification.ComponentsObject
                ? component.RefVariable<T['components'], 'requestBodies', Name>: never
        }
        
        export namespace schema {
    
            export type ObjectName<T extends specification.OpenAPIObject> = T['components'] extends (infer componentsObject extends specification.ComponentsObject) ?
                keyof componentsObject['schemas'] : never
    
    
            export type Object<T extends specification.ComponentsObject | undefined, U extends specification.SchemaObject> = Exclude<
                U extends { $ref: `#/components/${infer typeKey extends component.Type}/${infer key}` } ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
                U extends { enum: Record<number, infer enumType> } ? enumType :
                U extends { type: "string" } ? string :
                U extends { type: "integer" | "number" } ? number :
                U extends { type: "boolean" } ? boolean :
                U extends { type: "array" } ? ObjectFromArray<T, U> :
                U extends { type: "object" } ? ObjectFromObject<T, U> :
                U['anyOf'] extends (infer anyOf extends readonly specification.SchemaObject[]) ? ObjectFromAnyOf<T, anyOf> :
                U['allOf'] extends (infer allOf extends readonly specification.SchemaObject[]) ? utility.Intersect<Object<T, allOf[number]>> :
                U['oneOf'] extends (infer oneOf extends readonly specification.SchemaObject[]) ? oneOf[number] /*Object<T, oneOf[number]>*/ :
                never,
                U['not'] extends (infer not extends readonly specification.SchemaObject[]) ? Object<T, not[number]> : never
            >
    
            export type _Object<T extends specification.ComponentsObject | undefined, U extends specification.SchemaObject> = 
                U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
                U["enum"] extends Record<number, infer enumType> ? enumType :
                U["type"] extends "string" ? string :
                U["type"] extends ("integer" | "number") ? number :
                U["type"] extends "boolean" ? boolean :
                U["type"] extends "array" ? ObjectFromArray<T, U> :
                U["type"] extends "object" ? ObjectFromObject<T, U> :
                U['anyOf'] extends (infer anyOf extends readonly specification.SchemaObject[]) ? ObjectFromAnyOf<T, anyOf> :
                U['allOf'] extends (infer allOf extends readonly specification.SchemaObject[]) ? utility.Intersect<Object<T, allOf[number]>> :
                U['oneOf'] extends (infer oneOf extends readonly specification.SchemaObject[]) ? oneOf[number] /*Object<T, oneOf[number]>*/ :
                never
    

    
            type ObjectFromArray<T extends specification.ComponentsObject | undefined, U extends specification.SchemaObject> =
                U['items'] extends specification.SchemaObject ? Object<T, U['items']>[] : unknown[]
    
            type ObjectFromObject<T extends specification.ComponentsObject | undefined, U extends specification.SchemaObject> = utility.Intersect<
                | (
                    U["properties"] extends (infer properties extends Record<keyof U["properties"], specification.SchemaObject>)
                    ? ObjectFromObjectAndProperties<T, U, properties>
                    : never
                )
                | (
                    U["additionalProperties"] extends (infer additionalProperties extends true | specification.SchemaObject)
                    ? ObjectFromObjectAndAdditionalProperties<T, additionalProperties>
                    : never
                )
            >
    
            type ObjectFromObjectAndProperties<T extends specification.ComponentsObject | undefined, U extends specification.SchemaObject, Properties extends Record<keyof U["properties"], specification.SchemaObject>> =
                U['required'] extends Record<number, (infer required extends keyof Properties)>
                ?
                & { [key in required]: Object<T, Properties[key]> }
                & { [key in Exclude<keyof Properties, required>]?: Object<T, Properties[key]> }
                :
                { [key in keyof Properties]?: Object<T, Properties[key]> }
    
            type ObjectFromObjectAndAdditionalProperties<T extends specification.ComponentsObject | undefined, AdditionalProperties extends true | specification.SchemaObject> =
                AdditionalProperties extends specification.SchemaObject ? Object<T, AdditionalProperties> : Record<any, unknown>
    
    
            // TODO: not exact type match:
            type ObjectFromAnyOf<T extends specification.ComponentsObject | undefined, AnyOf extends readonly specification.SchemaObject[]> = Object<T, AnyOf[number]> extends infer schemas ?
                Partial<utility.Intersect<schemas>> : never
    
        }
    
        export namespace header {
            export type ObjectName<T extends specification.OpenAPIObject> =
                T['components'] extends (infer componentsObject extends specification.ComponentsObject)
                ? keyof componentsObject['headers'] :
                never
    
            export type Object<T extends specification.ComponentsObject | undefined, U extends specification.BaseParameterObject> = parameter.BaseObject<T, U>
    
            export type ObjectMap<T extends specification.ComponentsObject | undefined, U extends specification.HeadersObject> = {
                [headerId in keyof U]: Object<T, U[headerId]>
            }
        }
    
        export namespace response {
            export type ObjectName<T extends specification.OpenAPIObject> = T['components'] extends (infer componentsObject extends specification.ComponentsObject) ?
                keyof componentsObject['responses'] : never
    
    
    
            export type ObjectMap<
                T extends specification.ComponentsObject | undefined,
                U extends specification.ResponsesObject
            > = {
                [statusCode in keyof U]: U[statusCode] extends specification.ResponseObject
                ? Object<T, U[statusCode]>
                : never
            }
    
            export type Object<
                T extends specification.ComponentsObject | undefined,
                U extends specification.ResponseObject
            > =
                U['$ref'] extends `#/components/${infer typeKey extends component.Type}/${infer key}` ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
                utility.Intersect<
                    | (U['content'] extends specification.ContentObject ? { content: content.Object<T, U['content']> } : never)
                    | (U['headers'] extends specification.HeadersObject ? { headers: header.ObjectMap<T, U['headers']> } : never)
                > extends infer response ? (response extends Record<any, any> ? response : null) : never
        }
    
        export namespace content {
            export type Object<
                T extends specification.ComponentsObject | undefined,
                U extends specification.ContentObject
            > = {
                [mediaType in keyof U]: U[mediaType]['schema' & keyof U[mediaType]] extends (infer schema extends specification.SchemaObject)
                ? schema.Object<T, schema>
                : never
            }

         
        }
    
        export namespace parameter {
            export type ObjectName<T extends specification.OpenAPIObject> = T['components'] extends (infer componentsObject extends specification.ComponentsObject) ?
                keyof componentsObject['parameters'] : never
        
            export type Object<T extends specification.ComponentsObject | undefined, U extends specification.BaseParameterObject> = parameter.BaseObject<T, U>
    
            export type BaseObject<T extends specification.ComponentsObject | undefined, U extends specification.BaseParameterObject> =
                U extends { $ref: `#/components/${infer typeKey extends component.Type}/${infer key}` }
                ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
                (
                    | (U extends { schema: specification.SchemaObject } ? schema.Object<T, U['schema']> : keyof U)
                    | (U extends { content: specification.ContentObject } ? content.Object<T, U['content']> : never)
                    | (U extends { required: true } ? never : undefined)
                )
        }
    
        export namespace requestBody {
            export type ObjectName<T extends specification.OpenAPIObject> = T['components'] extends (infer componentsObject extends specification.ComponentsObject) ?
                keyof componentsObject['requestBodies'] : never
    
    
            export type Object<T extends specification.ComponentsObject | undefined, U extends specification.RequestBodyObject> =
                U extends { $ref: `#/components/${infer typeKey extends component.Type}/${infer key}` } ? (T extends undefined ? unknown : component.RefVariable<Exclude<T, undefined>, typeKey, key>) :
                (
                    | (U['content'] extends specification.ContentObject ? content.Object<T, U['content']> : never)
                    | (U['required'] extends true ? never : undefined)
                )
        }
    }

    export namespace path {
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
        export type Map<T extends specification.OpenAPIObject> = iterated.path.Paths<T> extends (infer map extends adapter.path.Map<path.Paths<T>>)
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
            ? component.response.Object<T['components'], response>
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
                    | (ExtractParams<T, rawOperation, 'path'> extends (infer paths extends Record<string, string | number>) ? {
                        pathParams: paths
                    } : never)
                    | (ExtractParams<T, rawOperation, 'header'> extends (infer headers extends Record<string, string>) ? {
                        headers: headers
                    } : never)
                    | (ExtractParams<T, rawOperation, 'query'> extends (infer queries extends Record<string, unknown>) ? {
                        query: queries
                    } : never)
                    | (rawOperation['requestBody'] extends (infer requestBody extends specification.RequestBodyObject) ? {
                        body: component.requestBody.Object<T['components'], requestBody>
                    } : never)
                >
                responses: ExtractResponses<T, rawOperation>;
            }
            : never
            : never
            : never
    
    
        export type Params<Path extends string | number | symbol> = Path extends string
            ? Record<ExtractPathParams<Path>, string | number>
            : never;
    
    
        export type Item<T extends specification.OpenAPIObject, PathId extends keyof T['paths']> = T['paths'] extends specification.PathsObject
            ? PathId extends keyof T['paths'] ? {
                [method in (keyof T['paths'][PathId]) & specification.HttpMethod]: Operation<T, PathId, method>
            } : never : never
    
        
    
        export type Paths<T extends specification.OpenAPIObject> = T['paths'] extends specification.PathsObject
            ? { [pathRoute in keyof T['paths']]: Item<T, pathRoute> } : never
        
        
        export type ExtractPathParams<T extends string> =
            T extends `${infer first}/${infer rest}`
            ? first extends `{${infer pathNode}}`
            ? pathNode | ExtractPathParams<rest>
            : ExtractPathParams<rest>
            : T extends `{${infer pathNode}}`
            ? pathNode
            : never;
    
        export type ExtractParams<
            T extends specification.OpenAPIObject,
            RawOperation extends specification.OperationObject,
            Source extends specification.ParameterLocation
        > = utility.Intersect<
            RawOperation['parameters'] extends readonly specification.ParameterObject[]
            ? RawOperation['parameters'][number] extends infer param
            ? param extends specification.ParameterObject<Source>
            ? { [name in param["name"]]: component.parameter.BaseObject<T['components'], param> } extends (infer extractedParam extends object)
            ? utility.OmitValues<extractedParam,undefined> & Partial<utility.PickValues<extractedParam,undefined>>
            : never
            : never
            : never
            : never
        >
    
        export type ExtractResponses<
            T extends specification.OpenAPIObject,
            RawOperation extends specification.OperationObject
        > = component.response.ObjectMap<T['components'], RawOperation['responses']>;
    }    
}

