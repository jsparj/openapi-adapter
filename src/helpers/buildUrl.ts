import type {openapi} from '../types'

export function buildUrl(
    pathId: string,
    pathParams: Record<string, string|number> | undefined,
    query: Record<string, unknown> | undefined,
    settings: openapi.adapter.PathSettings
  ): string {
    var path = this.buildPath(pathId, pathParams);
    var queryString = this.settings

    let searchParams = "";

    if (query) {
      const flattenedQuery: Record<string, string> = {};
      Object.entries(query).forEach(([key, value]) => {
        switch (typeof value) {
          case "number":
          case "string":
            flattenedQuery[key] = value.toString();
            break;

          case "object":
            if (Array.isArray(value) && value.length > 0) {
              flattenedQuery[key] = value.join(",");
            }
            break;
        }
      });

      if (Object.keys(flattenedQuery).length > 0) {
        searchParams = `?${new URLSearchParams(flattenedQuery).toString()}`;
      }
    }

    return `${this.settings.host}${path}${searchParams}`;
  }