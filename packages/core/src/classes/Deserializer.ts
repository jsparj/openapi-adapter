import type { adapter, specification } from '../../types'

export class Deserializer<RawResponseContent> implements adapter.IDeserializer<RawResponseContent> {
    protected readonly settings: adapter.deserializer.Settings<RawResponseContent>
    
    constructor(settings: adapter.deserializer.Settings<RawResponseContent>)
    {
        this.settings = settings
    }

    public responseContent(mediaType: specification.MediaType, content: RawResponseContent): Promise<adapter.component.Any> {
        const deserializerOverride = this.settings.responseContent.deserializerOverrides?.[mediaType]
        if (deserializerOverride !== undefined) return deserializerOverride(content)
        return this.settings.responseContent.defaultDeserializer(content, mediaType)
    }
}