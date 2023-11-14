import { adapter } from '@openapi-adapter/core'
import { pathParamSerializer, VALUE_CONSTANTS } from '@openapi-adapter/fetch'

describe('fetch/serializer/pathParamSerializer', () => {
    const constants = VALUE_CONSTANTS

    describe('explode:true', () => {
        const explode = true

        describe('style:simple', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'simple',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('_#_s.tring@')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('123,@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('asdf=@a#.sd,yes=true')
            })
        })

        describe('style:label', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'label',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('.234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('._#_s.tring@')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('.true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('.123.@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('.asdf=@a#.sd.yes=true')
            })
        })

        describe('style:matrix', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'matrix',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual(';key=234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '@a#.sd#?', serialization, constants)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual(';key=true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual(';key=123;key=@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual(';asdf=@a#.sd;yes=true')
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false

        describe('style:simple', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'simple',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('_#_s.tring@')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('123,@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('asdf,@a#.sd,yes,true')
            })
        })

        describe('style:label', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'label',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('.234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('._#_s.tring@')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('.true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('.123,@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('.asdf,@a#.sd,yes,true')
            })
        })

        describe('style:matrix', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'matrix',
                explode,
            }

            test('number', () => {
                const serialized = pathParamSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual(';key=234')
            })

            test('string', () => {
                const serialized = pathParamSerializer('key', '@a#.sd#?', serialization, constants)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            test('boolean', () => {
                const serialized = pathParamSerializer('key', true, serialization, constants)
                expect(serialized).toEqual(';key=true')
            })

            test('array', () => {
                const serialized = pathParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual(';key=123,@a#.sd')
            })

            test('object', () => {
                const serialized = pathParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual(';key=asdf,@a#.sd,yes,true')
            })
        })
    })  
}) 