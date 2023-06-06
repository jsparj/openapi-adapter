import { adapter, specification } from "../types";

export abstract class CoreDeserializer implements adapter.IDeserializer {
    protected readonly settings: adapter.deserializer.Settings
    
    constructor(settings: adapter.deserializer.Settings)
    {
        this.settings = settings
    }

    abstract data<T>(data: adapter.component.SchemaObject, mediaType: specification.MediaType): T 
    abstract headerParameters<T>(parameters: Record<string, string> | undefined): T 
}