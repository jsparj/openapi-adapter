import { parameter } from "./parameters"
import { schema } from "./schemas"
import { securityScheme } from "./securitySchemes"
import { requestBody } from './requestBody'
import { response } from "./responses"

export namespace referense {
    export type Id =
        | `parameters/${parameter.Id}`
        | `schemas/${schema.Id}`
        | `securitySchemes/${securityScheme.Id}`
        | `requestBodies/${requestBody.Id}`
        | `responses/${response.Id}`
}

export function ref<T extends referense.Id>(id: T) {
    return <const>{ $ref: `#/components/${id}`}
}