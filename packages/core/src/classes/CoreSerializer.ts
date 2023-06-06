import { adapter } from "@openapi-adapter/core";

export abstract class CoreSerializer<SerializedQueryParameters, SerializedBody>
    implements adapter.ISerializer<SerializedQueryParameters, SerializedBody>
{
    abstract pathParameters(
        pathId: string,
        parameters: Record<string, adapter.component.PathParameter> | undefined
    ): string

    abstract queryParameters(
        parameters: Record<string, adapter.component.QueryParameter> | undefined
    ): SerializedQueryParameters

    abstract headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string> 

    abstract body(
        body: adapter.component.RequestBody
    ): SerializedBody
}