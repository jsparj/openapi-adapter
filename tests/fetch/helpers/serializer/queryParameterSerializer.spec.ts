import { adapter } from '@openapi-adapter/core'
import {queryStringSerializer,  DefaultSerializer} from '@openapi-adapter/fetch'



describe('fetch/helpers/serializer/queryParameterSerializer', () => {
    const options = DefaultSerializer.DEFAULT_SETTINGS.queryString

    describe('explode:true', () => {
        const explode = true
        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:false', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, __serialization__, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', __serialization__, options)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, __serialization__,options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, __serialization__, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key',  null, __serialization__, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }

                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, __serialization__, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', __serialization__, options)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, __serialization__, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, __serialization__, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, __serialization__, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('asdf=@a#.sd&yes=true')
                })
            })

        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode: true,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    allowReserved: false,
                    explode: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })  

    describe('explode:false', () => {
        const explode = false;

        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: true
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, __serialization__, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', __serialization__, options)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, __serialization__, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, __serialization__, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, __serialization__, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key=asdf,@a#.sd,yes,true')
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: false
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, __serialization__, options)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', __serialization__, options)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, __serialization__, options)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, __serialization__, options)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, __serialization__, options)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key=asdf,%40a%23.sd,yes,true')
                })
            })
        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key',[123,'@a#.sd'],  __serialization__, options)
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const __serialization__:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }

                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', '@a#.sd', __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const __serialization__: adapter.serialization.QuerySerialization = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, __serialization__, options)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', '@a#.sd', __serialization__, options)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, __serialization__, options)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, __serialization__, options)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, __serialization__, options)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], __serialization__, options)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, __serialization__, options)
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })    
}) 