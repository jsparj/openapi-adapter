import { adapter } from '@openapi-adapter/core/dist'
import {queryStringSerializer} from '../../../../packages/fetch/src/helpers/serializer/queryStringSerializer'



describe('fetch/helpers/serializer/queryParameterSerializer', () => {
    describe('explode:true', () => {
        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@')
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key',  null)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'])
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true } )
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    allowReserved: true
                }

                it('number', () => {
                    const serialized = queryStringSerializer('key', {__serialization__,  value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null})
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { __serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('asdf=@a#.sd&yes=true')
                })
            })

        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__,value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false;

        describe('style:form', () => {

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null})
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { __serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key=asdf,@a#.sd,yes,true')
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    explode,
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: 234})
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'})
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true})
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined})
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null})
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { __serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key=asdf,%40a%23.sd,yes,true')
                })
            })
        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', { __serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } })).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                    allowReserved: true
                }

                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234})).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true})).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined})).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null})).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']})).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } })
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })    
}) 