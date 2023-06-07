import type {adapter, specification} from '../../types'
export abstract class CoreDeserializer<RawResponseContent> implements adapter.IDeserializer<RawResponseContent> {
    protected readonly settings: adapter.deserializer.Settings<RawResponseContent>
    
    constructor(settings: adapter.deserializer.Settings<RawResponseContent>)
    {
        this.settings = settings
    }

    public abstract responseContent(data: RawResponseContent, mediaType: specification.MediaType): Promise<unknown>
}