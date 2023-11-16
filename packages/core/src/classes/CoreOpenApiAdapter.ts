import type {adapter, specification} from '../../types'
import { HttpStatusLabels } from '../enums'

export abstract class CoreOpenApiAdapter<
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
    protected globalAuthRequirements: string[] = []
    protected authItems: Record<string, adapter.auth.Item> = {}

    protected abstract handleRequest(
        url: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: SerializedRequestBody,
    ): Promise<adapter.response.Result<RawResponseData>> 

    constructor(
        namespace: NS,
        settings: Settings,
        serializer: adapter.ISerializer<SerializedRequestBody>,
        deserializer: adapter.IDeserializer<RawResponseData>
    )
    {
        this.namespace = namespace
        this.settings = settings
        this.serializer = serializer
        this.deserializer = deserializer
    }

    public async request<
        PathId extends adapter.path.Id<T>,
        HttpMethod extends adapter.path.HttpMethod<T, PathId>,
        RequestParams extends adapter.request.ExtractParams<T, PathId, HttpMethod, Settings['serialization']>,
    >(
        pathId: PathId,
        method: HttpMethod,
        requestParams: RequestParams,
    ): Promise<adapter.response.Object<
        NS,
        T,
        PathId,
        HttpMethod,
        Settings['deserialization']
    >> {

        const {
            security,
            path,
            cookie,
            header,
            query,
            body
        } = requestParams as adapter.request.Params;

        const auth = this.getAuthParams(security??[])
        const pathString = this.serializer.pathString(pathId, path??{})
        const queryString = this.serializer.queryString({ ...auth.query, ...query })
        const serializedCookie = this.serializer.cookieParameters({ ...auth.cookie, ...cookie })
        const serializedHeaders = this.serializer.headerParameters({ ...auth.headers, ...header })
        const serializedBody = await this.serializer.requestBody(body)

        if (serializedCookie) serializedHeaders['Cookie'] = serializedCookie
        
        const responseResult = await this.handleRequest(
            `${this.settings.host}${pathString}${queryString}`,
            method,
            serializedHeaders,
            serializedBody,
        )

        const responseDataMediaType = responseResult.headers['Content-Type'] as (specification.MediaType|undefined)
            ?? this.settings.deserialization.responseData.defaultMediaType 

        const response: adapter.response.Generic = {
            ...this.resolveStatusCode(responseResult.statusCode),
            headers: responseResult.headers,
            data: await this.deserializer.responseData(
                responseDataMediaType,
                responseResult.data
            )
        }

        return response as adapter.response.Object<
            NS,
            T,
            PathId,
            HttpMethod,
            Settings['deserialization']
        >
    }

    initializeAuth(authData: adapter.auth.RequiredAuthData<T>): void {
        this.globalAuthRequirements = Object.keys(authData);
        this.authItems = authData
    }

    updateAuthData(authData: adapter.auth.OptionalAuthData<T>): void {
        this.authItems = {
            ...this.authItems,
            ...authData
        }
    }

    private getAuthParams(pathAuthRequirements: string[])
    {
        const requirements = [
            ...this.globalAuthRequirements,
            ...pathAuthRequirements
        ]

        const cookie: Record<string,any> = {}
        const headers: Record<string,any> = {}
        const query: Record<string,any> = {}

        requirements.forEach(requirement => {
            const authItem = this.authItems[requirement]

            if (!authItem)
                throw new Error(`Required AuthParam[${requirement}] not configured yet.`)    
            
            const {token} = authItem
            
            switch (token.in)
            {
                case 'cookie': cookie[token.name] = token.value; break
                case 'header': headers[token.name] = token.value; break
                case 'query': query[token.name] = token.value; break
            }
        })

        return {cookie, headers, query}
    }

    private resolveStatusCode(statusCode: number): Pick<adapter.response.Generic,'status'|'code'>
    {
        const statusLabel = HttpStatusLabels[statusCode as keyof typeof HttpStatusLabels] ?? `${statusCode}`
        return {code: `${this.namespace}/${statusLabel}`, status: statusCode}
    }
}
