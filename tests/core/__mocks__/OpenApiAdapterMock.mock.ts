import {
    adapter,
    OpenApiAdapter,
    specification
} from '@openapi-adapter/core'
import { IteratedTestApiDefinition } from '../../iterated/__mocks__/TestApi.definition'

type SerializedRequestBody = string | undefined
type RawResponseData = string | undefined

function serializeRequestBody(
    mediaType: specification.MediaType,
    value: adapter.component.Any
): Promise<SerializedRequestBody>
{   
    switch(mediaType)
    {
        case 'application/json':
            if (value === undefined) return Promise.resolve(undefined)
            return Promise.resolve(JSON.stringify(value))
        
        default: 
            throw new Error(`Unsupported MediaType`)
    }
}

function deserializeResponseData(
    mediaType: specification.MediaType,
    data: RawResponseData
): Promise<adapter.component.Any>
{
    switch (mediaType)
    {
        case 'application/json':
            if(data === undefined) return Promise.resolve(undefined)
            return Promise.resolve(JSON.parse(data))

        default:
            throw new Error(`Unsupported MediaType`)
    }
}

const settings = OpenApiAdapter.createDefaultSettings<SerializedRequestBody, RawResponseData>(
    'http://localhost:3000',
    serializeRequestBody,
    deserializeResponseData
)

type DefaultSettings = typeof settings

type LastRequest = {
    url: string
    method: specification.HttpMethod
    headers: Record<string, string>
    body: SerializedRequestBody
}


export class OpenApiAdapterMock extends OpenApiAdapter<
    'test-api',
    IteratedTestApiDefinition,
    SerializedRequestBody,
    RawResponseData,
    DefaultSettings
>
{
    protected nextResponse?: adapter.response.Result<RawResponseData> = undefined
    protected lastRequest?: LastRequest= undefined

    constructor()
    {
        super('test-api', settings)
    }

    public __setNextResponse__(nextResponse: adapter.response.Result<RawResponseData>)
    {
        this.initializeAuth({
            globalHeaderApiKey: {
                type: 'apiKey',
                payload: {
                    in: 'header',
                    name: 'global-apikey',
                    apiKey: ''
                }
            },
        })
        this.nextResponse = nextResponse
    }

    public __getLastRequst__(): LastRequest|undefined
    {
        return this.lastRequest
    }
   
    protected override handleRequest(
        url: string,
        method: specification.HttpMethod,
        headers: Record<string,string>,
        body: SerializedRequestBody,
    ): Promise<adapter.response.Result<RawResponseData>>
    {
        this.lastRequest = {
            url,
            method,
            headers,
            body
        }
        return Promise.resolve(this.nextResponse!)
    }
}