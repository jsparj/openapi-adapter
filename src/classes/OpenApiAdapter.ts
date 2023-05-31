import type { raw, openapi } from '../types';
import type { DeepPartial, PartialBy } from '../types/common';
import {
    buildBody,
    buildUrl,
    buildHeaders,
    mergePathSettings,
    responseMapper,
    headerFormatter,
    queryFormatter,
} from '../helpers'
import {responseValidator} from '../validation'
import { headersValidator } from '../validation/headersValidator';
import { schemaValidator } from '../validation/schemaValidator';
import { contentValidator } from '../validation/contentValidator';

const defaultGlobalPathSettings: openapi.adapter.PathSettings = {
    useResponseValidatoon: true,
    headers: {},
    queries: {},
    requestInit: {},
    formatters: {
        header: headerFormatter,
        query: queryFormatter,
        headerFormatterParams: {},
        queryFormatterParams: {
            nullValue: '',
            undefinedValue: '',
            bigintFormatter: (value: bigint) => value.toString(),
            numberFormatter: (value: number) => value.toString(),
            stringFormatter: (value: string) => value,
            objectFormatter: (value: object) => value.toString(),
            arrayFormatter: (value: unknown[]) => value.toString()
        }
    },
    responseValidation: {
        responseValidator: responseValidator,
        headersValidator: headersValidator,
        contentValidator: contentValidator,
        schemaValidator: schemaValidator,

        header: {
            default: {
                default: 'warn',
            }
        },
        content: {
            default: {
                default: 'warn'
            }
        }
    }
} 


/**
 * @param NS API Namespace
 * @param T `readonly` OpenAPIObject
 */
export abstract class OpenApiAdapter<
    NS extends string,
    T extends raw.OpenAPIObject,
> implements openapi.adapter.IFetch<NS, T> {
    
    public readonly namespace: NS
    public readonly specification: T
    private readonly settings: openapi.adapter.Settings<T>

    constructor(namespace: NS, specification: T, settings: PartialBy<openapi.adapter.Settings<T>, 'global' | 'pathOverrides'>) {
        this.namespace = namespace;
        this.specification = specification;
        this.settings = {
            host: settings.host,
            global: mergePathSettings(defaultGlobalPathSettings, settings.global),
            pathOverrides: settings.pathOverrides ?? {}
        }
    }

    public async fetch<
        PathId extends keyof T['paths'],
        Method extends keyof T['paths'][PathId],
        Operation extends openapi.path.Operation<T,PathId, Method>
    > (
        pathId: PathId,
        method: Method,
        parameters: Operation['request'],
        settingsOverride?: DeepPartial<openapi.adapter.PathSettings>
    ): Promise<openapi.adapter.FetchResult<NS, T, PathId, Method, Operation>> {
        const { pathParams, query, headers, body } = parameters as {
            pathParams?: Record<string, string | number>
            query?: Record<string, unknown>
            headers?: Record<string, unknown> 
            body?: unknown
        }

        const settings  = mergePathSettings(this.settings.global, this.settings.pathOverrides[pathId], settingsOverride)
        const url = buildUrl(pathId as string, pathParams, query, settings)

        const response = await fetch(url, {
            method: method.toString(),
            headers: buildHeaders(headers, settings),
            body: buildBody(body),
            ...settings.requestInit,
        })

        return responseMapper<NS,T,PathId,Method,Operation>(this.namespace, response, settings)
    }
}
