import type { adapter } from '../../types'
import {
    getParameterSerialization,
    pathStringSerializer,
    headerParameterSerializer,
    queryStringSerializer
} from '../serializer'

export namespace Serializer {
    export type Settings<SerializedRequestBody> = adapter.settings.Serialization<SerializedRequestBody>
}

export class Serializer<SerializedRequestBody> implements adapter.ISerializer<SerializedRequestBody>
{
    protected readonly settings: Serializer.Settings<SerializedRequestBody>

    constructor(settings: Serializer.Settings<SerializedRequestBody>)
    {
        this.settings = settings
    }

    public pathString(
        pathId: string,
        parameters: adapter.request.PathParams | undefined
    ): string
    {
        if (!parameters) return pathId;

        let output = pathId
        let pathKey: string | undefined = undefined

        while (pathKey = /{(.*?)}/.exec(output)?.[0]) {

            const key = pathKey.substring(1, pathKey.length - 1)
            const param = getParameterSerialization(parameters[key])

            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.path.mediaSerializer === undefined)
                        throw new Error('MediaSerializer not configured for path.')
                    
                    output = output.replace(
                        pathKey,
                        this.settings.path.mediaSerializer(
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
                        this.settings.path.defaultSerializer(
                            key,
                            param.value,
                            {
                                ...this.settings.path.default,
                                ...param.serialization
                            },
                            this.settings.path.constants
                        )
                    )
                    break
            }
        }

        return output
    }

    public headerParameters(
        parameters: adapter.request.HeaderParams | undefined
    ): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++) {
            const key = headerKeys[i]
            const param = getParameterSerialization(parameters[headerKeys[i]])

            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.header.mediaSerializer === undefined)
                        throw new Error('MediaSerializer not configured for header.')
                    
                    headers[key] = this.settings.header.mediaSerializer(
                        param.mediaType,
                        key,
                        param.value
                    )
                    break

                case 'plain': 
                case 'default-serialization':
                    headers[key] = this.settings.header.defaultSerializer(
                        key,
                        param.value,
                        {
                            ...this.settings.header.default,
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
        parameters: adapter.request.QueryParams | undefined
    ): string
    {
        if (!parameters) return ''
        const queryKeys = Object.keys(parameters)
        if (queryKeys.length === 0) return ''
        let querySections: string[] = []

        for (let i = 0; i < queryKeys.length; i++)
        {
            const key = queryKeys[i]
            const param = getParameterSerialization(parameters[key])

            switch (param.type)
            {
                case 'media-serialization':
                    if (this.settings.query.mediaSerializer === undefined)
                        throw new Error('MediaSerializer not configured for query.')
                    
                    querySections.push(
                        this.settings.query.mediaSerializer(
                            param.mediaType,
                            key,
                            param.value
                        )
                    )
                    break

                case 'plain': 
                case 'default-serialization':
                    querySections.push(
                        this.settings.query.defaultSerializer(
                            key,
                            param.value,
                            {
                                ...this.settings.query.default,
                                ...param.serialization
                            },
                            this.settings.query.constants
                        )
                    ) 
                    break
            }
        }
        const prefix = this.settings.query.constants.prefix
        const seperator = this.settings.query.constants.seperator

        return `${prefix}${querySections.join(seperator)}`
    }

    public requestBody(body: adapter.component.Media): Promise<SerializedRequestBody> {
        const { mediaType, value } = body
        return this.settings.requestBody.serializer(mediaType, value)
    }

    public static createDefaultSettings<SerializedRequestBody>(
        requestBodySerializaer: adapter.serialization.RequestBodySerializer<SerializedRequestBody>,
    ) {
        return <const>{
            path: {
                constants: {
                    trueString: 'true',
                    falseString: 'false',
                    nullString: 'null',
                    undefinedString: ''
                },
                default: {
                    style: 'simple',
                    explode: false
                },
                defaultSerializer: pathStringSerializer
            },
            header: {
                constants: {
                    trueString: 'true',
                    falseString: 'false',
                    nullString: 'null',
                    undefinedString: '',
                },
                default: {
                    explode: false,
                },
                defaultSerializer: headerParameterSerializer
            },
            query: {
                constants: {
                    trueString: 'true',
                    falseString: 'false',
                    nullString: 'null',
                    undefinedString: '',
                    prefix: '?',
                    seperator: '&',
                },
                default: {
                    style: 'form',
                    explode: true,
                    allowReserved: false,
                },
                defaultSerializer: queryStringSerializer
            },
            requestBody: {
                serializer: requestBodySerializaer
            },
        
        }
    }
}