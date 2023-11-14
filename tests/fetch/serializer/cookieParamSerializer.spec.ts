import {COOKIE_CONSTANTS, cookieParamSerializer} from '@openapi-adapter/fetch'

describe('fetch/serialize/cookieParamSerializer', () => {
    const constants = COOKIE_CONSTANTS
    const serialization = {explode: false}

    test('string', () => {
        const value = '343gas'
        const serialized = cookieParamSerializer('key', value, serialization, constants)
        expect(serialized).toBe('key=343gas')
    })

    test('number', () => {
        const value = 313
        const serialized = cookieParamSerializer('key', value, serialization, constants)
        expect(serialized).toBe('key=313')
    })

    test('null', () => {
        const value = null
        const serialized = cookieParamSerializer('key', value, serialization, constants)
        expect(serialized).toBe('key=null')
    })

    test('undefined', () => {
        const value = undefined
        const serialized = cookieParamSerializer('key', value, serialization, constants)
        expect(serialized).toBe('key=')
    })

    test('array', () => {
        const value = ['asd',43432]
        const serialized = cookieParamSerializer('key', value, serialization, constants)
        expect(serialized).toBe('key=asd,43432')
    })
})