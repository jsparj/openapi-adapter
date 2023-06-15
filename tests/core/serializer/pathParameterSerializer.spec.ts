import { pathStringSerializer, DEFAULT_PARAMETER_SERIALIZATION_SETTINGS  } from '@openapi-adapter/core'
import { adapter } from '../../../packages/core/types'

describe('core/serializer/pathStringSerializer', () => {
    const constants = DEFAULT_PARAMETER_SERIALIZATION_SETTINGS.pathString.constants

    describe('explode:true', () => {
        const explode = true

        describe('style:simple', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'simple',
                explode,
            }

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('asdf=@a#.sd,yes=true')
            })
        })

        describe('style:label', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'label',
                explode,
            }

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('.123.@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('.asdf=@a#.sd.yes=true')
            })
        })

        describe('style:matrix', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'matrix',
                explode,
            }

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', serialization, constants)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual(';key=123;key=@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
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

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('asdf,@a#.sd,yes,true')
            })
        })

        describe('style:label', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'label',
                explode,
            }

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@', serialization, constants)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual('.123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual('.asdf,@a#.sd,yes,true')
            })
        })

        describe('style:matrix', () => {
            const serialization: adapter.serialization.ParameterSerialization = {
                style: 'matrix',
                explode,
            }

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, serialization, constants)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', serialization, constants)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, serialization, constants)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                expect(serialized).toEqual(';key=123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                expect(serialized).toEqual(';key=asdf,@a#.sd,yes,true')
            })
        })
    })  
}) 