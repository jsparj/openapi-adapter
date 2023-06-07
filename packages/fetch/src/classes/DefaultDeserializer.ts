import { adapter, specification, CoreDeserializer, utility } from "@openapi-adapter/core";
import { overrideDeep, responseContentDeserializer } from "../helpers";

export namespace DefaultDerializer {
    export type RawResponseContent = ReadableStream<Uint8Array> | null
    export type Interface = adapter.IDeserializer<RawResponseContent>
    export type Settings = adapter.deserializer.Settings<RawResponseContent>
}

export class DefaultDerializer
    extends CoreDeserializer<DefaultDerializer.RawResponseContent>
    implements DefaultDerializer.Interface
{
    constructor(settings?: utility.DeepPartial<DefaultDerializer.Settings>)
    {
        super(
            overrideDeep<DefaultDerializer.Settings>(
                {
                    responseContent:{
                        defaultDeserializer: responseContentDeserializer,
                    }
                },
                settings ?? {}
            )
        )
    }

    public responseContent(content: DefaultDerializer.RawResponseContent, mediaType: specification.MediaType): Promise<unknown> {
        const deserializerOverride = this.settings.responseContent.deserializerOverrides?.[mediaType]
        if (deserializerOverride !== undefined) return deserializerOverride(content)
        return this.settings.responseContent.defaultDeserializer(content, mediaType)
    }
}