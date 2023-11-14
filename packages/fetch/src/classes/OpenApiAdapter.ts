import {
    adapter,
    specification,
    CoreOpenApiAdapter,
} from '@openapi-adapter/core'
import {
    headerParamSerializer,
    requestBodyStringSerializer,
    queryParamSerializer,
    pathParamSerializer,
    cookieParamSerializer, 
} from '../serializer'
import { responseDataDeserializer } from '../deserializer'
import { Serializer } from './Serializer'
import { Deserializer } from './Deserializer'

export namespace OpenApiAdapter {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type RawResponseData = ReadableStream<Uint8Array> | null
    export type HandleRequestResult = adapter.response.Result<RawResponseData>
    
    export type Settings = {
        /**@remarks Will get overridden if same headers exist in request params. */
        globalHeaders?: Record<string, adapter.component.Any>
        requestInit?: Partial<Omit<RequestInit, 'method' | 'body' | 'headers'>> 
    } & adapter.settings.Object<SerializedRequestBody,RawResponseData>
}
export abstract class OpenApiAdapter<
    NS extends string,
    T extends adapter.Definition<any>,
    Settings extends OpenApiAdapter.Settings
    > extends CoreOpenApiAdapter<
        NS,
        T,
        OpenApiAdapter.SerializedRequestBody,
        OpenApiAdapter.RawResponseData,
        Settings
    >
{
    constructor(
        namespace: NS,
        settings: Settings,
        serializer?: adapter.ISerializer<OpenApiAdapter.SerializedRequestBody>,
        deserializer?: adapter.IDeserializer<OpenApiAdapter.RawResponseData>,
    )
    {
        super(
            namespace,
            settings,
            serializer = serializer ?? new Serializer(settings.serialization),
            deserializer = deserializer ?? new Deserializer(settings.deserialization)
        )
    }

    protected override async handleRequest(
        url: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: OpenApiAdapter.SerializedRequestBody,
    ): Promise<OpenApiAdapter.HandleRequestResult> {
        
        const response = await fetch(
            url,
            {
                ...this.settings.requestInit,
                method,
                body,
                headers: {
                    ...this.serializer.headerParameters(this.settings.globalHeaders),
                    ...headers
                },
            }
        );

        const responseHeaders: Record<string, string> = {}
        response.headers.forEach((value, key) => responseHeaders[key] = value)

        const responseResult = {
            statusCode: response.status,
            headers: responseHeaders,
            data: response.body
        }

        return responseResult
    }


    public static createDefaultSettings(
        host: string,
        globalHeaders?: Record<string, adapter.component.Any>,
        requestInit?: Partial<Omit<RequestInit, 'method' | 'body' | 'headers'>>,
    ) : OpenApiAdapter.Settings
    {
        return <const>{
            host,
            globalHeaders,
            requestInit, 
            serialization: Serializer.defaultSettings,
            deserialization: Deserializer.defaultSettings
        }
    }
}
