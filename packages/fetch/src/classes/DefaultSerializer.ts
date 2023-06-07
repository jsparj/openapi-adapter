import { adapter, CoreSerializer, utility } from "@openapi-adapter/core";
import { pathStringSerializer, queryStringSerializer, headerParameterSerializer, requestBodySerializer } from "../helpers/serializer";
import { overrideDeep } from "../helpers";

export namespace DefaultSerializer {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type Interface = adapter.ISerializer<SerializedRequestBody>
    export type Settings = adapter.serializer.Settings<SerializedRequestBody>
}
export class DefaultSerializer
    extends CoreSerializer<DefaultSerializer.SerializedRequestBody>
    implements DefaultSerializer.Interface
{   
    public static readonly DEFAULT_VALUE_CONSTANTS: adapter.serializer.ValueConstants = {
        falseString: 'false',
        trueString: 'true',
        nullString: 'null',
        undefinedString: ''
    }

    public static readonly DEFAULT_SETTINGS: DefaultSerializer.Settings = {
        pathString: {
            constants: DefaultSerializer.DEFAULT_VALUE_CONSTANTS
        },
        queryString: {
            constants: DefaultSerializer.DEFAULT_VALUE_CONSTANTS
        },
        header: {
            constants: DefaultSerializer.DEFAULT_VALUE_CONSTANTS
        },
        requestBody: {
            defaultSerializer: requestBodySerializer
        }
    } 

    constructor(settings?: utility.DeepPartial<DefaultSerializer.Settings>) {
        super(overrideDeep<DefaultSerializer.Settings>(
            DefaultSerializer.DEFAULT_SETTINGS, settings ?? {}
        ))
    }

    public override headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++)
        {
            headers[headerKeys[i]] = headerParameterSerializer(
                parameters[headerKeys[i]],
                this.settings.header
            )
        }
        return headers
    }

    public override pathString(
        pathId: string,
        parameters: Record<string, adapter.component.PathParameter> | undefined
    ): string
    {
        if (!parameters) return pathId;

        let output = pathId
        let pathKey: string | undefined = undefined
        
        while (pathKey = /{(.*?)}/.exec(output)?.[0]) {
            const template = pathKey.substring(1, pathKey.length - 1)
            const templatePrefix = /^[^\w]*/.exec(template)?.[0] as '.' | ';' | ''
            const key = /[^\W]+/.exec(template)?.[0]
            const explode = /\w+\*$/.test(template)
            
            if (key === undefined) throw new Error(`pathId[${pathId}] contains template[${pathKey}] that is not valid in OpenApi 3.x definition.`)
             
            const parameterValue = parameters[key]

            if (parameterValue === undefined)
                throw new Error(`pathId[${pathId}] doesn't have path parameter for key[${key}].`)

            let style: 'simple'|'label'|'matrix'
            switch (templatePrefix) {
                case '': style = 'simple'; break
                case '.': style = 'label'; break
                case ';': style = 'matrix'; break

                default:
                    throw new Error(`Unknown templatePrefix[${templatePrefix}]`)
            }

            output = output.replace(
                pathKey,
                pathStringSerializer(
                    key,
                    parameterValue,
                    style,
                    explode,
                    this.settings.pathString
                )
            )
        }

        return output
    }

    public override queryString(
        parameters: Record<string, adapter.component.QueryParameter> | undefined
    ): string
    {
        if (!parameters) return ''
        const queryKeys = Object.keys(parameters)
        if (queryKeys.length === 0) return ''
        let querySections: string[] = []

        for (let i = 0; i < queryKeys.length; i++)
        {
            querySections.push(
                queryStringSerializer(
                    queryKeys[i],
                    parameters[queryKeys[i]],
                    this.settings.queryString
                )
            ) 
        }
        
        return `?${querySections.join('&')}`
    }
    
    public override requestBody(body: adapter.component.RequestBody): Promise<DefaultSerializer.SerializedRequestBody> {
        const { mediaType, value } = body
        const serializerOverride = this.settings.requestBody.serializerOverrides?.[mediaType]
        if (serializerOverride !== undefined) return serializerOverride(value)
        return this.settings.requestBody.defaultSerializer(value, mediaType)
    }
}