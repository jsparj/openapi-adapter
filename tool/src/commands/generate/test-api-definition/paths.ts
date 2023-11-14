import { specification } from "../../../../../packages/core/types/specification"
import { pathSecurity } from "./securitySchemes"
import { ref } from "./ref"
import { COOKIE_PARAMETER_STYLE, PATH_PARAMETER_STYLE, EXPLODE, createCookieParameters, createHeaderParameters, createQueryParameters, parameter, REQUIRED, HEADER_PARAMETER_STYLE, QUERY_PARAMETER_STYLE } from "./parameters"


export const HTTP_METHOD = <const>['get','put','post', 'delete', 'options','head', 'patch', 'trace']

export namespace path {    
    type YesNo = 'yes' | 'no'
    export type Id =
        | `/path/s/${parameter.path.Style}/e/${YesNo}/{array}/{enum}/{null}/{number}/{object}/{string}`
        | `/cookie/s/${parameter.cookie.Style}/e/${YesNo}/o/${YesNo}`
        | `/header/s/${parameter.header.Style}/e/${YesNo}/o/${YesNo}`
        | `/query/s/form/e/${YesNo}/o/${YesNo}`
        | `/query/s/${'space'|'pipe'}Delimited/e/${YesNo}/o/${YesNo}`
        | `/query/s/deepObject/e/${YesNo}/o/${YesNo}`
        | '/responses/with'
}


export function createPaths(): Record<path.Id,specification.PathItemObject> {
    const paths: { [pathId in path.Id]: specification.PathItemObject } =
        {} as { [pathId in path.Id]: specification.PathItemObject }

    let pathIndex = 0

    PATH_PARAMETER_STYLE.forEach(style => {
        EXPLODE.forEach(explode => {
            const pathId = <const>`/path/s/${style}/e/${explode?'yes':'no'}/{array}/{enum}/{null}/{number}/{object}/{string}`
            paths[pathId] = {
                parameters: [
                    ref(`parameters/path_${style}${explode?'_explode':''}_enum`),
                    ref(`parameters/path_${style}${explode?'_explode':''}_number`),
                ],
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/path_${style}${explode?'_explode':''}_array`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_null`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_object`),
                        ref(`parameters/path_${style}${explode?'_explode':''}_string`),
                    ],
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/Empty'),
                        401: ref('responses/Unauthorized'),
                        403: ref('responses/Forbidden'),
                        404: ref('responses/NotFound'),
                    }
                }
            }
            pathIndex++
        })
    })

    HEADER_PARAMETER_STYLE.forEach(style => {
        EXPLODE.forEach(explode => {
            REQUIRED.forEach(required => {
                const pathId = <const>`/header/s/${style}/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`

                paths[pathId] = {
                    parameters: [
                        ref(`parameters/header_${style}${explode?'_explode':''}${required?'':'_optional'}_enum`),
                        ref(`parameters/header_${style}${explode?'_explode':''}${required?'':'_optional'}_number`),
                    ],
                    [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                        parameters: [
                            ref(`parameters/header_${style}${explode?'_explode':''}${required?'':'_optional'}_array`),
                            ref(`parameters/header_${style}${explode?'_explode' : ''}${required?'':'_optional'}_null`),
                            ref(`parameters/header_${style}${explode?'_explode':''}${required?'':'_optional'}_object`),
                            ref(`parameters/header_${style}${explode?'_explode':''}${required?'':'_optional'}_string`),
                        ],
                        security: pathSecurity,
                        responses: { 
                            200: ref('responses/Empty'),
                            401: ref('responses/Unauthorized'),
                            403: ref('responses/Forbidden'),
                            404: ref('responses/NotFound'),
                        }
                    }
                }
                pathIndex++
            })
        })
    })

    COOKIE_PARAMETER_STYLE.forEach(style => {
        EXPLODE.forEach(explode => {
            REQUIRED.forEach(required => {
                const pathId = <const>`/cookie/s/${style}/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`

                paths[pathId] = {
                    parameters: [
                        ref(`parameters/cookie_${style}${explode?'_explode':''}${required?'':'_optional'}_enum`),
                        ref(`parameters/cookie_${style}${explode?'_explode':''}${required?'':'_optional'}_number`),
                    ],
                    [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                        parameters: [
                            ref(`parameters/cookie_${style}${explode?'_explode':''}${required?'':'_optional'}_array`),
                            ref(`parameters/cookie_${style}${explode?'_explode' : ''}${required?'':'_optional'}_null`),
                            ref(`parameters/cookie_${style}${explode?'_explode':''}${required?'':'_optional'}_object`),
                            ref(`parameters/cookie_${style}${explode?'_explode':''}${required?'':'_optional'}_string`),
                        ],
                        security: pathSecurity,
                        responses: { 
                            200: ref('responses/Empty'),
                            401: ref('responses/Unauthorized'),
                            403: ref('responses/Forbidden'),
                            404: ref('responses/NotFound'),
                        }
                    }
                }
                pathIndex++
            })
        })
    })

    // Query::
    EXPLODE.forEach(explode => {
        REQUIRED.forEach(required => {
            paths[`/query/s/form/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`] = {
                parameters: [
                    ref(`parameters/query_form${explode?'_explode':''}${required?'':'_optional'}_enum`),
                    ref(`parameters/query_form${explode?'_explode':''}${required?'':'_optional'}_number`),
                ],
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/query_form${explode?'_explode':''}${required?'':'_optional'}_array`),
                        ref(`parameters/query_form${explode?'_explode' : ''}${required?'':'_optional'}_null`),
                        ref(`parameters/query_form${explode?'_explode':''}${required?'':'_optional'}_object`),
                        ref(`parameters/query_form${explode?'_explode':''}${required?'':'_optional'}_string`),
                    ],
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/Empty'),
                        401: ref('responses/Unauthorized'),
                        403: ref('responses/Forbidden'),
                        404: ref('responses/NotFound'),
                    }
                }
            }
            pathIndex++
            paths[`/query/s/spaceDelimited/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`] = {
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/query_spaceDelimited${explode?'_explode':''}${required?'':'_optional'}_array`),
                    ],
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/Empty'),
                        401: ref('responses/Unauthorized'),
                        403: ref('responses/Forbidden'),
                        404: ref('responses/NotFound'),
                    }
                }
            }
            pathIndex++
            paths[`/query/s/pipeDelimited/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`] = {
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/query_pipeDelimited${explode?'_explode':''}${required?'':'_optional'}_array`),
                    ],
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/Empty'),
                        401: ref('responses/Unauthorized'),
                        403: ref('responses/Forbidden'),
                        404: ref('responses/NotFound'),
                    }
                }
            }
            pathIndex++
            paths[`/query/s/deepObject/e/${explode?'yes':'no'}/o/${required?'yes':'no'}`] = {
                [HTTP_METHOD[pathIndex%HTTP_METHOD.length]]: {
                    parameters: [
                        ref(`parameters/query_pipeDelimited${explode?'_explode':''}${required?'':'_optional'}_array`),
                    ],
                    security: pathSecurity,
                    responses: { 
                        200: ref('responses/Empty'),
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
