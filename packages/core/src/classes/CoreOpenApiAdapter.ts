import { HttpStatusLabels } from '../enums'
import type {adapter, specification} from '../../types'
export abstract class CoreOpenApiAdapter<
    NS extends string,
    T extends adapter.Definition,
    Settings extends adapter.Settings,
    ISerializer extends adapter.ISerializer<any>,
> implements
    adapter.IFetch<NS, T, Settings>,
    adapter.IAuthorization<T>
{
    protected readonly namespace: NS
    protected readonly serializer: ISerializer

    protected abstract handleRequestAndDeserialization(
        pathId: string,
        method: specification.HttpMethod,
        pathParams: Record<string, adapter.request.PathParameter> | undefined,
        headers: Record<string, adapter.request.HeaderParameter> | undefined,
        query: Record<string, adapter.request.QueryParameter> | undefined,
        body: unknown,
        contentType?: specification.MediaType
    ): Promise<adapter.response.Result> 

    constructor(
        namespace: NS,
        serializer: ISerializer,
    )
    {
        this.namespace = namespace
        this.serializer = serializer
    }

    public async request<
        PathId extends adapter.path.Id<T>,
        HttpMethod extends adapter.path.HttpMethod<T, PathId>,
        RequestParams extends adapter.request.Params<T, PathId, HttpMethod>,
        ResponseDeserialization extends adapter.response.Deserialization<T, PathId, HttpMethod>,
    >(
        pathId: PathId,
        method: HttpMethod,
        requestParams: RequestParams,
        responseParams?: ResponseDeserialization
    ): Promise<adapter.Responses<
        NS,
        T,
        PathId,
        HttpMethod,
        ResponseDeserialization,
        Settings['response']
    >> {

        const {
            security,
            pathParams,
            headers,
            query,
            body
        } = requestParams as any;

        const {

        } = responseParams ?? {}

        const responseResult = await this.handleRequestAndDeserialization(
            pathId as string,
            method as specification.HttpMethod,
            pathParams,
            headers,
            query,
            body,
            responseParams as undefined | specification.MediaType
        )

        const response: adapter.response.GenericRespose = {
            ...this.resolveStatusCode(responseResult.statusCode),
            headers: responseResult.headers,
            data: responseResult.data
        }

        return response as unknown as adapter.Responses<
            NS,
            T,
            PathId,
            HttpMethod,
            ResponseDeserialization,
            Settings['response']
        >
    }

    initializeAuth(): void {
        throw new Error("Method not implemented.");
    }

    configureApiKey(): void {
        throw new Error("Method not implemented.");
    }
    configureOAuth2(): Promise<void> {

        const authorizationCode = ''
        const clientSecret = ''


        throw new Error("Method not implemented.");
    }
    configureOpenIdConnect(): void {
        throw new Error("Method not implemented.");
    }
    configureHttpAuthentication(): void {
        throw new Error("Method not implemented.");
    }   

    private resolveStatusCode(statusCode: number): Pick<adapter.response.GenericRespose, 'type' | 'code' | 'status' >
    {
        const statusLabel = HttpStatusLabels[statusCode as keyof typeof HttpStatusLabels] ?? `${statusCode}`
        let type: adapter.response.GenericType
        
        if (statusCode < 100) type = 'unknown'
        else if (statusCode < 200) type = 'info'
        else if (statusCode < 300) type = 'success'
        else if (statusCode < 400) type = 'redirect'
        else if (statusCode < 500) type = 'error:client'
        else if (statusCode < 600) type = 'error:server'
        else type = 'unknown'

        return {
            type: 'unknown',
            code: `${this.namespace}/${type}/${statusLabel}`,
            status: statusCode
        }
    }
}