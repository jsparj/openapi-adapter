import { CoreOpenApiAdapter, adapter, specification } from '@openapi-adapter/core';
import { fetchAdapter } from '../../types';
import { DefaultSerializer } from './DefaultSerializer';
import { DefaultDerializer } from './DefaultDeserializer';

export abstract class FetchOpenApiAdapter<
    NS extends string,
    T extends adapter.path.Map<any>
> extends CoreOpenApiAdapter<NS, T, fetchAdapter.ISerializer>
{
    protected readonly settings: fetchAdapter.Settings
    protected readonly deserializer: adapter.IDeserializer
    protected readonly responseValidator?: adapter.IResponseValidator
    
    constructor(
        namespace: NS,
        settings: fetchAdapter.Settings,
        serializer?: fetchAdapter.ISerializer,
        deserializer?: adapter.IDeserializer,
        responseValidator?: adapter.IResponseValidator
    )
    {
        super(
            namespace,
            serializer ?? new DefaultSerializer()
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
        responseOptions?: adapter.response.Options
    ): Promise<adapter.response.Result> {
        const path = this.serializer.pathParameters(pathId, pathParams);
        const queryString = this.serializer.queryParameters(query);

        const result = await fetch(
            `${this.settings.host}${path}${queryString}`,
            {
                method,
                body: this.serializer.body(body),
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
            headers: this.deserializer.headerParameters(
                responseHeaders,
                responseOptions?.overrides?.headerMediaTypes
            ),
            data: this.deserializer.data(
                await result.json(),
                responseOptions?.overrides?.dataMediaType
            ),
        }

        this.responseValidator?.validate(responseResult)

        return responseResult
    }
}
