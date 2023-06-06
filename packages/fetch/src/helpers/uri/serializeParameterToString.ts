import {serializeToString} from './serializeToString'

export function serializeParameterToString(value: unknown, allowReserved: boolean): string
{
    let serialized = serializeToString(value)
    if (allowReserved) return serialized
    
    const utf8CodeUnits: Record<string,string> = {
        ':': '%3A',
        '/': '%2F',
        '?': '%3F',
        '#': '%23',
        '[': '%5B',   
        ']': '%5D',
        '@': '%40',
        '!': '%21',
        '$': '%24',
        '&': '%26',
        '(': '%28',
        ')': '%29',
        '*': '%2A',
        '+': '%2B',
        ',': '%2C',
        ';': '%3B',
        '=': '%3D'
    };

    let output = '';
    for (let i = 0; i < serialized.length; i++) {
        output += utf8CodeUnits[serialized[i]] || serialized[i];
    }

    return output
} 