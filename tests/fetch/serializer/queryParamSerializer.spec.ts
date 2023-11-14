import type { adapter} from '@openapi-adapter/core'
import {queryParamSerializer, QUERY_CONSTANTS } from '@openapi-adapter/fetch'


describe('fetch/serializer/queryParamSerializer', () => {
    const constants = QUERY_CONSTANTS

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
                
                test('number', () => {
                    const serialized = queryParamSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                test('string', () => {
                    const serialized = queryParamSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                test('boolean', () => {
                    const serialized = queryParamSerializer('key', true, serialization,constants)
                    expect(serialized).toEqual('key=true')
                })

                test('undefined', () => {
                    const serialized = queryParamSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                test('null', () => {
                    const serialized = queryParamSerializer('key',  null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('asdf=%40a%23.sd&yes=true')
                })
            })

            describe('allowReserved:true', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: true
                }

                test('number', () => {
                    const serialized = queryParamSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                test('string', () => {
                    const serialized = queryParamSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                test('boolean', () => {
                    const serialized = queryParamSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                test('undefined', () => {
                    const serialized = queryParamSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                test('null', () => {
                    const serialized = queryParamSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key', { asdf: '@a#.sd', yes: true }, serialization, constants)
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
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
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
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=@a#.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123&key=%40a%23.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
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
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    expect(()=>queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    allowReserved: false,
                    explode: true
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    expect(()=>queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
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
                
                test('number', () => {
                    const serialized = queryParamSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                test('string', () => {
                    const serialized = queryParamSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_#_s.tring@')
                })

                test('boolean', () => {
                    const serialized = queryParamSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                test('undefined', () => {
                    const serialized = queryParamSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                test('null', () => {
                    const serialized = queryParamSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123,@a#.sd')
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',
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
                
                test('number', () => {
                    const serialized = queryParamSerializer('key', 234, serialization, constants)
                    expect(serialized).toEqual('key=234')
                })

                test('string', () => {
                    const serialized = queryParamSerializer('key', '_#_s.tring@', serialization, constants)
                    expect(serialized).toEqual('key=_%23_s.tring%40')
                })

                test('boolean', () => {
                    const serialized = queryParamSerializer('key', true, serialization, constants)
                    expect(serialized).toEqual('key=true')
                })

                test('undefined', () => {
                    const serialized = queryParamSerializer('key', undefined, serialization, constants)
                    expect(serialized).toEqual('key=')
                })

                test('null', () => {
                    const serialized = queryParamSerializer('key', null, serialization, constants)
                    expect(serialized).toEqual('key=null')
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123,%40a%23.sd')
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',
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
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123%20@a#.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {

                const serialization:  adapter.serialization.QuerySerialization  = {
                    explode,
                    style,
                    allowReserved: false
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123%20%40a%23.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
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
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key',[123,'@a#.sd'],  serialization, constants)
                    expect(serialized).toEqual('key=123|@a#.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
                })
            })

            describe('allowReserved:false', () => {
                const serialization:  adapter.serialization.QuerySerialization  = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    const serialized = queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)
                    expect(serialized).toEqual('key=123|%40a%23.sd')
                })

                test('object', () => {
                    expect(()=>queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)).toThrow()
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

                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', '@a#.sd', serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    expect(()=>queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=@a#.sd&key[yes]=true')
                })
            })

            describe('allowReserved:false', () => {
                const serialization: adapter.serialization.QuerySerialization = {
                    style,
                    explode,
                    allowReserved: false
                }
                
                test('number', () => {
                    expect(()=>queryParamSerializer('key', 234, serialization, constants)).toThrow()
                })

                test('string', () => {
                    expect(()=>queryParamSerializer('key', '@a#.sd', serialization, constants)).toThrow()
                })

                test('boolean', () => {
                    expect(()=>queryParamSerializer('key', true, serialization, constants)).toThrow()
                })

                test('undefined', () => {
                    expect(()=>queryParamSerializer('key', undefined, serialization, constants)).toThrow()
                })

                test('null', () => {
                    expect(()=>queryParamSerializer('key', null, serialization, constants)).toThrow()
                })

                test('array', () => {
                    expect(()=>queryParamSerializer('key', [123,'@a#.sd'], serialization, constants)).toThrow()
                })

                test('object', () => {
                    const serialized = queryParamSerializer('key',{ asdf: '@a#.sd', yes: true }, serialization, constants)
                    expect(serialized).toEqual('key[asdf]=%40a%23.sd&key[yes]=true')
                })
            })
        })
    })    
}) 