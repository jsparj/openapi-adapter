import { adapter, specification } from "@openapi-adapter/core";

export abstract class CoreSerializer<SerializedQueryParameters, SerializedBody>
    implements adapter.ISerializer<SerializedQueryParameters, SerializedBody>
{
    public abstract pathParameters(
        pathId: string,
        parameters: Record<string, adapter.component.PathParameter> | undefined
    ): string

    public abstract queryParameters(
        parameters: Record<string, adapter.component.QueryParameter> | undefined
    ): SerializedQueryParameters

    public abstract headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string> 

    public abstract body(
        body: adapter.component.RequestBody,
        mediaType: specification.MediaType
    ): SerializedBody


    public static defaultQuerySerialization: Required<adapter.component.QueryParameterSerialization> = {
        style: 'form',
        explode: true,
        allowReserved: false,
        mediaType: 'application/json',
    }

    public static defaulHeaderSerialization: Required<adapter.component.HeaderParameterSerialization> = {
        explode: false,
        mediaType: 'application/json',
    }
}