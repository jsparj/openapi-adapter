import { openapi } from "../types";

export function queryFormatter(parameters: Record<string, unknown>, settings: openapi.adapter.settings.QueryFormatterSettings): string {
        
    const flattenedQuery: Record<string, string> = {};
    Object.entries(parameters).forEach(([key, value]) => {
      switch (typeof value) {
        case "number":
        case "string":
        case 'bigint':
        case 'boolean':
            flattenedQuery[key] = value.toString();
            break;

        case 'undefined':
            flattenedQuery[key] = '';
              break
          
        case 'object':
          if (Array.isArray(value) && value.length > 0) {
            flattenedQuery[key] = value.join(",");
          }
          break;
      }
    });

    if (Object.keys(flattenedQuery).length > 0) {
      return `?${new URLSearchParams(flattenedQuery).toString()}`;
    }

    return ''
}