import type { adapter } from "@openapi-adapter/core"

export function serializeToString(value: unknown, constants: adapter.serializer.ValueConstants):string
{   
    switch (typeof value)
    {
        case 'undefined':
            return constants.undefinedString

        case 'boolean':
            return value ? constants.trueString : constants.falseString

        case 'bigint':
        case 'number':
        case 'string':
            return value.toString()
        
        case 'object':
            if (value === null) return constants.nullString
            return JSON.stringify(value)
        
        
        
        default: 
            throw new Error(`Unserializable value type [${typeof value}]`)
    }
}