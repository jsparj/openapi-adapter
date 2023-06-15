import { adapter } from "@openapi-adapter/core";
import { serializeParameterToString } from './serializeParameterToString'

export function headerParameterSerializer(
    value: adapter.component.Any,
    serialization: adapter.serialization.HeaderSerialization,
    options: adapter.serialization.HeaderOptions,
): string
{
    const { constants } = options
    const { explode } = serialization;

    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        value === null
    )
    {
        return serializeParameterToString(value, true, constants)
    }
    else if (typeof value !== 'object')
    {
        throw new Error(`Unsupported path parameter type [${typeof value}]`);
    }
    
    if (Array.isArray(value)) {
        return value.map(item => serializeParameterToString(item, true, constants)).join(explode? '.' : ',')
    }

    // isObject
    const valueKeys = Object.keys(value)
    if(explode) return valueKeys.map(valueKey=>`${valueKey}=${serializeParameterToString((value as object)[valueKey as keyof object], true, constants)}`).join(',')
    
    return valueKeys.map(valueKey=>`${valueKey},${serializeParameterToString((value as object)[valueKey as keyof object], true, constants)}`).join(',')
}

