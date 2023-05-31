import type {openapi} from '../types'
import type { DeepPartial } from '../types/common'


export function mergePathSettings(baseSettings: openapi.adapter.PathSettings, ...pathSettings: (DeepPartial<openapi.adapter.PathSettings> | undefined)[]): openapi.adapter.PathSettings
{

    const formatters: openapi.adapter.settings.Formatters = {
        header: pathSettings.reduce((prev, cur) => (cur.formatters.header ?? prev), baseSettings.formatters.header),
        query: pathSettings.reduce((prev, cur) => (cur.formatters.query ?? prev), baseSettings.formatters.query),
        headerFormatterParams: pathSettings.reduce<openapi.adapter.settings.HeaderFormatterSettings>(
            (prev, cur) => ({ ...prev, ...cur?.formatters?.headerFormatterParams}), baseSettings.formatters?.headerFormatterParams ?? {}
        ),
        queryFormatterParams: pathSettings.reduce<openapi.adapter.settings.QueryFormatterSettings>(
            (prev, cur) => ({ ...prev, ...cur?.formatters?.queryFormatterParams}), baseSettings.formatters?.queryFormatterParams ?? {}
        ),
    }

    const settings: openapi.adapter.PathSettings = {
        requestInit: pathSettings.reduce<RequestInit>((prev, cur) => ({ ...prev, ...cur?.requestInit }), global.requestInit ?? {}),
        headers: pathSettings.reduce<Record<string, any>>((prev, cur) => ({ ...prev, ...cur?.headers }), global.headers ?? {}),
        queries: pathSettings.reduce<Record<string, any>>((prev, cur) => ({ ...prev, ...cur?.queries }), global.queries ?? {}),
        responseValidation: pathSettings.reduce<openapi.adapter.settings.ResponseValidation>(
            (prev, cur) => ({ ...prev, ...cur?.responseValidation }), baseSettings.responseValidation ?? {}
        ),
        formatters,
    }

    return settings
}
