import { specification } from "../../../../../packages/core/types/specification";

export namespace securityScheme {
    
    export type Id = 'globalHeaderApiKey' |'globalQueryApiKey'| 'basicHttp' | 'bearerHttp' | 'someOAuth2' | 'someOpenIdConnect'
}

export const security: readonly specification.SecurityRequirementObject[] = [{
    'globalHeaderApiKey': []
},
{
    'globalQueryApiKey': []
}]

export const pathSecurity: readonly specification.SecurityRequirementObject[] = [
    {
        'basicHttp': [],
        'someOAuth2': []
    },
    {
        'bearerHttp': [],
        'someOAuth2': []
    },
    {
        'someOpenIdConnect': []
    }
]

export const securitySchemes : Record<string, specification.SecuritySchemeObject> = {
    globalHeaderApiKey: {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "header"
    },
    globalQueryApiKey: {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "query"
    },
    basicHttp: {
        "type": "http",
        "scheme": "basic"
    },
    bearerHttp: {
        "type": "http",
        "scheme": "bearer"
    },
    someOAuth2: {
        type: "oauth2",
        flows: {
            "implicit": {
                "scopes": {}
            }
        }
    },
    someOpenIdConnect: {
        type: "openIdConnect",
        openIdConnectUrl: "https://example.com"
    }
}