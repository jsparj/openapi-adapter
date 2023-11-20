import {
    adapter,
    specification,
    CoreOpenApiAdapter,
} from '@openapi-adapter/core'
import { Agent, RequestOptions } from 'https'
import fetch, {BodyInit} from 'node-fetch'
import { Serializer } from './Serializer'
import { Deserializer } from './Deserializer'

export namespace OpenApiAdapter {
    export type SerializedRequestBody = BodyInit | null | undefined
    export type RawResponseData = NodeJS.ReadableStream  | null
    export type HandleRequestResult = adapter.response.Result<RawResponseData>
    export type Settings = {
        /**@remarks Will get overridden if same headers exist in request params. */
        globalHeaders?: Record<string, adapter.component.Any>
        requestInit?: Partial<Omit<RequestInit, 'method' | 'body' | 'headers'>> 
    } & adapter.settings.Object<SerializedRequestBody,RawResponseData>
}
export abstract class OpenApiAdapter<
    NS extends string,
    T extends adapter.Definition,
    Settings extends OpenApiAdapter.Settings
    > extends CoreOpenApiAdapter<
        NS,
        T,
        OpenApiAdapter.SerializedRequestBody,
        OpenApiAdapter.RawResponseData,
        Settings
    >
{

    private readonly host: string
    private agent:  RequestOptions['agent']|undefined

    constructor(
        namespace: NS,
        host: string,
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

        this.host = host
    }

    protected override async handleRequest(
        path: string,
        query: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: OpenApiAdapter.SerializedRequestBody,
        mutualTLS: adapter.auth.MutualTLS | undefined
    ): Promise<OpenApiAdapter.HandleRequestResult> 
    {
        if(mutualTLS && !this.agent) {
            this.agent = new Agent({
                ...mutualTLS as adapter.auth.tls.SecureContextOptions
            })
        }

        let response = await fetch(
            `${this.host}${path}${query}`,
            {
                ...this.settings.requestInit,
                method,
                body,
                agent: this.agent,
                headers: {
                    ...this.serializer.headerParameters(this.settings.globalHeaders),
                    ...headers
                },
            }
        );   
        const responseHeaders: Record<string, string> = {}   
        response.headers.forEach((value, key) => responseHeaders[key] = value)
        return {
            statusCode: response.status,
            headers: responseHeaders,
            data: response.body
        }
    }

    public static createDefaultSettings(
        globalHeaders?: Record<string, adapter.component.Any>,
        requestInit?: Partial<Omit<RequestInit, 'method' | 'body' | 'headers'>>,
    )
    {
        return <const>{
            globalHeaders,
            requestInit, 
            serialization: Serializer.defaultSettings,
            deserialization: Deserializer.defaultSettings
        }
    }
}
