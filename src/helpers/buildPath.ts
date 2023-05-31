export function buildPath(
    pathId: string,
    pathParams: Record<string,string|number> | undefined,
): string {
    return `${this.settings.host}${pathId}`
}