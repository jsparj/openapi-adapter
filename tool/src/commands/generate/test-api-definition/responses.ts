import { specification } from "../../../../../packages/core/types/specification"
import { ref } from "./ref"

export namespace response {
    export type Id = 'NotFound' | 'Forbidden' | 'Unauthorized' | 'BodyAndHeadersObject'
}

export const responses: Record<response.Id, specification.ResponseObject> = {
    NotFound: {
        description: 'NOT_FOUND'
    },
    Forbidden: {
        description: 'FORBIDDEN'
    },
    Unauthorized: {
        description: 'UNAUTHORIZED'
    },
    BodyAndHeadersObject: {
        description: 'OK',
        headers: {
            'Content-Type': {
                required: true,
                schema: {
                    enum: ['application/json', 'application/xml']
                }
            }
        },
        content: {
            'application/json': {
                // no support for property encoding just yet
                schema: ref('schemas/MediaTypeObjectApplicationJson')
            },
            'application/xml': {
                // no support for property encoding just yet
                schema: ref('schemas/MediaTypeObjectApplicationXml')
            },
        }
    }

}