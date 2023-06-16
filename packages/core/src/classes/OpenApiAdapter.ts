import { HttpStatusLabels } from '../enums'
import type {adapter, specification} from '../../types'
import { Serializer } from './Serializer'
import { Deserializer } from './Deserializer'
import { headerParameterSerializer, pathStringSerializer, queryStringSerializer } from '../serializer'
export abstract class OpenApiAdapter<
    NS extends string,
    T extends adapter.Definition,
    SerializedRequestBody,
    RawResponseData,
    Settings extends adapter.settings.Object<SerializedRequestBody,RawResponseData>
> implements
    adapter.IFetch<NS, T, Settings>,
    adapter.IAuthorization<T>
{
    protected readonly namespace: NS
    protected readonly settings: Settings
    protected readonly serializer: adapter.ISerializer<SerializedRequestBody>
    protected readonly deserializer: adapter.IDeserializer<RawResponseData>
    protected readonly authData: Record<adapter.auth.Id<T>, any> = {}
    protected globalAuthRequirements: adapter.auth.Id<T>[] = []

    protected abstract handleRequest(
        url: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: SerializedRequestBody,
    ): Promise<adapter.response.Result<RawResponseData>> 

    constructor(
        namespace: NS,
        settings: Settings,
        serializer?: adapter.ISerializer<SerializedRequestBody>,
        deserializer?: adapter.IDeserializer<RawResponseData>
    )
    {
        this.namespace = namespace
        this.settings = settings
        this.serializer = serializer ?? new Serializer(settings.serialization)
        this.deserializer = deserializer ?? new Deserializer(settings.deserialization)
    }

    public async request<
        PathId extends adapter.path.Id<T>,
        HttpMethod extends adapter.path.HttpMethod<T, PathId>,
        RequestParams extends adapter.request.ExtractParams<T, PathId, HttpMethod, Settings['serialization']>,
        ResponseOptions extends adapter.settings.ExtractResponseOptions<T, PathId, HttpMethod>,
    >(
        pathId: PathId,
        method: HttpMethod,
        requestParams: RequestParams,
        responseOptions?: ResponseOptions
    ): Promise<adapter.response.Object<
        NS,
        T,
        PathId,
        HttpMethod,
        ResponseOptions,
        Settings['deserialization']
    >> {

        const {
            security,
            path,
            headers,
            query,
            body
        } = requestParams as adapter.request.Params;

        this.getAuthRequirements(security)

        const pathString = this.serializer.pathString(pathId, path)
        const queryString = this.serializer.queryString(query)
        const serializedHeaders = this.serializer.headerParameters(
            {
                ...headers,
            }
        )
        const serializedBody = await this.serializer.requestBody(body)

        const responseResult = await this.handleRequest(
            `${this.settings.host}${pathString}${queryString}`,
            method,
            serializedHeaders,
            serializedBody,
        )
        
        const responseDataMediaType = responseResult.headers['content-type'] as (specification.MediaType|undefined)
            ?? responseOptions?.data
            ?? this.settings.deserialization.responseData.defaultMediaType 

        const response: adapter.response.Generic = {
            ...this.resolveStatusCode(responseResult.statusCode),
            headers: await this.deserializer.headers(responseResult.headers),
            data: await this.deserializer.responseData(
                responseDataMediaType,
                responseResult.data
            )
        }

        return response as unknown as adapter.response.Object<
            NS,
            T,
            PathId,
            HttpMethod,
            ResponseOptions,
            Settings['deserialization']
        >
    }

    initializeAuth(authData: adapter.auth.RequiredAuthData<T>): void {
        throw new Error("Method not implemented.");
    }

    updateAuthData(): void {
        throw new Error("Method not implemented.");
    }

    private getAuthRequirements(pathAuthRequirements: adapter.auth.Id<T>[])
    {
        const requirements = [
            ...this.globalAuthRequirements,
            ...pathAuthRequirements
        ]

        const path: adapter.request.PathParams = {}
        const headers: adapter.request.HeaderParams = {}
        const query: adapter.request.QueryParams = {}

        requirements.forEach(requirement => {

        })

        return {
            path,
            headers,
            query
        }
    }

    private resolveStatusCode(statusCode: number): Pick<adapter.response.Generic,'status'|'code'>
    {
        const statusLabel = HttpStatusLabels[statusCode as keyof typeof HttpStatusLabels] ?? `${statusCode}`
        
        return {
            code: `${this.namespace}/${statusLabel}`,
            status: statusCode
        }
    }

    public static createDefaultSettings<SerializedRequestBody, RawResponseData>(
        host: string,
        requestBodySerializaer: adapter.serialization.RequestBodySerializer<SerializedRequestBody>,
        responseDataDeserializer: adapter.deserializer.ResponseDataDeserializer<RawResponseData>
    ): adapter.settings.Default<SerializedRequestBody, RawResponseData> {
        return {
            host,
            serialization: Serializer.createDefaultSettings(requestBodySerializaer),
            deserialization: Deserializer.createDefaultSettings(responseDataDeserializer)
        }
    }
}
