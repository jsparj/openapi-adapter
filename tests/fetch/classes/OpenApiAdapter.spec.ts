import {IteratedTestApi} from '../__mocks__/IteratedTestApi'

describe('fetch/classes/OpenApiAdapter', () => { 

    const array = ['asd', 3424]
    const enumValue = '_1_'
    const number = -11342
    const object = {
        string: '€#"D_sd?',
        number: -434
    }
    const stringValue = 'sDFVJ=)/(Y&/BN%%#?)(/)'

    describe('iterated', () => {
        const api = new IteratedTestApi()
        describe('pathParams', () => {
            describe('style:simple', () => {
                test('explode:yes', async () => {
                    const response = await api.request('/path/s/simple/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}', 'put', {
                        security: ['someOAuth2', 'basicHttp'],
                        path: {
                            array,
                            null: null,
                            object,
                            string: stringValue
                        },
                        body: undefined,
                        cookie: {},
                        header: {},
                        query: {}
                    })
                })
            })
        })

    })
})