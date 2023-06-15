import type {adapter, specification} from '../../types'
export abstract class CoreSerializer<SerializedRequestBody>
    implements adapter.ISerializer<SerializedRequestBody>
{
    protected readonly settings: adapter.serialization.Settings<SerializedRequestBody>

    constructor(settings: adapter.serialization.Settings<SerializedRequestBody>)
    {
        this.settings = settings
    }

    public abstract pathString(
        pathId: string,
        parameters: Record<string, adapter.request.PathParameter> | undefined
    ): string

    public abstract queryString(
        parameters: Record<string, adapter.request.QueryParameter> | undefined
    ): string

    public abstract headerParameters(
        parameters: Record<string, adapter.request.HeaderParameter> | undefined
    ): Record<string, string> 

    public abstract requestBody(body: adapter.component.Media): Promise<SerializedRequestBody>


    public static defaultQuerySerialization: Exclude<
        adapter.serialization.QuerySerialization,
        adapter.serialization.MediaSerialization
    > = {
        style: 'form',
        explode: true,
        allowReserved: false
    }

    public static defaultHeaderSerialization: Exclude<
        adapter.serialization.HeaderSerialization,
        adapter.serialization.MediaSerialization
    > = {
        explode: false
    }
}