import { adapter, CoreSerializer } from "@openapi-adapter/core";
import { pathParameterSerializer, queryParameterSerializer } from "../helpers/serializer";
import { fetchAdapter } from "../types";

export class DefaultSerializer
    extends CoreSerializer<string, BodyInit | undefined>
    implements fetchAdapter.ISerializer
{
    public override pathParameters(
        pathId: string,
        parameters: Record<string, adapter.component.PathParameter> | undefined
    ): string
    {
        if (!parameters) return pathId;

        const output = pathId
        let template: string | undefined = undefined
        
        while(template = /{(.*?)}/.exec(output)?.[0])
        {   
            const keyPrefix = /^[^\w]*/.exec(template)?.[0] as '.' | ';' | undefined
            const key = /[^\W]+/.exec(template)?.[0] 
            const explode = /\w+\*$/.test(template)
            
            if (key === undefined) throw new Error(`pathId[${pathId}] contains template[${template}] that is not valid in OpenApi 3.x definition.`)
            
            if (!(keyPrefix === undefined || keyPrefix === '.' || keyPrefix === ';'))
                throw new Error(`pathId[${pathId}] contains keyPrefix[${keyPrefix}] that is not valid in OpenApi 3.x definition.`)
            
            const parameterValue = parameters[key]

            if (!parameterValue) 
                throw new Error(`pathId[${pathId}] doesn't have path parameter for key[${key}].`)

            output.replace(
                `{${template}}`,
                pathParameterSerializer(
                    key,
                    parameterValue,
                    keyPrefix,
                    explode
                )
            )
        }

        return output
    }

    public override queryParameters(
        parameters: Record<string, adapter.component.QueryParameter> | undefined
    ): string
    {
        if (!parameters) return ''
        const queryKeys = Object.keys(parameters)
        if (queryKeys.length === 0) return ''
        let querySections: string[] = []

        for (let i = 0; i < queryKeys.length; i++)
        {
            querySections.push(queryParameterSerializer(queryKeys[i],parameters[queryKeys[i]])) 
        }
        
        return `?${querySections.join('&')}`
    }

    public override headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string>
    {
        throw new Error("Method not implemented.");
    }


    public override body(body: adapter.component.RequestBody): BodyInit | undefined {
        throw new Error("Method not implemented.");
    }
}