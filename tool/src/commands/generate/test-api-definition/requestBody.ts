import { specification } from "../../../../../packages/core/types/specification"
import { ref } from "./ref"



export namespace requestBody {
    export type Id = 'Default'
}


export const requestBodies: Record<requestBody.Id, specification.RequestBodyObject> = {
    Default: {        
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