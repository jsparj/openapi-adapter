export namespace DeserializerError
{
    export type Code =
        | 'undeserializable-media-type'
}


export class DeserializerError extends Error {
    constructor(code: DeserializerError.Code, message?: string) {
        super(`[${code}] ${message}`)
    }
}