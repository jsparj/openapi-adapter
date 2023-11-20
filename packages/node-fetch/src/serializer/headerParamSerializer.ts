import type { adapter } from "@openapi-adapter/core"
import { serializeParameterToString } from './serializeParameterToString'
import { SerializerError } from "../classes";

export function headerParamSerializer(
    _key: string,
    value: adapter.component.Any,
    serialization: adapter.serialization.HeaderSerialization,
    constants: adapter.serialization.ValueConstants,
): string
{
    const { explode } = serialization;

    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        value === null
    ) {
        return serializeParameterToString(value, true, constants)
    }
    else if (typeof value !== 'object') {
        throw new SerializerError('header/unsuppoerted-value-type', typeof value);
    }
    else if (Array.isArray(value)) {
        return value.map(item => serializeParameterToString(item, true, constants)).join(explode ? '.' : ',')
    }
    else
    {
        // isObject
        const valueKeys = Object.keys(value)
        if (explode) return valueKeys.map(valueKey => `${valueKey}=${serializeParameterToString((value as object)[valueKey as keyof object], true, constants)}`).join(',')
    
        return valueKeys.map(valueKey => `${valueKey},${serializeParameterToString((value as object)[valueKey as keyof object], true, constants)}`).join(',')
    }
}

