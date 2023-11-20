import type { adapter } from '@openapi-adapter/core'
import type { OpenApiAdapter } from './OpenApiAdapter'
import { COOKIE_CONSTANTS, VALUE_CONSTANTS, QUERY_CONSTANTS } from '../constants'
import { cookieParamSerializer, getParameterSerialization, headerParamSerializer, pathParamSerializer, queryParamSerializer, requestBodyStringSerializer } from '../serializer'

export namespace Serializer {
    export type Settings = adapter.settings.Serialization<OpenApiAdapter.SerializedRequestBody>
}

export class Serializer implements adapter.ISerializer<OpenApiAdapter.SerializedRequestBody>
{
    protected readonly settings: Serializer.Settings

    constructor(settings?: Serializer.Settings)
    {
        this.settings = settings ?? Serializer.defaultSettings
    }

    public pathString(pathId: string, parameters: adapter.request.PathParams | undefined): string
    {
        if (!parameters) return pathId;

        let output = pathId
        const pathKeys = Object.keys(parameters)

        for (let i = 0; i<pathKeys.length; i++) {
            const key = pathKeys[i]
            output = output.replace(
                `{${key}}`,
                this.serialize(key, parameters[key], this.settings.path)
            )
        }

        return output
    }

    public cookieParameters(parameters: adapter.request.CookieParams | undefined): string | undefined
    {
        if (!parameters) return undefined;

        const cookieKeys = Object.keys(parameters)
        if (cookieKeys.length === 0) return undefined
        let cookieValues: string[] = []

        for (let i = 0; i<cookieKeys.length; i++) {
            const key = cookieKeys[i]
            cookieValues.push(
                this.serialize(key, parameters[key], this.settings.cookie)
            )
        }

        return cookieValues.join(this.settings.cookie.constants.seperator)
    }

    public headerParameters(parameters: adapter.request.HeaderParams | undefined): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++) {
            const key = headerKeys[i]
            headers[key] = this.serialize(key, parameters[key], this.settings.header)
        }
        return headers
    }

    public queryString(parameters: adapter.request.QueryParams | undefined): string
    {
        if (!parameters) return ''
        const queryKeys = Object.keys(parameters)
        let querySections: string[] = []

        for (let i = 0; i < queryKeys.length; i++)
        {
            const key = queryKeys[i]
            querySections.push(this.serialize(key, parameters[key], this.settings.query))
        }
        const prefix = this.settings.query.constants.prefix
        const seperator = this.settings.query.constants.seperator

        return `${prefix}${querySections.join(seperator)}`
    }

    public requestBody(body: adapter.component.Media): Promise<OpenApiAdapter.SerializedRequestBody> {
        const { mediaType, value } = body
        return this.settings.requestBody.serializer(mediaType, value)
    }

    private serialize<
        T extends adapter.serialization.ParameterSerialization,
        K extends adapter.settings.ParameterSerialization<T, any>
    >(
        key: string,
        param: adapter.request.Param<T>,
        settings: K
    )
    {
        const p = getParameterSerialization(param)
        switch (p.type)
        {
            case 'plain':
            case 'default-serialization':
                return settings.defaultSerializer(
                        key,
                        p.value,
                        {
                            ...settings.default,
                            ...p.serialization
                        },
                        settings.constants
                    )
            case 'media-serialization':
                if (settings.mediaSerializer === undefined)
                    throw new Error('MediaSerializer not configured for this parameter type')
                return settings.mediaSerializer(p.mediaType, key, p.value)
        }
    }

    public static get defaultSettings()
    {
        return <const>{
            path: {
                constants: VALUE_CONSTANTS,
                default: {
                    style: 'simple',
                    explode: false,
                },
                defaultSerializer: pathParamSerializer,
            },
            cookie: {
                constants: COOKIE_CONSTANTS,
                default: {
                    explode: true,
                },
                defaultSerializer: cookieParamSerializer,
            },
            header: {
                constants: VALUE_CONSTANTS,
                default: {
                    explode: false,
                },
                defaultSerializer: headerParamSerializer,
            },
            query: {
                constants: QUERY_CONSTANTS,
                default: {
                    style: 'form',
                    explode: true,
                    allowReserved: false
                },
                defaultSerializer: queryParamSerializer,
            },
            requestBody: {
                serializer: requestBodyStringSerializer
            }
        }
    }
}