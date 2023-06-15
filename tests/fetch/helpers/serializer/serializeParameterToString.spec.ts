
import { DefaultSerializer,serializeParameterToString } from '@openapi-adapter/fetch'

describe('fetch/helpers/serializer/serializeParameterToString', () => {
    const constants = DefaultSerializer.DEFAULT_VALUE_CONSTANTS

    describe('object', () => {
        const object = { 
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
        }

        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(object, true, constants)    
            expect(serializedString).toEqual('{"string":"string","number":1234,"null":null,"array":["string",234,null],"object":{"string":"string","number":1234,"null":null}}')
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(object, false, constants)    
            expect(serializedString).toEqual('{"string"%3A"string"%2C"number"%3A1234%2C"null"%3Anull%2C"array"%3A%5B"string"%2C234%2Cnull%5D%2C"object"%3A{"string"%3A"string"%2C"number"%3A1234%2C"null"%3Anull}}')
        })
    })

    describe('array', () => {
        const array = ['string', 234, null]

        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(array, true, constants)    
            expect(serializedString).toEqual('["string",234,null]')
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(array, false, constants)    
            expect(serializedString).toEqual('%5B"string"%2C234%2Cnull%5D')
        })
    })

    describe('string', () => {
        const string = ':asd.gd!asdf&#ds=43523'

        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(string, true, constants)    
            expect(serializedString).toEqual(string)
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(string, false, constants)    
            expect(serializedString).toEqual('%3Aasd.gd%21asdf%26%23ds%3D43523')
        })
    })

    describe('number', ()=> {
        const number = 43423453

        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(number, true, constants)    
            expect(serializedString).toEqual('43423453')
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(number, false, constants)    
            expect(serializedString).toEqual('43423453')
        })
    })

    describe('null', () => {
        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(null, true, constants)    
            expect(serializedString).toEqual('null')
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(null, false, constants)    
            expect(serializedString).toEqual('null')
        })
    })

    describe('undefined', () => {
        it('allowReserved:true', () => {
            const serializedString = serializeParameterToString(undefined, true, constants)    
            expect(serializedString).toEqual('')
        })

        it('allowReserved:false', () => {
            const serializedString = serializeParameterToString(undefined, false, constants)    
            expect(serializedString).toEqual('')
        })
    })
}) 