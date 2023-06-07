import type { adapter, specification } from "@openapi-adapter/core";

export function requestBodySerializer(
    body: adapter.component.SchemaObject,
    mediaType: specification.MediaType,
): Promise<BodyInit | null | undefined>
{
    if (body === null || body === undefined) return Promise.resolve(body)
    switch (mediaType)
    {
        case 'application/json':
            return Promise.resolve(JSON.stringify(body))
        
        default: 
            throw new Error(`Unsupported mediatype[${mediaType}] for requestBodySerializer, define your own serializer for this MediaType in settings.`)
    }
}