import { adapter, CoreSerializer } from "@openapi-adapter/core";
import { serializeParameterToString } from './serializeParameterToString'

export function headerParameterSerializer(
    param: adapter.component.HeaderParameter,
    options: adapter.serializer.HeaderOptions,
): string
{
    let value: adapter.component.SchemaObject
    let serialization: Required<adapter.component.HeaderParameterSerialization>
    const {constants} = options
    
    if (typeof param === 'object' && param !== null && '__serialization__' in param)
    {
        value = param['value' as keyof typeof param] as adapter.component.SchemaObject
        serialization = {
            ...CoreSerializer.defaultHeaderSerialization,
            ...param['__serialization__'] as adapter.component.HeaderParameterSerialization
        }
    }
    else
    {
        value = param
        serialization = CoreSerializer.defaultHeaderSerialization
    }
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

