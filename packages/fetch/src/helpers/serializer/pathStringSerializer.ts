import { adapter } from "@openapi-adapter/core";
import {serializeParameterToString} from './serializeParameterToString'

export function pathStringSerializer(
    key: string,
    value: adapter.component.PathParameter,
    templatePrefix: '.' | ';' | undefined,
    explode: boolean
): string
{
    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string'
    )
    {
        switch (templatePrefix){
            case undefined: return value.toString();
            case '.': return `.${value.toString()}`
            case ';': return `;${key}=${value.toString()}`
            default: throw new Error(`unknown templatePrefix[${templatePrefix}]`)
        }
    }
    else if (typeof value !== 'object' || value === null)
    {
        throw new Error(`Unsupported path parameter type [${typeof value}]`);
    }

    const applyTemplatePrefixAndExplode = (
        ...values: [string][] | [string, string][]
    ): string =>
    {
        switch (templatePrefix) {
            case undefined:
                if(explode) return values.map(element => element.join('=')).join(',')
                return values.join(',');
            
            case '.':
                if(explode) return `.${values.map(element => element.join('=')).join('.')}`
                return `.${values.join(',')}`
            
            case ';':
                if(explode) return `;${values.map(element => element.length === 1?`${key}=${element[0]}`:`${element[0]}=${element[1]}`).join(';')}`;
                else return `;${key}=${values.join(',')}`
                
            default: throw new Error(`unknown templatePrefix[${templatePrefix}]`)
        }   
    }

    if (Array.isArray(value))
    {
        return applyTemplatePrefixAndExplode(
            ...value.map(element => [serializeParameterToString(element, false)] as [string])
        )
    }
    
    // isObject: 
    return applyTemplatePrefixAndExplode(
        ... Object.keys(value).map(objectKey => [objectKey, serializeParameterToString(value[objectKey as keyof object], false)] as [string,string])
    )
}