import { adapter } from "@openapi-adapter/core";
import {serializeParameterToString} from './serializeParameterToString'

export function queryParameterSerializer(
    key: string,
    param: adapter.component.QueryParameter,
): string
{
    switch (param.style) {
        case 'form':
            return queryParameterFormSerializer(key, param)
        
        case 'pipeDelimited':
            return queryParameterDelimitedSerializer(key,param, '|')
        
        case 'spaceDelimited':
            return queryParameterDelimitedSerializer(key,param, '%20')
        
        case 'deepObject':
            return queryParameterDeepObjectSerializer(key, param)
        
        default: 
            throw new Error(`Unknown query parameter style[${param.style}]`)
    }
}

function queryParameterFormSerializer(
    key: string,
    param: adapter.component.QueryParameter,
): string
{
    const { value, explode, allowReserved } = param;
    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined'
    )
    {
        return `${key}=${serializeParameterToString(value, !!allowReserved)}`
    }
    else if (typeof value !== 'object')
    {
        throw new Error(`Unsupported path parameter type [${typeof value}]`);
    }
    else if (value === null)
    {
        throw new Error(`Unsupported path parameter type [null]`);
    }

    if (Array.isArray(value)) {
        if (explode)
            return value.map(item => `${key}=${serializeParameterToString(item, !!allowReserved)}`).join('&')
        
        return `${key}=${value.map(item => serializeParameterToString(item, !!allowReserved)).join(',')}`
    }

    // isObject
    const valueKeys = Object.keys(value)
    if(explode) return valueKeys.map(valueKey=>`${valueKey}=${serializeParameterToString(value[valueKey as keyof object],!!allowReserved)}`).join('&')
    
    return `${key}=${valueKeys.map(valueKey=>`${valueKey},${serializeParameterToString(value[valueKey as keyof object],!!allowReserved)}`).join(',')}`
}

function queryParameterDelimitedSerializer(
    key: string,
    param: adapter.component.QueryParameter,
    delimeter: '|' | '%20'
): string
{
    const { value, explode, allowReserved } = param;

    if (!Array.isArray(value))
        throw new Error('Query parameter of style[pipeDelimeted|spaceDelimeted] must be array in OpenApi 3.x')
    
    if(explode) return value.map(item => `${key}=${serializeParameterToString(item,!!allowReserved)}`).join('&')
    return `${key}=${value.map(item => serializeParameterToString(item, !!allowReserved)).join(delimeter)}`
}


function queryParameterDeepObjectSerializer(
    key: string,
    param: adapter.component.QueryParameter,
): string
{
    const { value, allowReserved } = param;
    if (!param.explode)
        throw new Error('explode=false is not valid for Query parameter of style[deepObject] in OpenApi 3.x')
    
    if (typeof value !== 'object' || Array.isArray(value) || value === null)
        throw new Error('Query parameter of style[deepObject] must be object in OpenApi 3.x')

    const paramKeys = Object.keys(value)   
    return paramKeys.map(paramKey => `${key}[${paramKey}]=${serializeParameterToString(value[paramKey as keyof object],!!allowReserved)}`).join('&')
}