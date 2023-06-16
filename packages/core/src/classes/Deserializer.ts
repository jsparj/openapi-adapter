import type { adapter, specification } from '../../types'
import {
    getParameterSerialization,
    pathStringSerializer,
    headerParameterSerializer,
    queryStringSerializer
} from '../serializer'
export namespace Deserializer {
    export type Settings<RawResponseData> = adapter.settings.Deserialization<RawResponseData>
}
export class Deserializer<RawResponseData> implements adapter.IDeserializer<RawResponseData> {
    protected readonly settings: Deserializer.Settings<RawResponseData>
    
    constructor(settings: Deserializer.Settings<RawResponseData>)
    {
        this.settings = settings
    }

    public headers(
        headers: Record<string, string>,
        responseOptions?: adapter.settings.ResponseOptions
    ): Record<string, adapter.component.Any> {
        const output: Record<string, adapter.component.Any> = {}

        Object.keys(headers).forEach(headerId => {

            const serialization = responseOptions?.headers?.[headerId]
                ?? this.settings.responseHeaders.serializationOverrides?.[headerId]
                ?? this.settings.responseHeaders.default

            if('mediaType' in serialization)
            { 
                output[headerId] = this.settings.responseHeaders.deserializer(
                    headerId,
                    headers[headerId],
                    serialization
                )
            }
            else 
            {
                output[headerId] = this.settings.responseHeaders.deserializer(
                    headerId,
                    headers[headerId],
                    {
                        ...this.settings.responseHeaders.default,
                        ...serialization
                    }
                )
            }
        })

        return output
    }

    public responseData(
        mediaType: specification.MediaType,
        data: RawResponseData
    ): Promise<adapter.component.Any> {
        const _mediaType = mediaType ?? this.settings.responseData.defaultMediaType
        return this.settings.responseData.deserializer(_mediaType, data)
    }


    public static createDefaultSettings<RawResponseData>(
        responseDataDeserializer: adapter.deserializer.ResponseDataDeserializer<RawResponseData>
    )
    {
        return <const>{
            responseHeaders: {
                default: {
                    explode: false,
                },
                deserializer: ()=>Promise<{}>
            },
            responseData: {
                defaultMediaType: 'application/json',
                deserializer: responseDataDeserializer,
            },
        }
    }
}