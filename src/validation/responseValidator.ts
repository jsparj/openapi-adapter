import { ResponseValidationException } from '../../../../src/classes'
import type { raw, openapi } from "../../core/types"

export const responseValidator: openapi.validation.ResponseValidator = (
    specificaton: raw.OpenAPIObject,
    pathId: string,
    method: string,
    statusCode: number,
    headers: Record<string, string>,
    content: unknown,
    settings: openapi.adapter.settings.ResponseValidation
)=>{
    const pathItem: raw.PathItemObject | undefined = specificaton.paths?.[pathId]
    if (!pathItem) throw new ResponseValidationException('path/not-found', pathId)
    
    const operation: raw.OperationObject | undefined = pathItem[method as raw.HttpMethod]
    if (!operation) throw new ResponseValidationException('operation/not-found', JSON.stringify({ pathId, method }))
    
    const response = operation.responses[`${statusCode}`] ?? operation.responses['default']
    if (!response) throw new ResponseValidationException('response/not-found', JSON.stringify({ pathId, method, statusCode }))
    
    settings.headersValidator(specificaton, headers, response.headers, settings)
    settings.contentValidator(specificaton, content, response.content, settings)
}