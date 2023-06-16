import { specification } from "../../../../../packages/core/types/specification"
import { pathSecurity } from "./securitySchemes"
import { ref } from "./ref"


export const PATH_STYLE = <const>['simple', 'label', 'matrix']
export const PATH_EXPLODE = <const>[false, true]
export const HTTP_METHOD = <const>['get','put','post', 'delete', 'options','head', 'patch', 'trace']

export namespace path {    
    export type Style = typeof PATH_STYLE[number]
    export type Id =
        | `/path-params/s/${Style}/e/${'yes'|'no'}/{array}/{enum}/{null}/{number}/{object}/{string}`
        | '/form/query/without/explosion'
        | '/label/query/without/explosion'
}


export function createPaths(): Record<path.Id,specification.PathItemObject> {
    const paths: { [pathId in path.Id]: specification.PathItemObject } = {
        
    } as { [pathId in path.Id]: specification.PathItemObject }

    let pathIndex = 0

    PATH_STYLE.forEach(style => {

        PATH_EXPLODE.forEach(explode => {
            const variables = ['array', 'enum', 'null', 'number', 'object', 'string']
                .map(node => `{${node}}`)
                .join('/')
            const pathId = `/path-params/s/${style}/e/${explode?'yes':'no'}/${variables}` as path.Id

            paths[pathId] = {
                parameters: [
                    ref(`parameters/path_${style}${explode?'_explode':''}_enum`),
                    ref(`parameters/path_${style}${explode?'_explode':''}_number`),
                    ref('parameters/header_simple_enum'),
                    ref('parameters/header_simple_number'),
                    ref('parameters/query_form_explode_number'),
                    ref('parameters/query_form_explode_enum'),
                ],
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/path_${style}${explode?'_explode':''}_array`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_null`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_object`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_string`),
                        ref('parameters/header_simple_array'),
                        ref('parameters/header_simple_optional_null'),
                        ref('parameters/header_simple_object'),
                        ref('parameters/header_simple_optional_string'),
                        ref('parameters/query_form_explode_array'),
                        ref('parameters/query_form_explode_null'),
                        ref('parameters/query_form_explode_object'),
                        ref('parameters/query_form_explode_string'),
                    ],
                    requestBody: ref('requestBodies/Default'),
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/BodyAndHeadersObject'),
                        401: ref('responses/Unauthorized'),
                        403: ref('responses/Forbidden'),
                        404: ref('responses/NotFound'),
                    }
                }
            }

            pathIndex++
        })
    })

    return paths
}
