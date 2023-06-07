export function serializeToString(value: unknown):string
{
    switch (typeof value)
    {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
            return value.toString()
        
        case 'object':
            return JSON.stringify(value)
        
        case 'undefined':
            return ''
        
        default: 
            throw new Error(`Unserializable value type [${typeof value}]`)
    }
}