import { streamUInt8ArrayToString } from '../../../packages/fetch/src/helpers/deserializer/streamUInt8ArrayToString';
import { DefaultDerializer } from '../../../packages/fetch/src/classes/DefaultDeserializer'

function createStreamFromUnknown(data: unknown): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    const jsonString = String(data)
    const raw = encoder.encode(jsonString)

    return new ReadableStream({
        type: "bytes",
        start(controller: ReadableByteStreamController) {
            controller.enqueue(raw)
            controller.close()
        }
    })
}

describe('fetch/classes/DefaultDeserializer', () => {
    const deserializer = new DefaultDerializer()

    describe('responseContent', () => {

        describe('application/json', () => {
            const mediaType = 'application/json'
            test('null', async () => {
                const value = null
                const deserialized = await deserializer.responseContent(
                    createStreamFromUnknown(JSON.stringify(value)),
                    mediaType
                )
                expect(deserialized).toEqual(value)
            })
            
            test('string', async () => {
                const value = 'asdjvdh'
                const deserialized = await deserializer.responseContent(
                    createStreamFromUnknown(JSON.stringify(value)),
                    mediaType
                )
                expect(deserialized).toEqual(value)
            })

            test('number', async () => {
                const value = 436758837438
                const deserialized = await deserializer.responseContent(
                    createStreamFromUnknown(JSON.stringify(value)),
                    mediaType
                )
                expect(deserialized).toEqual(value)
            })

            test('array', async () => {
                const value = [436758837438,'asd34',null,['asdvjsd','43']]
                const deserialized = await deserializer.responseContent(
                    createStreamFromUnknown(JSON.stringify(value)),
                    mediaType
                )
                expect(deserialized).toEqual(value)
            })

            test('object', async () => {
                const value = { n: 436758837438, s: 'asd34', nul: null, a: ['asdvjsd', '43'] }
                const deserialized = await deserializer.responseContent(
                    createStreamFromUnknown(JSON.stringify(value)),
                    mediaType
                )
                expect(deserialized).toEqual(value)
            })
        })

        
    })
}) 