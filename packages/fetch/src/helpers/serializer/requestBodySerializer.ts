import type { adapter, specification } from "@openapi-adapter/core";

export function requestBodySerializer(
    mediaType: specification.MediaType,
    body: adapter.component.Any,
): Promise<BodyInit | null | undefined>
{
    switch (mediaType)
    {
        case 'application/json':
            if(body === undefined) return Promise.resolve(undefined)
            return Promise.resolve(JSON.stringify(body))
        
        default: 
            throw new Error(
                `Unsupported mediatype[${mediaType}] for requestBodySerializer, define your own serializer for this MediaType in settings.`
            )
    }
}