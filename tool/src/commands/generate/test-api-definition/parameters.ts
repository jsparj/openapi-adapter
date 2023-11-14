import { specification } from "../../../../../packages/core/types/specification"
import { ref } from "./ref"

export const EXPLODE = <const>[false, true]
export const REQUIRED = <const>[false, true]
export const PARAMETER_SHAPE = <const>['array','enum', 'null', 'number', 'object', 'string']

export const PATH_PARAMETER_STYLE = <const>['simple', 'label', 'matrix']

export const HEADER_PARAMETER_STYLE = <const>['simple']
export const COOKIE_PARAMETER_STYLE = <const>['simple']
export const QUERY_PARAMETER_STYLE = <const>['form', 'spaceDelimited', 'pipeDelimited', 'deepObject']

export namespace parameter {
    export namespace path {
        export type Style = typeof PATH_PARAMETER_STYLE[number]

        export type Id = `path_${Style}${''|'_explode'}_${Shape}`
    }

    export namespace cookie {
        export type Style = typeof COOKIE_PARAMETER_STYLE[number]
        export type Id = `cookie_${Style}${''|'_explode'}${''|'_optional'}_${Shape}`
    }

    export namespace header {
        export type Style = typeof HEADER_PARAMETER_STYLE[number]
        export type Id = `header_${Style}${''|'_explode'}${''|'_optional'}_${Shape}`
    }

    export namespace query {
        export type Style = typeof QUERY_PARAMETER_STYLE[number]
        export type Id =
            | `query_form${''|'_explode'}${''|'_optional'}_${Shape}`
            | `query_${'space'|'pipe'}Delimited${''|'_explode'}${''|'_optional'}_array`
            | `query_deepObject${''|'_explode'}${''|'_optional'}_object`
    }


    export type Shape = typeof PARAMETER_SHAPE[number]
    export type Explode = typeof EXPLODE[number] 
    

    /**`<TYPE>_<SHAPE>_<STYLE>_<EXPLODE>`*/
    export type Id = path.Id | cookie.Id | header.Id | query.Id 
}

const schemaMap: Record<parameter.Shape, specification.SchemaObject> = {
    array: ref('schemas/PrimitiveArray'),
    enum: ref('schemas/Enum'),
    number: ref('schemas/Number'),
    null: ref('schemas/Null'),
    object: ref('schemas/PrimitiveObject'),
    string: ref('schemas/String')
}




function createPathParameters()
{
    const parameters: Record<string, specification.ParameterObject> = {}
    const shapes = Object.keys(schemaMap)
    shapes.forEach((shape) => {
        const shapeId = shape as parameter.Shape
        PATH_PARAMETER_STYLE.forEach(style => {
            EXPLODE.forEach(explode => {
                const id: parameter.path.Id = `path_${style}${explode?'_explode':''}_${shapeId}`
                parameters[id] = {
                    in: 'path',
                    name: shapeId,
                    schema: schemaMap[shapeId],
                    required: true,
                    style,
                    explode
                }
            })
        })
    })
    return parameters
}


export function createCookieParameters()
{
    const parameters: Record<string, specification.ParameterObject> = {}

    const shapes = Object.keys(schemaMap)
    shapes.forEach((shape) => {
        const shapeId = shape as parameter.Shape
        EXPLODE.forEach(required => {
            const id: parameter.cookie.Id = `cookie_simple${required ? '' : '_optional'}_${shapeId}`
            parameters[id] = {
                in: 'cookie',
                name: shape,
                schema: schemaMap[shapeId],
                required: true,
                style: 'simple',
                explode: false,
            }
        })
    })
    return parameters
}

export function createHeaderParameters()
{
    const parameters: Record<string, specification.ParameterObject> = {}

    const shapes = Object.keys(schemaMap)
    shapes.forEach((shape) => {
        const shapeId = shape as parameter.Shape
        EXPLODE.forEach(explode => {
            REQUIRED.forEach(required => {
                const id: parameter.header.Id = `header_simple${explode ? '_explode' : ''}${required?'':'_optional'}_${shapeId}`
                parameters[id] = {
                    in: 'header',
                    name: shape,
                    schema: schemaMap[shapeId],
                    required: true,
                    style: 'simple',
                    explode
                }
            })
        })
    })
    return parameters
}

export function createQueryParameters()
{
    const parameters: Record<string, specification.ParameterObject> = {}
    const shapes = Object.keys(schemaMap)
    shapes.forEach((shape) => {
        const shapeId = shape as  parameter.Shape
        QUERY_PARAMETER_STYLE.forEach(style => {
            EXPLODE.forEach(explode => {
                [false,true].forEach(required => {
                    switch (style) {
                        case 'deepObject':
                            if (shapeId !== 'object' || !explode) return
                            break
                        
                        case 'pipeDelimited':
                        case 'spaceDelimited':
                            if (shapeId !== 'array') return
                            break
                    }

                    const id = <const>`query_${style}${explode?'_explode':''}${required?'':'_optional'}_${shapeId}`
                    parameters[id] = {
                        in: 'query',
                        name: shapeId,
                        schema: schemaMap[shapeId],
                        style,
                        explode,
                        required
                    }
                })
            })
        })
    })
    return parameters
}

export function createParameters(): Record<string, specification.ParameterObject> {
    return {
        ...createPathParameters(),
        ...createHeaderParameters(),
        ...createCookieParameters(),
        ...createQueryParameters()
    }
}