import type {adapter,specification} from '../../types'

export function getParameterSerialization<T extends adapter.serialization.ParameterSerialization>(
    param: adapter.request.Param<T>
):
    | { type: 'media-serialization', mediaType: specification.MediaType, value: adapter.component.Any }
    | { type: 'default-serialization', serialization: Partial<T>, value: adapter.component.Any }
    | { type: 'plain', serialization: undefined, value: adapter.component.Any }
{
    const serialization = (
        typeof param === 'object'
            && param !== null
            && '__serialization__' in param
            ? param['__serialization__']
            : undefined
    ) as Partial<adapter.serialization.MediaSerialization & T> | undefined

    if (serialization) {
        if (typeof param !== 'object' || param === null)
        throw new Error('Parameter not an object for custom serialization')

        const value = param['value' as keyof typeof param]

        if (serialization.mediaType) {
            return {
                type: 'media-serialization',
                mediaType: serialization.mediaType,
                value
            }
        }
        else
        {
            return {
                type: 'default-serialization',
                serialization,
                value
            }
        }
    }
    else
    {
        return {
            type: 'plain',
            serialization: undefined,
            value: param
        }
    }
}