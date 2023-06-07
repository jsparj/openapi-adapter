import { adapter, CoreSerializer } from "@openapi-adapter/core";
import { serializeParameterToString } from './serializeParameterToString'

export function queryStringSerializer(
    key: string,
    param: adapter.component.QueryParameter,
    options: adapter.serializer.QueryStringOptions
): string
{
    let value: adapter.component.SchemaObject
    let serialization: Required<adapter.component.QueryParameterSerialization>
    
    if (typeof param === 'object' && param !== null && '__serialization__' in param)
    {
        value = param['value' as keyof typeof param] as adapter.component.SchemaObject
        serialization = {
            ...CoreSerializer.defaultQuerySerialization,
            ...param['__serialization__'] as adapter.component.QueryParameterSerialization
        }
    }
    else
    {
        value = param
        serialization = CoreSerializer.defaultQuerySerialization
    }

    switch (serialization.style) {
        case 'form':
            return queryParameterFormSerializer(key, value, serialization, options.constants)
        
        case 'pipeDelimited':
            return queryParameterDelimitedSerializer(key, value, serialization, options.constants, '|')
        
        case 'spaceDelimited':
            return queryParameterDelimitedSerializer(key, value, serialization, options.constants, '%20')
        
        case 'deepObject':
            return queryParameterDeepObjectSerializer(key, value, serialization.allowReserved, options.constants)
        
        default: 
            throw new Error(`Unknown query parameter style[${serialization.style}]`)
    }
}

function queryParameterFormSerializer(
    key: string,
    value: adapter.component.SchemaObject,
    serialization: Required<adapter.component.QueryParameterSerialization>,
    constants: adapter.serializer.ValueConstants
): string
{
    const {explode, allowReserved } = serialization;
    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        value === null
    )
    {
        return `${key}=${serializeParameterToString(value, allowReserved, constants)}`
    }
    else if (typeof value !== 'object')
    {
        throw new Error(`Unsupported path parameter type [${typeof value}]`);
    }

    if (Array.isArray(value)) {
        if (explode)
            return value.map(item => `${key}=${serializeParameterToString(item, allowReserved,constants)}`).join('&')
        
        return `${key}=${value.map(item => serializeParameterToString(item, allowReserved, constants)).join(',')}`
    }

    // isObject
    const valueKeys = Object.keys(value)
    if(explode) return valueKeys.map(valueKey=>`${valueKey}=${serializeParameterToString(value[valueKey as keyof object],allowReserved,constants)}`).join('&')
    
    return `${key}=${valueKeys.map(valueKey=>`${valueKey},${serializeParameterToString(value[valueKey as keyof object],allowReserved, constants)}`).join(',')}`
}

function queryParameterDelimitedSerializer(
    key: string,
    value: adapter.component.SchemaObject,
    serialization: Required<adapter.component.QueryParameterSerialization>,
    constants: adapter.serializer.ValueConstants,
    delimeter: '|' | '%20'
): string
{
    if (!Array.isArray(value))
        throw new Error('Query parameter of style[pipeDelimeted|spaceDelimeted] must be array in OpenApi 3.x')
    
    if(serialization.explode) return value.map(item => `${key}=${serializeParameterToString(item,serialization.allowReserved, constants)}`).join('&')
    return `${key}=${value.map(item => serializeParameterToString(item, serialization.allowReserved, constants)).join(delimeter)}`
}


function queryParameterDeepObjectSerializer(
    key: string,
    value: adapter.component.SchemaObject,
    allowReserved: boolean,
    constants: adapter.serializer.ValueConstants
): string
{   
    if (typeof value !== 'object' || Array.isArray(value) || value === null)
        throw new Error('Query parameter of style[deepObject] must be object in OpenApi 3.x')

    const paramKeys = Object.keys(value)   
    return paramKeys.map(paramKey => `${key}[${paramKey}]=${serializeParameterToString(value[paramKey as keyof object],allowReserved, constants)}`).join('&')
}