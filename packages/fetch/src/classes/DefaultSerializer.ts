import { adapter, CoreSerializer, specification } from "@openapi-adapter/core";
import { pathStringSerializer, queryStringSerializer, headerParameterSerializer } from "../helpers/serializer";
import { fetchAdapter } from "../../types";

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

        let output = pathId
        let pathKey: string | undefined = undefined
        
        while(pathKey = /{(.*?)}/.exec(output)?.[0])
        {   
            const template = pathKey.substring(1,pathKey.length-1)
            const keyPrefix = /^[^\w]*/.exec(template)?.[0] as '.' | ';' | ''
            const key = /[^\W]+/.exec(template)?.[0]
            const explode = /\w+\*$/.test(template)
            
            if (key === undefined) throw new Error(`pathId[${pathId}] contains template[${pathKey}] that is not valid in OpenApi 3.x definition.`)
            
            if (!(keyPrefix === '' || keyPrefix === '.' || keyPrefix === ';'))
                throw new Error(`pathId[${pathId}] contains keyPrefix[${typeof keyPrefix}] for key[${key}] that is not valid in OpenApi 3.x definition.`)
            
            const parameterValue = parameters[key]

            if (parameterValue === undefined) 
                throw new Error(`pathId[${pathId}] doesn't have path parameter for key[${key}].`)

            const pathVariable =  pathStringSerializer(
                key,
                parameterValue,
                !!keyPrefix?keyPrefix:undefined,
                explode
            )
            output = output.replace(
                pathKey,
                pathVariable
            )
        }

        return output
    }

    public override headerParameters(
        parameters: Record<string, adapter.component.HeaderParameter> | undefined
    ): Record<string, string>
    {
        if (!parameters) return {}
        
        const headerKeys = Object.keys(parameters)
        const headers: Record<string, string> = {}
        
        for (let i = 0; i < headerKeys.length; i++)
        {
            headers[headerKeys[i]] = headerParameterSerializer(parameters[headerKeys[i]])
        }
        return headers
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
            querySections.push(queryStringSerializer(queryKeys[i],parameters[queryKeys[i]])) 
        }
        
        return `?${querySections.join('&')}`
    }

    public override body(body: adapter.component.RequestBody, mediaType: specification.MediaType): BodyInit | undefined {
        throw new Error("Method not implemented.");
    }
}