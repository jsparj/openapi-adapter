import type {adapter, specification} from '../../types'
export abstract class CoreSerializer<SerializedRequestBody>
    implements adapter.ISerializer<SerializedRequestBody>
{
    protected readonly settings: adapter.serializer.Settings<SerializedRequestBody>

    constructor(settings: adapter.serializer.Settings<SerializedRequestBody>)
    {
        this.settings = settings
    }

    public abstract pathString(
        pathId: string,
        parameters: Record<string, adapter.component.PathParameter> | undefined
    ): string

    public abstract queryString(
        parameters: Record<string, adapter.component.QueryParameter> | undefined
    ): string

    public abstract headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string> 

    public abstract requestBody(body: adapter.component.RequestBody): SerializedRequestBody


    public static defaultQuerySerialization: Required<adapter.component.QueryParameterSerialization> = {
        style: 'form',
        explode: true,
        allowReserved: false,
        mediaType: 'application/json',
    }

    public static defaultHeaderSerialization: Required<adapter.component.HeaderParameterSerialization> = {
        explode: false,
        mediaType: 'application/json',
    }
}