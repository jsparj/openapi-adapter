import { DEFAULT_PARAMETER_SERIALIZATION_SETTINGS, adapter, queryStringSerializer } from '@openapi-adapter/core'


describe('core/serializer/queryParameterSerializer', () => {
    const constants = DEFAULT_PARAMETER_SERIALIZATION_SETTINGS.query.constants

    describe('explode:true', () => {
        const explode = true
        describe('style:form', () => {
            const style = 'form'

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, serialization,constants)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key',  null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }

                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('asdf=@a#.sd&yes=true')
                })
            })

        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode: true,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    allowReserved: false,
                    explode: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
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
                const serialization:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: true
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key=asdf,@a#.sd,yes,true')
                })
            })

            describe('allowReserved:false', () => {

                const serialization:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: false
                }
                
                it('number', () => {
                    const serialized = queryStringSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                it('string', () => {
                    const serialized = queryStringSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                it('boolean', () => {
                    const serialized = queryStringSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                it('undefined', () => {
                    const serialized = queryStringSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                it('null', () => {
                    const serialized = queryStringSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',
                        { asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key=asdf,%40a%23.sd,yes,true')
                })
            })
        })

        describe('style:spaceDelimited', () => {
            const style = 'spaceDelimited'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const serialization:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })
        })

        describe('style:pipeDelimited', () => {
            const style = 'pipeDelimited'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key',[123,'@a#.sd'],  serialization, constants)
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    const serialized = queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                it('object', () => {
                    expect(()=>queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })
        })

        describe('style:deepObject', () => {
            const style = 'deepObject'

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }

                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', '@a#.sd', serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const serialization: adapter.serialization.QuerySerialization = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                it('number', () => {
                    expect(()=>queryStringSerializer('key', 234, serialization, constants)).toThrow()
                })

                it('string', () => {
                    expect(()=>queryStringSerializer('key', '@a#.sd', serialization, constants)).toThrow()
                })

                it('boolean', () => {
                    expect(()=>queryStringSerializer('key', true, serialization, constants)).toThrow()
                })

                it('undefined', () => {
                    expect(()=>queryStringSerializer('key', undefined, serialization, constants)).toThrow()
                })

                it('null', () => {
                    expect(()=>queryStringSerializer('key', null, serialization, constants)).toThrow()
                })

                it('array', () => {
                    expect(()=>queryStringSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                it('object', () => {
                    const serialized = queryStringSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })    
}) 