import { openapi, raw } from "../types";

export function schemaValidator(
    specification: raw.OpenAPIObject,
    actual: unknown,
    expected: raw.SchemaObject | undefined,
    settings: openapi.adapter.settings.ResponseValidation,
    source: 'header' | 'content'
): void {
    
}