import type { adapter, specification } from '@openapi-adapter/core'
import type { OpenApiAdapter } from './OpenApiAdapter'
import { responseDataDeserializer } from '../deserializer'

export namespace Deserializer {
    export type Settings = adapter.settings.Deserialization<OpenApiAdapter.RawResponseData>
}
export class Deserializer implements adapter.IDeserializer<OpenApiAdapter.RawResponseData> {
    protected readonly settings: Deserializer.Settings
    
    constructor(settings?: Deserializer.Settings)
    {
        this.settings = settings ?? Deserializer.defaultSettings
    }

    public responseData(
        mediaType: specification.MediaType,
        data: OpenApiAdapter.RawResponseData
    ): Promise<adapter.component.Any> {
        const _mediaType = mediaType ?? this.settings.responseData.defaultMediaType
        return this.settings.responseData.deserializer(_mediaType, data)
    }

    public static get defaultSettings()
    {
        return <const>{
            responseData: {
                defaultMediaType: 'application/json',
                deserializer: responseDataDeserializer,
            }
        }
    }
}