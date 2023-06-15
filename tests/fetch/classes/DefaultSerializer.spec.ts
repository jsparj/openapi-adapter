import type { adapter } from '@openapi-adapter/core'
import { DefaultSerializer } from '../../../packages/fetch/src/classes/DefaultSerializer'


describe('fetch/classes/DefaultSerializer', () => {
    const serializer = new DefaultSerializer()
    
    describe('headerParameters',() => {
        const headerParams: Record<string, adapter.request.HeaderParameter> = {
            simple_array: ['dhvu%32#sadf4545@',354,undefined],
            simple_boolean: false,
            simple_explode_array: {
                __serialization__: {
                    explode: true
                },
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            simple_explode_object: {
                __serialization__: {
                    explode: true
                },
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            simple_number: 1234,
            simple_object:  { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined },
            simple_string: 'dgsyds#..',
        }

        const serialized = serializer.headerParameters(headerParams)
        expect(serialized).toEqual({
            simple_array: "dhvu%32#sadf4545@,354,",
            simple_boolean: "false",
            simple_explode_array: "dhvu%32#sadf4545@.354.",
            simple_explode_object: "abc=dhvu%32#sadf4545@,dfg=354,hij=",
            simple_number: "1234",
            simple_object: "abc,dhvu%32#sadf4545@,dfg,354,hij,",
            simple_string: "dgsyds#..",
        })
    })
    
    describe('pathParameters', () => {
        const pathParams = {
            num: 5,
            str: 'c.hsu#sd@as4',
            arr: [5, 'c.hsu#sd@as4'],
            obj: {
                number: 5,
                string: 'c.hsu#sd@as4',
            }
        }
        test('simple:explode=true', () => {
            const pathId = '/v1/number/{num*}/string/{str*}/array/{arr*}/object/{obj*}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/5/string/c.hsu#sd@as4/array/5,c.hsu#sd@as4/object/number=5,string=c.hsu#sd@as4/index')
        })

        test('simple:explode=false', () => {
            const pathId = '/v1/number/{num}/string/{str}/array/{arr}/object/{obj}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/5/string/c.hsu#sd@as4/array/5,c.hsu#sd@as4/object/number,5,string,c.hsu#sd@as4/index')
        })

        test('label:explode=true', () => {
            const pathId = '/v1/number/{.num*}/string/{.str*}/array/{.arr*}/object/{.obj*}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/.5/string/.c.hsu#sd@as4/array/.5.c.hsu#sd@as4/object/.number=5.string=c.hsu#sd@as4/index')
        })

        test('label:explode=false', () => {
            const pathId = '/v1/number/{.num}/string/{.str}/array/{.arr}/object/{.obj}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/.5/string/.c.hsu#sd@as4/array/.5,c.hsu#sd@as4/object/.number,5,string,c.hsu#sd@as4/index')
        })

        test('matrix:explode=true', () => {
            const pathId = '/v1/number/{;num*}/string/{;str*}/array/{;arr*}/object/{;obj*}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/;num=5/string/;str=c.hsu#sd@as4/array/;arr=5;arr=c.hsu#sd@as4/object/;number=5;string=c.hsu#sd@as4/index')
        })

        test('matrix:explode=false', () => {
            const pathId = '/v1/number/{;num}/string/{;str}/array/{;arr}/object/{;obj}/index'
            const path = serializer.pathString(pathId, pathParams)
            expect(path).toEqual('/v1/number/;num=5/string/;str=c.hsu#sd@as4/array/;arr=5,c.hsu#sd@as4/object/;obj=number,5,string,c.hsu#sd@as4/index')
        })
    })

    describe('queryParameters', () => {

        test('form', () => {
            const queryParams: Record<string, adapter.request.QueryParameter> = {
                form_number: 1234,
                form_boolean: false,
                form_string: 'dgsyds#..',
                form_allowReserved_string: {
                    __serialization__: {
                        allowReserved: true,    
                    },
                    value: 'dgs%%:@y43ds#..'
                },
                form_array: ['dhvu%32#sadf4545@',354,undefined],
                form_nexplode_array: {
                    __serialization__: {
                        explode: false,    
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                form_nexplode_allowReserved_array: {
                    __serialization__: {
                        explode: false,
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                form_allowReserved_array: {
                    __serialization__: {
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                form_object: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined },
                form_nexplode_object: {
                    __serialization__: {
                        explode: false,
                    },
                    value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
                },
                form_nexplode_allowReserved_object: {
                    __serialization__: {
                        explode: false,
                        allowReserved: true
                    },
                    value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
                },
                form_allowReserved_object: {
                    __serialization__: {
                        allowReserved: true
                    },
                    value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
                },
            }
            const queryString = serializer.queryString(queryParams);
            expect(queryString).toEqual(
                '?form_number=1234&form_boolean=false' +
                '&form_string=dgsyds%23..' +
                '&form_allowReserved_string=dgs%%:@y43ds#..' +
                '&form_array=dhvu%32%23sadf4545%40&form_array=354' +
                '&form_array=' +
                '&form_nexplode_array=dhvu%32%23sadf4545%40,354,' +
                '&form_nexplode_allowReserved_array=dhvu%32#sadf4545@,354,' +
                '&form_allowReserved_array=dhvu%32#sadf4545@' +
                '&form_allowReserved_array=354' +
                '&form_allowReserved_array=' +
                '&abc=dhvu%32%23sadf4545%40&dfg=354&hij=' +
                '&form_nexplode_object=abc,dhvu%32%23sadf4545%40,dfg,354,hij,' +
                '&form_nexplode_allowReserved_object=abc,dhvu%32#sadf4545@,dfg,354,hij,' +
                '&abc=dhvu%32#sadf4545@&dfg=354&hij=' 
            )
        })

        test('spaceDelimited', () => {
            const queryParams: Record<string, adapter.request.QueryParameter> = {
                spaceDelimited_array: {
                    __serialization__: {
                        style: 'spaceDelimited',
                    },
                    style: 'spaceDelimited',
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                spaceDelimited_nexplode_array: {
                    __serialization__: {
                        style: 'spaceDelimited',
                        explode: false
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                spaceDelimited_nexplode_allowReserved_array: {
                    __serialization__: {
                        style: 'spaceDelimited',
                        explode: false,
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                spaceDelimited_allowReserved_array: {
                    __serialization__: {
                        style: 'spaceDelimited',
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
            }
            const queryString = serializer.queryString(queryParams);
            expect(queryString).toEqual(
                '?spaceDelimited_array=dhvu%32%23sadf4545%40' +
                '&spaceDelimited_array=354' +
                '&spaceDelimited_array=' +
                '&spaceDelimited_nexplode_array=dhvu%32%23sadf4545%40%20354%20' +
                '&spaceDelimited_nexplode_allowReserved_array=dhvu%32#sadf4545@%20354%20' +
                '&spaceDelimited_allowReserved_array=dhvu%32#sadf4545@' +
                '&spaceDelimited_allowReserved_array=354' +
                '&spaceDelimited_allowReserved_array=' 
            )
        })

        test('pipeDelimited', () => {
            const queryParams: Record<string, adapter.request.QueryParameter> = {
                pipeDelimited_array: {
                    __serialization__: {
                        style: 'pipeDelimited',
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                pipeDelimited_nexplode_array: {
                    __serialization__: {
                        style: 'pipeDelimited',
                        explode: false,
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                pipeDelimited_nexplode_allowReserved_array: {
                    __serialization__: {
                        style: 'pipeDelimited',
                        explode: false,
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
                pipeDelimited_allowReserved_array: {
                    __serialization__: {
                        style: 'pipeDelimited',
                        allowReserved: true
                    },
                    value: ['dhvu%32#sadf4545@',354,undefined]
                },
            }
            const queryString = serializer.queryString(queryParams);
            expect(queryString).toEqual(
                '?pipeDelimited_array=dhvu%32%23sadf4545%40' +
                '&pipeDelimited_array=354&pipeDelimited_array=' +
                '&pipeDelimited_nexplode_array=dhvu%32%23sadf4545%40|354|' +
                '&pipeDelimited_nexplode_allowReserved_array=dhvu%32#sadf4545@|354|' +
                '&pipeDelimited_allowReserved_array=dhvu%32#sadf4545@' +
                '&pipeDelimited_allowReserved_array=354' +
                '&pipeDelimited_allowReserved_array=' 
            )
        })

        test('deepObject', () => {
            const queryParams: Record<string, adapter.request.QueryParameter> = {
                deepObject: {
                    __serialization__: {
                        style: 'deepObject',
                    },
                    value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
                },
                deepObject_allowReserved: {
                    __serialization__: {
                        style: 'deepObject',
                        allowReserved: true
                    },
                    value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
                }
            }
            const queryString = serializer.queryString(queryParams);
            expect(queryString).toEqual(
                '?deepObject[abc]=dhvu%32%23sadf4545%40' +
                '&deepObject[dfg]=354' +
                '&deepObject[hij]=' +
                '&deepObject_allowReserved[abc]=dhvu%32#sadf4545@' +
                '&deepObject_allowReserved[dfg]=354' +
                '&deepObject_allowReserved[hij]=' 
            )
        })
    })

    describe('requestBody', () => {
        
        test('null', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: null
            })    
            expect(serialized).toEqual('null')
        })

        test('undefined', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: undefined
            })    
            expect(serialized).toEqual(undefined)
        })

        test('number', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: 4
            })    
            expect(serialized).toEqual('4')
        })

        test('string', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: 'asdhfgääåss'
            })    
            expect(serialized).toEqual('\"asdhfgääåss\"')
        })

        test('boolean', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: true
            })    
            expect(serialized).toEqual('true')
        })

        test('array', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: [true,undefined,'asdvbad',{ asf: 3, _:'4'}]
            })    
            expect(serialized).toEqual('[true,null,\"asdvbad\",{\"asf\":3,\"_\":\"4\"}]')
        })

        test('object', async () => {
            const serialized = await serializer.requestBody({ 
                mediaType: 'application/json',
                value: { asf: 3, _:'4', arr:[true,undefined,null,'asdvbad',{ hreg: 3, _:'7'}] }
            })    
            expect(serialized).toEqual('{\"asf\":3,\"_\":\"4\",\"arr\":[true,null,null,\"asdvbad\",{\"hreg\":3,\"_\":\"7\"}]}')
        })
    })
}) 