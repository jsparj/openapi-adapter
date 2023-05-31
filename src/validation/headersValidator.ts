import { ResponseValidationException } from "../classes";
import type { openapi, raw } from "../types";

export const headersValidator: openapi.validation.HeaderValidator = (
    specification: raw.OpenAPIObject,
    actual: Record<string, string>,
    expect: raw.HeadersObject | undefined,
    settings: openapi.adapter.settings.ResponseValidation
): void =>
{

    const actualHeaderKeys = Object.entries(actual)
    

    if (expect === undefined) {
        for (let i = 0; i < actualHeaderKeys.length; i++){
            const actualKey = actualHeaderKeys[i][0]
            const resolution: openapi.validation.Resolution = {
                ...settings.header.default,
                ...settings.header.override?.[actualKey]
            }

            const error = new ResponseValidationException('header/not-defined', actualKey)
            const errorResolution = resolution['not-defined'] ?? resolution['default']
            onValidationError(error, errorResolution);
        }
        return
    }

    // validate actual against expected
    for (let i = 0; i < actualHeaderKeys.length; i++){
        const [actualKey, actualValue] = actualHeaderKeys[i]
        
        const resolution: openapi.validation.Resolution = {
            ...settings.header.default,
            ...settings.header.override?.[actualKey]
        }

        const expectedHeader: raw.BaseParameterObject | undefined = expect[actualKey]
        
        if (expectedHeader === undefined) {
            const error = new ResponseValidationException('header/not-defined', actualKey)
            const errorResolution = resolution['not-defined'] ?? resolution['default']
            onValidationError(error, errorResolution);
        }

        if (expectedHeader.allowEmptyValue === false && actualValue === '')
        {
            const error = new ResponseValidationException('header/disallowed-empty-value', actualKey)
            const errorResolution = resolution['disallowed-empty-value'] ?? resolution['default']
            onValidationError(error, errorResolution);
        }

        settings.schemaValidator(specification, actualValue, expectedHeader.schema, settings, 'header')
    }
}


function onValidationError(error: ResponseValidationException,resolution: openapi.validation.ErrorResolution ) {
    switch (resolution)
    {
        case 'none': break
        case 'warn': console.warn(error.message); break
        case 'error': console.error(error.message); break
        case 'throw': throw error;
        default: throw new ResponseValidationException('unknown',`Unknown ErrorResolution[${resolution}]`)
    }
}