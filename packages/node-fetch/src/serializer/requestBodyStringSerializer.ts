import type { adapter, specification } from "@openapi-adapter/core";
import { SerializerError } from "../classes";
import { BodyInit } from "node-fetch";

/**Supports only `mediaType: application/json` */
export function requestBodyStringSerializer(
    mediaType: specification.MediaType,
    body: adapter.component.Any,
): Promise<BodyInit | undefined>
{
    switch (mediaType)
    {
        case 'application/json':
            if(body === undefined) return Promise.resolve(undefined)
            return Promise.resolve(JSON.stringify(body))
        
        default: 
            throw new SerializerError('unsupported-media-type', mediaType)
    }
}