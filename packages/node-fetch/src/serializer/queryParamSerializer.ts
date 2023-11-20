import type { adapter } from "@openapi-adapter/core";
import { serializeParameterToString } from './serializeParameterToString'
import { SerializerError } from "../classes";

export function queryParamSerializer(
    key: string,
    value: adapter.component.Any,
    serialization: adapter.serialization.QuerySerialization,
    constants: adapter.serialization.QueryConstants,
): string
{
   
    switch (serialization.style) {
        case 'form':
            return queryParameterFormSerializer(key, value, serialization, constants)
        
        case 'pipeDelimited':
            return queryParameterDelimitedSerializer(key, value, serialization, constants, '|')
        
        case 'spaceDelimited':
            return queryParameterDelimitedSerializer(key, value, serialization, constants, '%20')
        
        case 'deepObject':
            return queryParameterDeepObjectSerializer(key, value, serialization.allowReserved, constants)
        
        default: 
            throw new SerializerError('query/unsuppoerted-serialization-style', serialization.style)
    }
}

function queryParameterFormSerializer(
    key: string,
    value: adapter.component.Any,
    serialization: adapter.serialization.QuerySerialization,
    constants: adapter.serialization.QueryConstants
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
    value: adapter.component.Any,
    serialization: adapter.serialization.QuerySerialization,
    constants: adapter.serialization.QueryConstants,
    delimeter: '|' | '%20'
): string
{
    if (!Array.isArray(value))
        throw new SerializerError('query/unsuppoerted-value-type-for-style')
    
    if(serialization.explode) return value.map(item => `${key}=${serializeParameterToString(item,serialization.allowReserved, constants)}`).join('&')
    return `${key}=${value.map(item => serializeParameterToString(item, serialization.allowReserved, constants)).join(delimeter)}`
}


function queryParameterDeepObjectSerializer(
    key: string,
    value: adapter.component.Any,
    allowReserved: boolean,
    constants: adapter.serialization.QueryConstants
): string
{   
    if (typeof value !== 'object' || Array.isArray(value) || value === null)
        throw new SerializerError('query/unsuppoerted-value-type-for-style')

    const paramKeys = Object.keys(value)   
    return paramKeys.map(paramKey => `${key}[${paramKey}]=${serializeParameterToString(value[paramKey as keyof object],allowReserved, constants)}`).join('&')
}