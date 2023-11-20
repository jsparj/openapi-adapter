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
    protected authDependency: Record<string, adapter.auth.Item> = {}

    protected abstract handleRequest(
        path: string,
        query: string,
        method: specification.HttpMethod,
        headers: Record<string, string>,
        body: SerializedRequestBody,
        mutualTLS: adapter.auth.MutualTLS|undefined
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

        const authRequirements = this.globalAuthRequirements.concat(security as string[])

        const auth = this.getAuthParams(authRequirements)
        const serializedCookie = this.serializer.cookieParameters({ ...auth.cookie, ...cookie })
        const serializedHeaders = this.serializer.headerParameters({ ...auth.header, ...header })
        const serializedBody = await this.serializer.requestBody(body)

        if (serializedCookie) serializedHeaders['Cookie'] = serializedCookie

        const responseResult = await this.handleRequest(
            this.serializer.pathString(pathId, path??{}),
            this.serializer.queryString({ ...auth.query, ...query }),
            method,
            serializedHeaders,
            serializedBody,
            auth.mutualTLS
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
        this.authDependency = authData
    }

    updateAuthData(authDependencies: adapter.auth.OptionalAuthData<T>): void {
        this.authDependency = {
            ...this.authDependency,
            ...authDependencies
        }
    }

    private getAuthParams(requirements: readonly string[]): {
        query: Record<string,string>
        header: Record<string,string>
        cookie: Record<string,string>
        mutualTLS: adapter.auth.MutualTLS|undefined
    }
    {
        const cookie: Record<string,string> = {}
        const header: Record<string,string> = {}
        const query: Record<string,string> = {}
        let mutualTLS: undefined|adapter.auth.MutualTLS = undefined

        requirements.forEach(requirement => {
            const dependency = this.authDependency[requirement]

            if (!dependency)
                throw new Error(`Required Auth[${requirement}] not configured yet.`)    
            
            switch (dependency.token?.in)
            {
                case 'cookie': cookie[dependency.token.name] = dependency.token.value; break
                case 'header': header[dependency.token.name] = dependency.token.value; break
                case 'query': query[dependency.token.name] = dependency.token.value; break
            }

            if(dependency.mutualTLS) {
                if(mutualTLS) throw "only one auth dependency with 'mutualTLS' field is supported"
                mutualTLS = dependency.mutualTLS
            }
        })

        return {cookie, header, query, mutualTLS}
    }

    private resolveStatusCode(statusCode: number): Pick<adapter.response.Generic,'status'|'code'>
    {
        const statusLabel = HttpStatusLabels[statusCode as keyof typeof HttpStatusLabels] ?? `${statusCode}`
        return {code: `${this.namespace}/${statusLabel}`, status: statusCode}
    }
}
