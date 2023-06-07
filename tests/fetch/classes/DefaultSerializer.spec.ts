import { adapter } from '@openapi-adapter/core'
import { DefaultSerializer } from '../../../packages/fetch/src/classes/DefaultSerializer'


describe('fetch/classes/DefaultSerializer', () => {
    const serializer = new DefaultSerializer()
    /*
    describe('headerParameters', () => {
        
    })
    */
    
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
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/5/string/c.hsu#sd@as4/array/5,c.hsu%23sd%40as4/object/number=5,string=c.hsu%23sd%40as4/index')
        })

        test('simple:explode=false', () => {
            const pathId = '/v1/number/{num}/string/{str}/array/{arr}/object/{obj}/index'
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/5/string/c.hsu#sd@as4/array/5,c.hsu%23sd%40as4/object/number,5,string,c.hsu%23sd%40as4/index')
        })


        test('label:explode=true', () => {
            const pathId = '/v1/number/{.num*}/string/{.str*}/array/{.arr*}/object/{.obj*}/index'
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/.5/string/.c.hsu#sd@as4/array/.5.c.hsu%23sd%40as4/object/.number=5.string=c.hsu%23sd%40as4/index')
        })

        test('label:explode=false', () => {
            const pathId = '/v1/number/{.num}/string/{.str}/array/{.arr}/object/{.obj}/index'
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/.5/string/.c.hsu#sd@as4/array/.5,c.hsu%23sd%40as4/object/.number,5,string,c.hsu%23sd%40as4/index')
        })

        test('matrix:explode=true', () => {
            const pathId = '/v1/number/{;num*}/string/{;str*}/array/{;arr*}/object/{;obj*}/index'
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/;num=5/string/;str=c.hsu#sd@as4/array/;arr=5;arr=c.hsu%23sd%40as4/object/;number=5;string=c.hsu%23sd%40as4/index')
        })

        test('matrix:explode=false', () => {
            const pathId = '/v1/number/{;num}/string/{;str}/array/{;arr}/object/{;obj}/index'
            const path = serializer.pathParameters(pathId, pathParams)
            expect(path).toEqual('/v1/number/;num=5/string/;str=c.hsu#sd@as4/array/;arr=5,c.hsu%23sd%40as4/object/;obj=number,5,string,c.hsu%23sd%40as4/index')
        })
    })

    test('queryParameters', () => {
        const queryParams: Record<string, adapter.component.QueryParameter> = {
            form_number: {
                style: 'form',
                value: 1234
            },
            form_boolean: {
                style: 'form',
                value: false
            },
            form_string: {
                style: 'form',
                value: 'dgsyds#..'
            },
            form_allowReserved_string: {
                style: 'form',
                allowReserved: true,
                value: 'dgs%%:@y43ds#..'
            },
            form_array: {
                style: 'form',
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            form_explode_array: {
                style: 'form',
                explode: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            form_explode_allowReserved_array: {
                style: 'form',
                explode: true,
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            form_allowReserved_array: {
                style: 'form',
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            form_object: {
                style: 'form',
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            form_explode_object: {
                style: 'form',
                explode: true,
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            form_explode_allowReserved_object: {
                style: 'form',
                explode: true,
                allowReserved: true,
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            form_allowReserved_object: {
                style: 'form',
                allowReserved: true,
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            spaceDelimited_array: {
                style: 'spaceDelimited',
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            spaceDelimited_explode_array: {
                style: 'spaceDelimited',
                explode: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            spaceDelimited_explode_allowReserved_array: {
                style: 'spaceDelimited',
                explode: true,
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            spaceDelimited_allowReserved_array: {
                style: 'spaceDelimited',
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            pipeDelimited_array: {
                style: 'pipeDelimited',
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            pipeDelimited_explode_array: {
                style: 'pipeDelimited',
                explode: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            pipeDelimited_explode_allowReserved_array: {
                style: 'pipeDelimited',
                explode: true,
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            pipeDelimited_allowReserved_array: {
                style: 'pipeDelimited',
                allowReserved: true,
                value: ['dhvu%32#sadf4545@',354,undefined]
            },
            deepObject_explode: {
                style: 'deepObject',
                explode: true,
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            },
            deepObject_explode_allowReserved: {
                style: 'deepObject',
                explode: true,
                allowReserved: true,
                value: { abc: 'dhvu%32#sadf4545@', dfg: 354, hij: undefined }
            }
        }
       
        const queryString = serializer.queryParameters(queryParams);
        expect(queryString).toEqual(
            '?form_number=1234' +
            '&form_boolean=false' +
            '&form_string=dgsyds%23..' +
            '&form_allowReserved_string=dgs%%:@y43ds#..' +
            '&form_array=dhvu%32%23sadf4545%40,354,' +
            '&form_explode_array=dhvu%32%23sadf4545%40' +
            '&form_explode_array=354&form_explode_array=' +
            '&form_explode_allowReserved_array=dhvu%32#sadf4545@' +
            '&form_explode_allowReserved_array=354' +
            '&form_explode_allowReserved_array=' +
            '&form_allowReserved_array=dhvu%32#sadf4545@,354,' +
            '&form_object=abc,dhvu%32%23sadf4545%40,dfg,354,hij,' +
            '&abc=dhvu%32%23sadf4545%40&dfg=354&hij=' +
            '&abc=dhvu%32#sadf4545@&dfg=354&hij=' +
            '&form_allowReserved_object=abc,dhvu%32#sadf4545@,dfg,354,hij,' +
            '&spaceDelimited_array=dhvu%32%23sadf4545%40%20354%20' +
            '&spaceDelimited_explode_array=dhvu%32%23sadf4545%40' +
            '&spaceDelimited_explode_array=354' +
            '&spaceDelimited_explode_array=' +
            '&spaceDelimited_explode_allowReserved_array=dhvu%32#sadf4545@' +
            '&spaceDelimited_explode_allowReserved_array=354' +
            '&spaceDelimited_explode_allowReserved_array=' +
            '&spaceDelimited_allowReserved_array=dhvu%32#sadf4545@%20354%20' +
            '&pipeDelimited_array=dhvu%32%23sadf4545%40|354|' +
            '&pipeDelimited_explode_array=dhvu%32%23sadf4545%40' +
            '&pipeDelimited_explode_array=354' +
            '&pipeDelimited_explode_array=' +
            '&pipeDelimited_explode_allowReserved_array=dhvu%32#sadf4545@' +
            '&pipeDelimited_explode_allowReserved_array=354' +
            '&pipeDelimited_explode_allowReserved_array=' +
            '&pipeDelimited_allowReserved_array=dhvu%32#sadf4545@|354|' +
            '&deepObject_explode[abc]=dhvu%32%23sadf4545%40' +
            '&deepObject_explode[dfg]=354' +
            '&deepObject_explode[hij]=' +
            '&deepObject_explode_allowReserved[abc]=dhvu%32#sadf4545@' +
            '&deepObject_explode_allowReserved[dfg]=354' +
            '&deepObject_explode_allowReserved[hij]='
        )
    })
}) 