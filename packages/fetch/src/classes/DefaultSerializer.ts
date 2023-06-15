import { adapter, CoreSerializer, utility } from "@openapi-adapter/core";
import { pathStringSerializer, queryStringSerializer, headerParameterSerializer, requestBodySerializer } from "../helpers/serializer";
import { overrideDeep } from "../helpers";

export namespace DefaultSerializer {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type Interface = adapter.ISerializer<SerializedRequestBody>
    export type Settings = adapter.serialization.Settings<SerializedRequestBody>
}
export class DefaultSerializer
    extends CoreSerializer<DefaultSerializer.SerializedRequestBody>
    implements DefaultSerializer.Interface
{   
    public static readonly DEFAULT_VALUE_CONSTANTS: adapter.serialization.ValueConstants = {
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
        parameters: Record<string, adapter.request.HeaderParameter> | undefined
    ): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++) {
            const param = parameters[headerKeys[i]]

            const serialization = (
                typeof param === 'object'
                    && param !== null
                    && '__serialization__' in param
                    ? param['__serialization__']
                    : undefined
            ) as Partial<adapter.serialization.MediaSerialization & adapter.serialization.HeaderSerialization> | undefined

            if (serialization) {

                if (typeof param !== 'object' || param === null)
                    throw new Error('HeaderParameter not an object for custom serialization')

                const value = param['value' as keyof typeof param]
            
                if (serialization.mediaType) {
                    if (this.settings.header.contentSerializer === undefined)
                        throw new Error('ContentSerializer not found for headers')
                    
                    headers[headerKeys[i]] = this.settings.header.contentSerializer(serialization.mediaType, value)
                    continue;
                }

                headers[headerKeys[i]] = headerParameterSerializer(
                    value,
                    {
                        ...CoreSerializer.defaultHeaderSerialization,
                        ...serialization
                    },
                    this.settings.header
                )
            }
            else
            {
                headers[headerKeys[i]] = headerParameterSerializer(
                    param,
                    CoreSerializer.defaultHeaderSerialization,
                    this.settings.header
                )
            }
        
        }
        return headers
    }

    public override pathString(
        pathId: string,
        parameters: Record<string, adapter.request.PathParameter> | undefined
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
            
            if (key === undefined)
                throw new Error(`pathId[${pathId}] contains template[${pathKey}] that is not valid in OpenApi 3.x definition.`)
             
            const param = parameters[key]

            const serialization = (
                typeof param === 'object'
                    && param !== null
                    && '__serialization__' in param
                    ? param['__serialization__']
                    : undefined
            ) as Partial<adapter.serialization.MediaSerialization & adapter.serialization.PathStringOptions> | undefined

            if (serialization) {
                if (this.settings.pathString.contentSerializer === undefined)
                    throw new Error('ContentSerializer not found for pathParams')

                if (typeof param !== 'object' || param === null)
                    throw new Error('PathParameter not an object for custom serialization')
                
                output = output.replace(
                    pathKey,
                    this.settings.pathString.contentSerializer(
                        serialization.mediaType!,
                        param['value' as keyof typeof param]
                    )
                )
            }
            else {

                let style: 'simple' | 'label' | 'matrix'
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
                        param,
                        style,
                        explode,
                        this.settings.pathString
                    )
                )
            }
        }

        return output
    }

    public override queryString(
        parameters: Record<string, adapter.request.QueryParameter> | undefined
    ): string
    {
        if (!parameters) return ''
        const queryKeys = Object.keys(parameters)
        if (queryKeys.length === 0) return ''
        let querySections: string[] = []

        for (let i = 0; i < queryKeys.length; i++)
        {
            const key = queryKeys[i]
            const param = parameters[key]



            const serialization = (
                typeof param === 'object'
                    && param !== null
                    && '__serialization__' in param
                    ? param['__serialization__']
                    : undefined
            ) as Partial<adapter.serialization.MediaSerialization & adapter.serialization.HeaderSerialization> | undefined

            if (serialization) {
                if (typeof param !== 'object' || param === null)
                throw new Error('HeaderParameter not an object for custom serialization')
    
                const value = param['value' as keyof typeof param]

                if (serialization.mediaType) {
                    if (this.settings.queryString.contentSerializer === undefined)
                        throw new Error('ContentSerializer not found for headers')
                    
                    querySections.push(this.settings.queryString.contentSerializer(serialization.mediaType, value))
                    continue;
                }

                querySections.push(
                    queryStringSerializer(
                        key,
                        value,
                        {
                            ...CoreSerializer.defaultQuerySerialization,
                            ...serialization
                        },
                        this.settings.queryString
                    )
                )  

            } else {
                querySections.push(
                    queryStringSerializer(
                        key,
                        param,
                        CoreSerializer.defaultQuerySerialization,
                        this.settings.queryString
                    )
                )     
            }

            
        }
        
        return `?${querySections.join('&')}`
    }
    
    public override requestBody(body: adapter.component.Media): Promise<DefaultSerializer.SerializedRequestBody> {
        const { mediaType, value } = body
        const serializerOverride = this.settings.requestBody.serializerOverrides?.[mediaType]
        if (serializerOverride !== undefined) return serializerOverride(value)
        return this.settings.requestBody.defaultSerializer(mediaType, value)
    }
}