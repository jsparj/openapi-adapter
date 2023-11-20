export namespace SerializerError
{
    export type Parameter = 'path'|'cookie'|'header'| 'query'
    export type Code =
        | 'unknown'
        | `${Parameter}/unsuppoerted-value-type`
        | `${Parameter}/unsuppoerted-value-type-for-style`
        | `${Parameter}/unsuppoerted-serialization-style`
        | 'unsupported-media-type'
        | 'unserializable-value'
}


export class SerializerError extends Error {
    constructor(code: SerializerError.Code, message?: string) {
        super(`[${code}] ${message}`)
    }
}