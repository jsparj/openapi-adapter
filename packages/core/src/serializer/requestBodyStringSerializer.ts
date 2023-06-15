import type { adapter, specification } from "../../types";

/**Supports only `mediaType: application/json` */
export function requestBodyStringSerializer(
    mediaType: specification.MediaType,
    body: adapter.component.Any,
): Promise<string | undefined>
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