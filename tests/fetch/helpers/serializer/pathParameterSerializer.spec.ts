import {pathStringSerializer} from '../../../../packages/fetch/src/helpers/serializer/pathStringSerializer'

describe('fetch/helpers/serializer/pathParameterSerializer', () => {
    describe('explode:true', () => {
        const explode = true

        describe('style:simple', () => {
            const templatePrefix = undefined

            it('number', () => {
                const serialized = pathStringSerializer('key', 234,templatePrefix,explode)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',templatePrefix,explode)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,templatePrefix,explode)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual('123,%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual('asdf=%40a%23.sd,yes=true')
            })
        })

        describe('style:label', () => {
            const templatePrefix = '.'
            it('number', () => {
                const serialized = pathStringSerializer('key', 234,templatePrefix,explode)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',templatePrefix,explode)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,templatePrefix,explode)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual('.123.%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual('.asdf=%40a%23.sd.yes=true')
            })
        })

        describe('style:matrix', () => {
            const templatePrefix = ';'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, templatePrefix, explode)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', templatePrefix, explode)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, templatePrefix, explode)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual(';key=123;key=%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual(';asdf=%40a%23.sd;yes=true')
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false

        describe('style:simple', () => {
            const templatePrefix = undefined

            it('number', () => {
                const serialized = pathStringSerializer('key', 234,templatePrefix,explode)
                expect(serialized).toEqual('234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',templatePrefix,explode)
                expect(serialized).toEqual('_#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,templatePrefix,explode)
                expect(serialized).toEqual('true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual('123,%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual('asdf,%40a%23.sd,yes,true')
            })
        })

        describe('style:label', () => {
            const templatePrefix = '.'
            it('number', () => {
                const serialized = pathStringSerializer('key', 234,templatePrefix,explode)
                expect(serialized).toEqual('.234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '_#_s.tring@',templatePrefix,explode)
                expect(serialized).toEqual('._#_s.tring@')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true,templatePrefix,explode)
                expect(serialized).toEqual('.true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual('.123,%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual('.asdf,%40a%23.sd,yes,true')
            })
        })

        describe('style:matrix', () => {
            const templatePrefix = ';'

            it('number', () => {
                const serialized = pathStringSerializer('key', 234, templatePrefix, explode)
                expect(serialized).toEqual(';key=234')
            })

            it('string', () => {
                const serialized = pathStringSerializer('key', '@a#.sd#?', templatePrefix, explode)
                expect(serialized).toEqual(';key=@a#.sd#?')
            })

            it('boolean', () => {
                const serialized = pathStringSerializer('key', true, templatePrefix, explode)
                expect(serialized).toEqual(';key=true')
            })

            it('array', () => {
                const serialized = pathStringSerializer('key', [123,'@a#.sd'],templatePrefix,explode)
                expect(serialized).toEqual(';key=123,%40a%23.sd')
            })

            it('object', () => {
                const serialized = pathStringSerializer('key', { asdf: '@a#.sd', yes: true },templatePrefix,explode)
                expect(serialized).toEqual(';key=asdf,%40a%23.sd,yes,true')
            })
        })
    })  
}) 