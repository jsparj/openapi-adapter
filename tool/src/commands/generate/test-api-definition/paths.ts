import { specification } from "../../../../../packages/core/types/specification"
import { parameter } from "./parameters"
import { ref } from "./ref"
import { pathSecurity } from "./securitySchemes"

export const PATH_STYLE = <const>['simple', 'label', 'matrix']
export const PATH_EXPLODE = <const>[false, true]
export const HTTP_METHOD = <const>['get','put','post', 'delete', 'options','head', 'patch', 'trace']

export namespace path {
    type Param<T extends parameter.Shape,U extends ''|'.'|';',K extends ''|'*'> =`{${U}${T}${K}}`
    type WithPathParameters<U extends ''|'.'|';',K extends ''|'*'> = `/path/tests/${Param<'array',U,K>}/${Param<'enum',U,K>}/${Param<'null',U,K>}/${Param<'number',U,K>}/${Param<'object',U,K>}/${Param<'string',U,K>}`
    
    export type Style = typeof PATH_STYLE[number]
    export type Id =
        | WithPathParameters<'', ''>
        | WithPathParameters<'', '*'>
        | WithPathParameters<'.', ''>
        | WithPathParameters<'.', '*'>
        | WithPathParameters<';', ''>
        | WithPathParameters<';', '*'>
        | '/form/query/without/explosion'
        | '/label/query/without/explosion'
}


export function createPaths(): Record<path.Id,specification.PathItemObject> {
    const paths: { [pathId in path.Id]: specification.PathItemObject } = {
        
    } as { [pathId in path.Id]: specification.PathItemObject }

    let pathIndex = 0

    PATH_STYLE.forEach(style => {
        let prefix: '' | '.' | ';' = ''
        switch (style) {
            case 'simple': prefix = ''; break
            case 'label': prefix = '.'; break
            case 'matrix': prefix = ';'; break
        }

        PATH_EXPLODE.forEach(explode => {
            const variables = ['array', 'enum', 'null', 'number', 'object', 'string']
                .map(node => `{${prefix}${node}${explode ? '*' : ''}}`)
                .join('/')
            const pathId = `path/tests/${variables}` as path.Id

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
