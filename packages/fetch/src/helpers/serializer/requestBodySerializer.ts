import type { adapter, specification } from "@openapi-adapter/core";

export function requestBodySerializer(
    mediaType: specification.MediaType,
    body: adapter.component.SchemaObject,
): BodyInit | null | undefined
{
    if (body === null || body === undefined) return body
    switch (mediaType)
    {
        case 'application/json':
            return JSON.stringify(body)
        
        default: 
            throw new Error(`Unsupported mediatype[${mediaType}] for requestBodySerializer, define your own serializer for this MediaType.`)
    }
}