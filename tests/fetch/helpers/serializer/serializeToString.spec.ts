import {serializeToString} from '../../../../packages/fetch/src/helpers/serializer/serializeToString'

describe('fetch/helpers/serializer/serializeToString', () => {
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
        })
        expect(serializedString).toEqual('{"string":"string","number":1234,"null":null,"array":["string",234,null],"object":{"string":"string","number":1234,"null":null}}')
    })

    test('array', () => {
        const serializedString = serializeToString(['string', 234, null])
        expect(serializedString).toEqual('["string",234,null]')
    })

    test('string', ()=> {
        const serializedString = serializeToString('__string__')
        expect(serializedString).toEqual('__string__')
    })

    test('number', ()=> {
        const serializedString = serializeToString(354)
        expect(serializedString).toEqual('354')
    })

    test('null', ()=> {
        const serializedString = serializeToString(null)
        expect(serializedString).toEqual('null')
    })

    test('undefined', ()=> {
        const serializedString = serializeToString(undefined)
        expect(serializedString).toEqual('')
    })
}) 