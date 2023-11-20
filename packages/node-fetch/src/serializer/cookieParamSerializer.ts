import type { adapter } from "@openapi-adapter/core"
import { serializeParameterToString } from './serializeParameterToString'
import { SerializerError } from "../classes";

export function cookieParamSerializer(
    key: string,
    value: adapter.component.Any,
    _serialization: adapter.serialization.CookieSerialization,
    constants: adapter.serialization.CookieConstants,
): string {
    if (
        typeof value === 'bigint' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        value === null
    ) {
        return `${key}=${serializeParameterToString(value, true, constants)}`
    }
    else if (typeof value !== 'object') {
        throw new SerializerError('cookie/unsuppoerted-value-type', typeof value);
    }
    else if (Array.isArray(value)) {   
        return `${key}=${value.map(item => serializeParameterToString(item, true, constants)).join(',')}`
    }

    return `${key}=${Object.keys(value)
        .map(valueKey => `${valueKey},${serializeParameterToString(value[valueKey as keyof object], true, constants)}`)
        .join(',')
    }`
}
