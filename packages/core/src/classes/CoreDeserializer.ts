import type {adapter, specification} from '../../types'
export abstract class CoreDeserializer implements adapter.IDeserializer {
    protected readonly settings: adapter.deserializer.Settings
    
    constructor(settings: adapter.deserializer.Settings)
    {
        this.settings = settings
    }

    public abstract responseData<T>(data: adapter.component.SchemaObject, mediaType: specification.MediaType): T 
    public abstract headerParameters<T>(parameters: Record<string, string> | undefined): T 
}