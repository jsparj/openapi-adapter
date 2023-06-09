import { specification } from "../../../../../packages/core/types/specification";

export namespace securityScheme {
    
    export type Id = 'globalApiKey' | 'basicHttp' | 'bearerHttp' | 'someOAuth2' | 'someOpenIdConnect'
}

export const security: readonly specification.SecurityRequirementObject[] = [{
    'globalApiKey': []
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
    globalApiKey: {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "header"
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