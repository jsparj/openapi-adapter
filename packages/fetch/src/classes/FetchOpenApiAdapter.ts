import { CoreOpenApiAdapter, adapter, specification, utility } from '@openapi-adapter/core';
import { DefaultSerializer } from './DefaultSerializer';
import { DefaultDerializer } from './DefaultDeserializer';

export namespace FetchOpenApiAdapter {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type Settings = {
        host: string,
        globalRequestHeaders?: Record<string, string> 
        requestInit?: Partial<Omit<
            RequestInit,
            'method' | 'body' | 'headers'
        >> 
        deserializerSettings?: utility.DeepPartial<DefaultDerializer.Settings>
        serializerSettings?: utility.DeepPartial<DefaultSerializer.Settings>
    }
}
export abstract class FetchOpenApiAdapter<
    NS extends string,
    T extends adapter.path.Map<any>
> extends CoreOpenApiAdapter<NS, T, DefaultSerializer.Interface>
{
    protected readonly settings: FetchOpenApiAdapter.Settings
    protected readonly deserializer: DefaultDerializer.Interface
    protected readonly responseValidator?: adapter.IResponseValidator
    
    constructor(
        namespace: NS,
        settings: FetchOpenApiAdapter.Settings,
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
        pathParams: Record<string, adapter.component.PathParameter> | undefined,
        headers: Record<string, adapter.component.HeaderParameter> | undefined,
        query: Record<string, adapter.component.QueryParameter> | undefined,
        body: adapter.component.RequestBody,
        contentType?: specification.MediaType
    ): Promise<adapter.response.Result> {
        const path = this.serializer.pathString(pathId, pathParams);
        const queryString = this.serializer.queryString(query);

        const result = await fetch(
            `${this.settings.host}${path}${queryString}`,
            {
                method,
                body: await this.serializer.requestBody(body),
                headers: {
                    ...this.settings.globalRequestHeaders,
                    ...this.serializer.headerParameters(headers),
                },
                ...this.settings.requestInit,
            }
        );

        const responseHeaders: Record<string, string> = {}
        result.headers.forEach((value, key) => { responseHeaders[key] = value })
        
        const responseResult: adapter.response.Result = {
            statusCode: result.status,
            headers: responseHeaders,
            data: this.deserializer.responseContent(
                result.body,
                contentType
            ),
        }

        this.responseValidator?.validate(responseResult)

        return responseResult
    }
}
