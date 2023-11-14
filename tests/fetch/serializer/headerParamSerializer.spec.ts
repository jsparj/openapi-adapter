import type { adapter } from '@openapi-adapter/core'
import { VALUE_CONSTANTS, headerParamSerializer } from '@openapi-adapter/fetch'

describe('fetch/serializer/headerParamSerializer', () => {
    const constants = VALUE_CONSTANTS

    describe('explode:yes', () => {
        const serialization: adapter.serialization.HeaderSerialization = {
            explode: true
        }

        test('number', () => {
            const serialized = headerParamSerializer('key', 234, serialization, constants)
            expect(serialized).toEqual('234')
        })

        test('string', () => {
            const serialized = headerParamSerializer('key', '_#_s.tring@', serialization, constants)
            expect(serialized).toEqual('_#_s.tring@')
        })

        test('boolean', () => {
            const serialized = headerParamSerializer('key', true, serialization,constants)
            expect(serialized).toEqual('true')
        })

        test('undefined', () => {
            const serialized = headerParamSerializer('key', undefined, serialization, constants)
            expect(serialized).toEqual('')
        })

        test('null', () => {
            const serialized = headerParamSerializer('key',  null, serialization, constants)
            expect(serialized).toEqual('null')
        })

        test('array', () => {
            const serialized = headerParamSerializer('key', [123,'@a#.sd'], serialization, constants)
            expect(serialized).toEqual('123.@a#.sd')
        })

        test('object', () => {
            const serialized = headerParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
            expect(serialized).toEqual('asdf=@a#.sd,yes=true')
        })
    })

    describe('explode:no', () => {
        const serialization: adapter.serialization.HeaderSerialization = {
            explode: false
        }

        test('number', () => {
            const serialized = headerParamSerializer('key', 234, serialization, constants)
            expect(serialized).toEqual('234')
        })

        test('string', () => {
            const serialized = headerParamSerializer('key', '_#_s.tring@', serialization, constants)
            expect(serialized).toEqual('_#_s.tring@')
        })

        test('boolean', () => {
            const serialized = headerParamSerializer('key', true, serialization,constants)
            expect(serialized).toEqual('true')
        })

        test('undefined', () => {
            const serialized = headerParamSerializer('key', undefined, serialization, constants)
            expect(serialized).toEqual('')
        })

        test('null', () => {
            const serialized = headerParamSerializer('key',  null, serialization, constants)
            expect(serialized).toEqual('null')
        })

        test('array', () => {
            const serialized = headerParamSerializer('key', [123,'@a#.sd'], serialization, constants)
            expect(serialized).toEqual('123,@a#.sd')
        })

        test('object', () => {
            const serialized = headerParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
            expect(serialized).toEqual('asdf,@a#.sd,yes,true')
        })

    })
})