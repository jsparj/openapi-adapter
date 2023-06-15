import { CoreOpenApiAdapter, adapter, specification, utility } from '@openapi-adapter/core';
import { DefaultSerializer } from './DefaultSerializer';
import { DefaultDerializer } from './DefaultDeserializer';

export namespace FetchOpenApiAdapter {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type Settings = {
        requestInit?: Partial<Omit<
            RequestInit,
            'method' | 'body'
        >> 
        deserializerSettings?: utility.DeepPartial<DefaultDerializer.Settings>
        serializerSettings?: utility.DeepPartial<DefaultSerializer.Settings>
    } & adapter.Settings
}
export abstract class FetchOpenApiAdapter<
    NS extends string,
    T extends adapter.Definition<any>,
    Settings extends FetchOpenApiAdapter.Settings
> extends CoreOpenApiAdapter<NS, T, Settings, DefaultSerializer.Interface>
{
    protected readonly settings: FetchOpenApiAdapter.Settings
    protected readonly deserializer: DefaultDerializer.Interface
    protected readonly responseValidator?: adapter.IResponseValidator
    
    constructor(
        namespace: NS,
        settings: Settings,
        serializer?: DefaultSerializer.Interface,
        deserializer?: DefaultDerializer.Interface,
        responseValidator?: adapter.IResponseValidator
    )
    {
        super(
            namespace,
            serializer ?? new DefaultSerializer(settings.serializerSettings)
        )
        this.settings = settings;
        this.deserializer = deserializer ?? new DefaultDerializer(settings.deserializerSettings)
        this.responseValidator = responseValidator
    }

    protected override async handleRequestAndDeserialization(
        pathId: string,
        method: specification.HttpMethod,
        pathParams: Record<string, adapter.request.PathParameter>,
        headers: Record<string, adapter.request.HeaderParameter>,
        query: Record<string, adapter.request.QueryParameter>,
        body: adapter.component.Media,
    ): Promise<adapter.response.Result> {
        const path = this.serializer.pathString(pathId, pathParams);
        const queryString = this.serializer.queryString(query);

        const result = await fetch(
            `${this.settings.host}${path}${queryString}`,
            {
                ...this.settings.requestInit,
                method,
                body: await this.serializer.requestBody(body),
                headers: {
                    ...this.settings.requestInit?.headers,
                    ...this.serializer.headerParameters(headers),
                },
            }
        );

        const responseHeaders: Record<string, string> = {}
        result.headers.forEach((value, key) => { responseHeaders[key] = value })
        
        const responseResult: adapter.response.Result = {
            statusCode: result.status,
            headers: responseHeaders,
            data: await this.deserializer.responseContent(
                result.body
            ),
        }

        this.responseValidator?.validate(responseResult)

        return responseResult
    }
}
