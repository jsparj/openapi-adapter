import { serializeToString, DEFAULT_PARAMETER_SERIALIZATION_SETTINGS } from '@openapi-adapter/core'

describe('core/serializer/serializeToString', () => {
    const constants = DEFAULT_PARAMETER_SERIALIZATION_SETTINGS.header.constants

    test('object', () => {
        const serializedString = serializeToString({ 
            string: 'string',
            number: 1234,
            null: null,
            undefined: undefined,
            array: ['string', 234, null],
            object: {
                string: 'string',
                number: 1234,
                null: null,
                undefined: undefined,
            }
        },constants)
        expect(serializedString).toEqual('{"string":"string","number":1234,"null":null,"array":["string",234,null],"object":{"string":"string","number":1234,"null":null}}')
    })

    test('array', () => {
        const serializedString = serializeToString(['string', 234, null],constants)
        expect(serializedString).toEqual('["string",234,null]')
    })

    test('string', ()=> {
        const serializedString = serializeToString('__string__',constants)
        expect(serializedString).toEqual('__string__')
    })

    test('number', ()=> {
        const serializedString = serializeToString(354,constants)
        expect(serializedString).toEqual('354')
    })

    test('null', ()=> {
        const serializedString = serializeToString(null,constants)
        expect(serializedString).toEqual('null')
    })

    test('undefined', ()=> {
        const serializedString = serializeToString(undefined,constants)
        expect(serializedString).toEqual('')
    })
}) 