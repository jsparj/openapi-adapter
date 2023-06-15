import type { adapter, specification, utility } from '../../types'
import {
    pathStringSerializer,
    headerParameterSerializer,
    queryStringSerializer
} from '../serializer'



export class Serializer<SerializedRequestBody>
    implements adapter.ISerializer<SerializedRequestBody>
{
    protected readonly settings: adapter.serialization.Settings<SerializedRequestBody>

    public static readonly PARAMETER_SETTINGS: Omit<adapter.serialization.Settings<never>, 'requestBody'> = <const>{
        pathString: {
            constants: {
                trueString: 'true',
                falseString: 'false',
                nullString: 'null',
                undefinedString: ''
            },
            defaultSerialization: {
                style: 'simple',
                explode: false,
            }
        },
        header: {
            constants: {
                trueString: 'true',
                falseString: 'false',
                nullString: 'null',
                undefinedString: ''
            },
            defaultSerialization: {
                explode: false,
            }
        },
        queryString: {
            constants: {
                trueString: 'true',
                falseString: 'false',
                nullString: 'null',
                undefinedString: '',
                prefix: '?',
                seperator: '&'
            },
            defaultSerialization: {
                style: 'form',
                explode: true,
                allowReserved: false
            }
        }
        
    }

    constructor(settings: adapter.serialization.Settings<SerializedRequestBody>)
    {
        this.settings = settings
    }

    public pathString(
        pathId: string,
        parameters: Record<string, adapter.request.PathParameter> | undefined
    ): string
    {
        if (!parameters) return pathId;

        let output = pathId
        let pathKey: string | undefined = undefined
        
        while (pathKey = /{(.*?)}/.exec(output)?.[0]) {

            const key = pathKey.substring(1, pathKey.length - 1)
            const param = this.getParameterSerialization(parameters[key])

            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.pathString.contentSerializer === undefined)
                        throw new Error('ParameterContentSerializer not found for path')
                    
                    output = output.replace(
                        pathKey,
                        this.settings.pathString.contentSerializer(
                            param.mediaType,
                            key,
                            param.value
                        )
                    )
                    break

                case 'plain': 
                case 'default-serialization':
                    output = output.replace(
                        pathKey,
                        pathStringSerializer(
                            key,
                            param.value,
                            {
                                ...this.settings.pathString.defaultSerialization,
                                ...param.serialization
                            },
                            this.settings.pathString.constants
                        )
                    )
                    break
            }
        }

        return output
    }

    public headerParameters(
        parameters: Record<string, adapter.request.HeaderParameter> | undefined
    ): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++) {
            const key = headerKeys[i]
            const param = this.getParameterSerialization(parameters[headerKeys[i]])


            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.header.contentSerializer === undefined)
                        throw new Error('ParameterContentSerializer not found for headers')
                    
                    headers[key] = this.settings.header.contentSerializer(
                        param.mediaType, key,
                        param.value
                    )
                    break

                case 'plain': 
                case 'default-serialization':
                    headers[key] = headerParameterSerializer(
                        param.value,
                        {
                            ...this.settings.header.defaultSerialization,
                            ...param.serialization
                        },
                        this.settings.header.constants
                    )
                    break
            }
        }
        return headers
    }

    public queryString(
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
            const param = this.getParameterSerialization(parameters[key])

            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.queryString.contentSerializer === undefined)
                        throw new Error('ContentSerializer not found for query')
                    
                    querySections.push(
                        this.settings.queryString.contentSerializer(
                            param.mediaType,
                            key,
                            param.value
                        )
                    )
                    break

                case 'plain': 
                case 'default-serialization':
                    querySections.push(
                        queryStringSerializer(
                            key,
                            param.value,
                            {
                                ...this.settings.queryString.defaultSerialization,
                                ...param.serialization
                            },
                            this.settings.queryString.constants
                        )
                    ) 
                    break
            }
        }
        
        return `${this.settings.queryString.constants.prefix}${querySections.join(this.settings.queryString.constants.seperator)}`
    }

    public requestBody(body: adapter.component.Media): Promise<SerializedRequestBody> {
        const { mediaType, value } = body
        const serializerOverride = this.settings.requestBody.serializerOverrides?.[mediaType]
        if (serializerOverride !== undefined) return serializerOverride(value)
        return this.settings.requestBody.defaultSerializer(mediaType, value)
    }

    protected getParameterSerialization<T extends adapter.serialization.ParameterSerialization>(
        param: adapter.request.Parameter<T>
    ):
        | { type: 'media-serialization', mediaType: specification.MediaType, value: adapter.component.Any }
        | { type: 'default-serialization', serialization: Partial<T>, value: adapter.component.Any }
        | { type: 'plain', serialization: undefined, value: adapter.component.Any }
    {
        const serialization = (
            typeof param === 'object'
                && param !== null
                && '__serialization__' in param
                ? param['__serialization__']
                : undefined
        ) as Partial<adapter.serialization.MediaSerialization & T> | undefined

        if (serialization) {
            if (typeof param !== 'object' || param === null)
            throw new Error('Parameter not an object for custom serialization')

            const value = param['value' as keyof typeof param]

            if (serialization.mediaType) {
                return {
                    type: 'media-serialization',
                    mediaType: serialization.mediaType,
                    value
                }
            }
            else
            {
                return {
                    type: 'default-serialization',
                    serialization,
                    value
                }
            }
        }
        else
        {
            return {
                type: 'plain',
                serialization: undefined,
                value: param
            }
        }
    }
}