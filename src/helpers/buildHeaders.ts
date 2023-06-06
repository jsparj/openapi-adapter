import type { openapi } from "../../core/types"


export function buildHeaders(
    headers: Record<string, unknown> | undefined,
    settings: openapi.adapter.PathSettings
): Headers
{
    return new Headers({
        ...headers,
        ...settings.headers,
    })
}