import type { adapter } from "@openapi-adapter/core"

export namespace fetchAdapter {
    export type Settings = {
        host: string,
        globalRequestHeaders?: Record<string, string> 
        requestInit?: Partial<Omit<
            RequestInit,
            'method' | 'body' | 'headers'
        >> 
        deserializerSettings?: adapter.deserializer.Settings
    }

    export interface ISerializer extends adapter.ISerializer<string,BodyInit | null | undefined>{ }
}