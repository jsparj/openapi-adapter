import {
    adapter,
    specification,
    CoreOpenApiAdapter,
} from '@openapi-adapter/core'
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
        body?: adapter.component.Media,
        mutualTLS?: adapter.auth.MutualTLS
    ): Promise<OpenApiAdapter.HandleRequestResult> 
    {
        let credentialSource: RequestCredentials|undefined = undefined

        if (mutualTLS){
            if (typeof window === 'undefined')
            throw `mutualTLS are only supported in browser environments with this library, use @openapi-adapter/node-fetch in node environments.`

            if('credentialSource' in mutualTLS) credentialSource = mutualTLS.credentialSource
            else throw `"adapter.auth.tls.SecureContextOptions" is only supported in node environments for mutualTLS.`
        } 
        const serializedBody = await this.serializer.requestBody(body)

        const response = await window.fetch(
            `${this.host}${path}${query}`,
            {
                ...this.settings.requestInit,
                method,
                credentials: credentialSource,
                body: serializedBody,
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
