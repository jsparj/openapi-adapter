import type { adapter } from '@openapi-adapter/core/dist'
import {queryStringSerializer} from '../../../../packages/fetch/src/helpers/serializer/queryStringSerializer'
import { DefaultSerializer } from '../../../../packages/fetch/src/classes/DefaultSerializer'



describe('fetch/helpers/serializer/queryParameterSerializer', () => {
    const options = DefaultSerializer.DEFAULT_SETTINGS.queryString

    describe('explode:true', () => {
        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:false', () => {
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', options)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key',  null, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true }, options)
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })

            describe('allowReserved:true', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    allowReserved: true
                }

                it('number', () => {
                    const serialized = queryStringSerializer('key', {__serialization__,  value: 234}, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'}, options)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true}, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined}, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null}, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
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
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
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
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
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
                    expect(()=>queryStringSerializer('key', {__serialization__,value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
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
                    const serialized = queryStringSerializer('key', {__serialization__, value: 234}, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'}, options)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true}, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined}, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null}, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
                    expect(serialized).toEqual('key=asdf,@a#.sd,yes,true')
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    explode,
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: 234}, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: '_#_s.tring@'}, options)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: true}, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: undefined}, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: null}, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
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
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
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
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', { __serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } }, options)).toThrow()
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
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{__serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.component.QueryParameterSerialization = {
                    style,
                    explode,
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: 234}, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: true}, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: undefined}, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: null}, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', {__serialization__, value: [123,'@a#.sd']}, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ __serialization__, value: { asdf: '@a#.sd', yes: true } }, options)
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })    
}) 