import type { adapter, specification } from "@openapi-adapter/core"
import type { OpenApiAdapter } from '../classes'
import { streamUInt8ArrayToString } from "./streamUInt8ArrayToString"

export async function responseDataDeserializer(
    mediaType: specification.MediaType,
    data: OpenApiAdapter.RawResponseData,
): Promise<adapter.component.Any>
{
    if (data === null) return Promise.resolve(undefined)
    switch(mediaType)
    {
        case 'application/json':
            return streamUInt8ArrayToString(data).then(text => JSON.parse(text))
        
        default: 
            throw new Error(`Unsupported mediatype[${mediaType}] for responseContentDeserializer, define your own deserializer for this mediaType in settings.`)
  
    }
}