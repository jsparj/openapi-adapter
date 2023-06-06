import { HttpStatusLabels } from "../enums"
import type { raw, openapi } from "../../core/types"

export async function responseMapper<
    NS extends string,
    T extends raw.OpenAPIObject,
    PathId extends keyof T['paths'],
    Method extends keyof T['paths'][PathId],
    Operation extends openapi.path.Operation<T, PathId, Method>
    >(
    namespace: NS,
    response: Response,
    settings: openapi.adapter.PathSettings
): Promise<openapi.adapter.FetchResult<NS, T, PathId, Method, Operation>>
{
    const content = await response.json()
    const headers: Record<string, string> = {}

    response.headers.forEach((value: string, key: string, parent: Headers) => {
        headers['key'] = value
    })

    let result: openapi.response.Universal = {
        type: 'unknown',
        code: `${namespace}/${response.status}`,
        headers,
        content,
        response,
    }

    if (response.status < 100 || response.status >= 600) return result as any

    else if (response.status < 200) result = {
        type: 'unknown',
        code: `${namespace}/info/${HttpStatusLabels[response.status]??'unknown'}`,
        headers,
        content,
        response,
    }
    else result = {
        type: 'unknown',
        code: `${namespace}/${response.status}`,
        headers,
        content,
        response,
    }

    return result as any
}