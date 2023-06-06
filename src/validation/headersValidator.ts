import { ResponseValidationException } from "../../../../src/classes";
import type { openapi, raw } from "../../core/types";

export const headersValidator: openapi.validation.HeaderValidator = (
    specification: raw.OpenAPIObject,
    actual: Record<string, string>,
    expect: raw.HeadersObject | undefined,
    settings: openapi.adapter.settings.ResponseValidation
): void =>
{

    const actualHeaders = Object.entries(actual)
    

    if (expect === undefined) {
        for (let i = 0; i < actualHeaders.length; i++){
            const actualKey = actualHeaders[i][0]
            const resolution: openapi.validation.Resolution = {
                ...settings.header.default,
                ...settings.header.override?.[actualKey]
            }

            const error = new ResponseValidationException('header/not-defined', actualKey)
            const errorResolution = resolution['not-defined'] ?? resolution['default']
            onValidationError(error, errorResolution, settings);
        }
        return
    }

    // validate actual against expected
    for (let i = 0; i < actualHeaders.length; i++){
        const [actualKey, actualValue] = actualHeaders[i]
        
        const resolution: openapi.validation.Resolution = {
            ...settings.header.default,
            ...settings.header.override?.[actualKey]
        }

        const expectedHeader: raw.BaseParameterObject | undefined = expect[actualKey]
        
        if (expectedHeader === undefined) {
            const error = new ResponseValidationException('header/not-defined', actualKey)
            const errorResolution = resolution['not-defined'] ?? resolution['default']
            onValidationError(error, errorResolution, settings);
        }

        if (expectedHeader.allowEmptyValue === false && actualValue === '')
        {
            const error = new ResponseValidationException('header/disallowed-empty-value', actualKey)
            const errorResolution = resolution['disallowed-empty-value'] ?? resolution['default']
            onValidationError(error, errorResolution, settings);
        }

        settings.schemaValidator(specification, actualValue, expectedHeader.schema, settings, 'header')
    }
}


function onValidationError(error: ResponseValidationException,resolution: openapi.validation.ErrorResolution,settings: openapi.adapter.settings.ResponseValidation ) {
    switch (resolution)
    {
        case 'none': break
        case 'warn': settings.onWarn?.(error.message); break
        case 'error': settings.onError?.(error.message); break
        case 'throw': throw error;
        default: throw new ResponseValidationException('unknown',`Unknown ErrorResolution[${resolution}]`)
    }
}