import { DefaultDerializer } from '../../../packages/fetch/src/classes/DefaultDeserializer'


describe('fetch/classes/DefaultDeserializer', () => {
    const deserializer = new DefaultDerializer()
    describe('responseContent', () => {
        
        test('number', () => {
            expect(4).toEqual(4)
        })
    })
}) 