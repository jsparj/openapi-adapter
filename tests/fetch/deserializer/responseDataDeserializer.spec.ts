import { responseDataDeserializer } from '@openapi-adapter/fetch'
import {convertToReadableStreamUint8Array} from '../__helpers__/convertToReadableStreamUint8Array'

describe('fetch/deserializer/responseDataDeserializer', () => { 
    test('no-content', async () => {
        const deserialized = await responseDataDeserializer(
            'application/json',
            null
        )    
        expect(deserialized).toEqual(undefined)
    })

    test('null', async () => {
        const value = null
        const serialized = await responseDataDeserializer(
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(serialized).toEqual(value)
    })

    test('number', async () => {
        const value = 4
        const serialized = await responseDataDeserializer(
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(serialized).toEqual(value)
    })

    test('string', async () => {
        const value = 'asdhfgääåss'
        const serialized = await responseDataDeserializer( 
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(serialized).toEqual(value)
    })

    test('boolean', async () => {
        const value = true
        const deserialized = await responseDataDeserializer(
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(deserialized).toEqual(value)
    })

    test('array', async () => {
        const value = [true,null,'asdvbad',{ asf: 3, _:'4'}]
        const deserialized = await responseDataDeserializer(
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(deserialized).toEqual(value)
    })

    test('object', async () => {
        const value = { asf: 3, _:'4', arr:[true,null,'asdvbad',{ hreg: 3, _:'7'}] }
        const deserialized = await responseDataDeserializer(
            'application/json',
            convertToReadableStreamUint8Array(value)
        )    
        expect(deserialized).toEqual(value)
    })
})