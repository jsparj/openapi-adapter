import { adapter } from "../../types";
import { serializeParameterToString } from './serializeParameterToString'

export function pathStringSerializer(
    key: string,
    value: adapter.component.Any,
    serialization: adapter.serialization.PathSerialization,
    constants: adapter.serialization.ValueConstants,
): string
{
    const {style, explode} = serialization

    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        value === null
    )
    {
        switch (serialization.style){
            case 'simple': return serializeParameterToString(value,true,constants);
            case 'label': return `.${serializeParameterToString(value,true,constants)}`
            case 'matrix': return `;${key}=${serializeParameterToString(value,true,constants)}`
            default: throw new Error(`unknown templatePrefix[${style}]`)
        }
    }
    else if (typeof value !== 'object')
    {
        throw new Error(`Unsupported path parameter type [${typeof value}]`);
    }

    const applyTemplatePrefixAndExplode = (
        ...values: [string][] | [string, string][]
    ): string =>
    {
        switch (style) {
            case 'simple':
                if(explode) return values.map(element => element.join('=')).join(',')
                return values.join(',');
            
            case 'label':
                if(explode) return `.${values.map(element => element.join('=')).join('.')}`
                return `.${values.join(',')}`
            
            case 'matrix':
                if(explode) return `;${values.map(element => element.length === 1?`${key}=${element[0]}`:`${element[0]}=${element[1]}`).join(';')}`;
                else return `;${key}=${values.join(',')}`
                
            default: throw new Error(`unknown templatePrefix[${style}]`)
        }   
    }

    if (Array.isArray(value))
    {
        return applyTemplatePrefixAndExplode(
            ...value.map(element => [serializeParameterToString(element, true, constants)] as [string])
        )
    }
    
    // isObject: 
    return applyTemplatePrefixAndExplode(
        ... Object.keys(value).map(objectKey => [objectKey, serializeParameterToString(value[objectKey as keyof object], true, constants)] as [string,string])
    )
}