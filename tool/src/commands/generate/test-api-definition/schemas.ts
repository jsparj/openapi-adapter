import { specification } from "../../../../../packages/core/types/specification"
import { ref } from "./ref"

export const SCHEMA_ID = <const>[
    'Enum',
    'Number',
    'Integer',
    'String',
    'Null',
    'Boolean',
    'Primitive',
    'PrimitiveArray',
    'PrimitiveObject',
    'PrimitiveRecord',
    'DeepObject',
    'MediaTypeObjectApplicationJson',
    'MediaTypeObjectApplicationXml',
]


export namespace schema {
    export type Id = typeof SCHEMA_ID[number]
}


export const schemas: Record<schema.Id, specification.SchemaObject> = {
    Number: {
        type: 'number'
    },
    Integer: {
        type: 'integer'
    },
    String: {
        type: 'string'
    },
    Null: {
        type: 'null'
    },
    Boolean: {
        type: 'boolean'
    },
    Primitive: {
        oneOf: [
            ref('schemas/Boolean'),
            ref('schemas/String'),
            ref('schemas/Integer'),
            ref('schemas/Number'),
            ref('schemas/Null'),
        ]
    },
    Enum: {
        enum: ['_1_','_2_','_3_']
    },
    PrimitiveArray: {
        type: 'array',
        items: ref('schemas/Primitive')
    },
    PrimitiveObject: {
        type: 'object',
        properties: {
            string: ref('schemas/String'),
            number: ref('schemas/Number'),
            integer: ref('schemas/Integer'),
            null: ref('schemas/Null')
        },
        required: ['string', 'number']
    },
    PrimitiveRecord: {
        type: 'object',
        additionalProperties: ref('schemas/Primitive')
    },
    DeepObject: {
        type: 'object',
        properties: {
            array: ref('schemas/PrimitiveArray'),
            record: ref('schemas/PrimitiveRecord')
        }
    },
    MediaTypeObjectApplicationJson: {
        type: 'object',
        properties: {
            mediaType: { enum: ['application/json'] },
            content: ref('schemas/PrimitiveObject')
        },
        required: ['mediaType']
    },
    MediaTypeObjectApplicationXml: {
        type: 'object',
        properties: {
            mediaType: { enum: ['application/xml'] },
            content: ref('schemas/PrimitiveObject')
        },
        required: ['mediaType']
    }
}