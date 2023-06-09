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