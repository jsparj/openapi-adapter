import type { specification } from "@openapi-adapter/core";
import type { DefaultDerializer } from "../../classes";
import { streamUInt8ArrayToString } from "./streamUInt8ArrayToString";

export async function responseContentDeserializer(
    content: DefaultDerializer.RawResponseContent,
    mediaType: specification.MediaType
): Promise<unknown>
{
    if (content === null) return Promise.resolve(undefined)
    switch(mediaType)
    {
        case 'application/json':
            return streamUInt8ArrayToString(content).then(text => JSON.parse(text))
        
        default: 
            throw new Error(`Unsupported mediatype[${mediaType}] for responseContentDeserializer, define your own deserializer for this mediaType in settings.`)
  
    }
}