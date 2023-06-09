import { specification } from "../../../../../packages/core/types/specification"
import { createParameters } from "./parameters"
import { createPaths } from "./paths"
import { requestBodies } from "./requestBody"
import { responses } from "./responses"
import { schemas } from "./schemas"
import { security, securitySchemes } from "./securitySchemes"

export const PARAMETER_SHAPE = <const>['enum', 'object', 'array', 'number', 'string']
export const PARAMETER_EXPLODE = <const>[undefined, true, false]
export const PATH_PARAMETER_STYLE = <const>[undefined, 'simple', 'label', 'matrix']

export const TestApiDefinition: specification.OpenAPIObject = {
    openapi: "3.1.0",
    info: {
        title: 'test-definition',
        version: '1.0'
    },
    security: security,
    components: {
        parameters: createParameters(),
        schemas: schemas,
        securitySchemes: securitySchemes,
        requestBodies: requestBodies,
        responses: responses
    },
    paths: createPaths()
} 