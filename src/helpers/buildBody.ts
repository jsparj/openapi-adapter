export function buildBody(body?: unknown): string|undefined {
    if (body === undefined) return undefined;
    return JSON.stringify(body)
}
