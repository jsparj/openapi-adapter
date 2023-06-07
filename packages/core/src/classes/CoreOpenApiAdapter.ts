import { HttpStatusLabels } from "../enums";
import type {adapter, specification} from '../../types'
export abstract class CoreOpenApiAdapter<
    NS extends string,
    T extends adapter.path.Map<any>,
    ISerializer extends adapter.ISerializer<any>,
> implements adapter.IFetch<NS, T>
{
    protected readonly namespace: NS
    protected readonly serializer: ISerializer

    constructor(
        namespace: NS,
        serializer: ISerializer,
    )
    {
        this.namespace = namespace
        this.serializer = serializer
    }

    public async request<
        PathId extends keyof T = keyof T,
        HttpMethod extends keyof T[PathId] = keyof T[PathId],
    >(
        pathId: PathId,
        method: HttpMethod,
        request: adapter.RequestParams<T, PathId, HttpMethod>,
        responseOptions?: adapter.response.Options
    ): Promise<adapter.Responses<NS, T, PathId, HttpMethod>> {
        const {
            pathParams,
            headers,
            query,
            body
        } = request;

        const responseResult = await this.handleRequestAndDeserialization(
            pathId as string,
            method as specification.HttpMethod,
            pathParams,
            headers,
            query,
            body,
            responseOptions
        )

        const response: adapter.response.GenericRespose = {
            ...this.resolveStatusCode(responseResult.statusCode),
            headers: responseResult.headers,
            data: responseResult.data
        }

        return response as unknown as adapter.Responses<NS, T, PathId, HttpMethod>
    }

    protected abstract handleRequestAndDeserialization(
        pathId: string,
        method: specification.HttpMethod,
        pathParams: Record<string, adapter.component.PathParameter> | undefined,
        headers: Record<string, adapter.component.HeaderParameter> | undefined,
        query: Record<string, adapter.component.QueryParameter> | undefined,
        body: unknown,
        responseOptions?: adapter.response.Options
    ): Promise<adapter.response.Result> 

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