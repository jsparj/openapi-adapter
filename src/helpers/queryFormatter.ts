import { openapi } from "../../core/types";

export function queryFormatter(parameters: Record<string, unknown>, settings: openapi.adapter.settings.QueryFormatterSettings): string {
        
    const query: Record<string, string> = {};
    Object.entries(parameters).forEach(([key, value]) => {
      switch (typeof value) {
        case "number":
            query[key] = settings.numberFormatter(value)
            break;
          
        case "string":
            query[key] = settings.stringFormatter(value)
            break;
          
        case 'bigint':
            query[key] = settings.bigintFormatter(value)
            break;
          
        case 'boolean':
            query[key] = settings.booleanFormatter(value)
            break;

        case 'undefined':
            query[key] = settings.undefinedValue;
            break
          
        case 'object':
            if(value === null) query[key] = settings.nullValue
            else if (Array.isArray(value)) query[key] = settings.arrayFormatter(value as unknown[])
            else settings.objectFormatter(value)
            break;
      }
    });

    if (Object.keys(query).length > 0) {
      return `?${new URLSearchParams(query).toString()}`;
    }

    return ''
}