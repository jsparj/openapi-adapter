import { DefaultSerializer } from '../../../../packages/fetch/src/classes/DefaultSerializer'
import {pathStringSerializer} from '../../../../packages/fetch/src/helpers/serializer/pathStringSerializer'

describe('fetch/helpers/serializer/pathParameterSerializer', () => {
    const options =DefaultSerializer.DEFAULT_SETTINGS.pathString

    describe('explode:true', () => {
        const explode = true

        describe('style:simple', () => {
            const style = 'simple'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, style, explode, options)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',style, explode, options)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,style, explode, options)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual('123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual('asdf=@a#.sd,yes=true')
            })
        })

        describe('style:label', () => {
            const style = 'label'
            it('number', () => {
                const serialized = pathStringSerializer('key', 234,style, explode, options)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',style, explode, options)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,style, explode, options)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual('.123.@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual('.asdf=@a#.sd.yes=true')
            })
        })

        describe('style:matrix', () => {
            const style = 'matrix'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, style, explode, options)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', style, explode, options)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, style, explode, options)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual(';key=123;key=@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual(';asdf=@a#.sd;yes=true')
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false

        describe('style:simple', () => {
            const style = 'simple'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234,style, explode, options)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',style, explode, options)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,style, explode, options)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual('123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual('asdf,@a#.sd,yes,true')
            })
        })

        describe('style:label', () => {
            const style = 'label'
            it('number', () => {
                const serialized = pathStringSerializer('key', 234,style, explode, options)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',style, explode, options)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,style, explode, options)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual('.123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual('.asdf,@a#.sd,yes,true')
            })
        })

        describe('style:matrix', () => {
            const style = 'matrix'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, style, explode, options)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', style, explode, options)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, style, explode, options)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],style, explode, options)
                expect(serialized).toEqual(';key=123,@a#.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },style, explode, options)
                expect(serialized).toEqual(';key=asdf,@a#.sd,yes,true')
            })
        })
    })  
}) 