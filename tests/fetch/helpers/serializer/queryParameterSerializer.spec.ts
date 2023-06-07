import {queryParameterSerializer} from '../../../../packages/fetch/src/helpers/serializer/queryParameterSerializer'



describe('fetch/helpers/serializer/queryParameterSerializer', () => {
    describe('explode:true', () => {
        const explode = true

        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key',
                        { disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('asdf=@a#.sd&yes=true')
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    const serialized = queryParameterSerializer('key', 234)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryParameterSerializer('key', '_#_s.tring@')
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryParameterSerializer('key', true)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryParameterSerializer('key', undefined)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key',  null)).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', [123,'@a#.sd'])
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key', { asdf: '@a#.sd', yes: true } )
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })
        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false 

        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key',
                        { disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key=asdf,@a#.sd,yes,true')
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryParameterSerializer('key',
                        { disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key=asdf,%40a%23.sd,yes,true')
                })
            })
        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const allowReserved = true
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved ,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, allowReserved, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, allowReserved, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryParameterSerializer('key', {disableExplode: explode, style, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    expect(()=>queryParameterSerializer('key',{ disableExplode: explode, style, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })
    })    
}) 