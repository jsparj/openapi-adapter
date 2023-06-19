import { OpenApiAdapter, adapter, specification, utility } from '@openapi-adapter/core';

export namespace FetchOpenApiAdapter {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type RawResponseData = ReadableStream<Uint8Array> | null
    export type Settings = {
        requestInit?: Partial<Omit<
            RequestInit,
            'method' | 'body'
        >> 
    } & adapter.settings.Object<SerializedRequestBody,RawResponseData>
}
export abstract class FetchOpenApiAdapter<
    NS extends string,
    T extends adapter.Definition<any>,
    Settings extends FetchOpenApiAdapter.Settings
    > extends OpenApiAdapter<
        NS,
        T,
        FetchOpenApiAdapter.SerializedRequestBody,
        FetchOpenApiAdapter.RawResponseData,
        Settings
    >
{
    constructor(
        namespace: NS,
        settings: Settings,
        serializer?: adapter.ISerializer<FetchOpenApiAdapter.SerializedRequestBody>,
        deserializer?: adapter.IDeserializer<FetchOpenApiAdapter.RawResponseData>,
    )
    {
        super(
            namespace,
            settings,
            serializer,
            deserializer
        )
    }

    protected override async handleRequest(
        url: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: FetchOpenApiAdapter.SerializedRequestBody,
    ): Promise<adapter.response.Result<FetchOpenApiAdapter.RawResponseData>> {
        
        const response = await fetch(
            url,
            {
                ...this.settings.requestInit,
                method,
                body,
                headers: new HeadersInit() {
                    ...this.settings.requestInit?.headers,
                    ...headers,
                },
            }
        );

        const responseHeaders: [string, string][] = []
        response.headers.forEach(
            (value, key) => responseHeaders.push([key, value])
        )

        const responseResult = {
            statusCode: response.status,
            headers: responseHeaders,
            data: response.body
        }

        return responseResult
    }
}
