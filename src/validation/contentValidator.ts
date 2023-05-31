import { openapi, raw } from "../types"

export const contentValidator: openapi.validation.ContentValidator = (
    specification: raw.OpenAPIObject,
    actual: unknown,
    expect: raw.ContentObject | undefined,
    settings: openapi.adapter.settings.ResponseValidation
): void  =>
{

}