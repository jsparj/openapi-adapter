import { adapter, specification, CoreDeserializer } from "@openapi-adapter/core";

export class DefaultDerializer extends CoreDeserializer
{
    constructor(settings?: adapter.deserializer.Settings)
    {
        super(
            settings ??
            {
                response: {
                    bodyMediaType: 'application/json',
                    headerMediaType: 'application/json',
                }
            }
        )
    }

    data<T>(data: adapter.component.SchemaObject, mediaType: specification.MediaType): T {
        throw new Error("Method not implemented.");
    }
    headerParameters<T>(parameters: Record<string, string> | undefined): T {
        throw new Error("Method not implemented.");
    }
}