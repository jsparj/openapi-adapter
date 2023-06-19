 package for infering types from <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI</a> specification. It is fast, lightweight, completely dependency-free.

The code is [MIT-licensed](./LICENSE) and free for use.

# Summary
**@openapi-adapter/iterated** is typelibrary used for getting `adapter.Definition` for `@openapi-adapter/[core,fetch,axios]` from OpenApi 3.x specification json. The Definition can be then used for getting type information for the Api.

## Usage
```typescript
export interface YourApiSpecification 
{ // Copy-Paste your OpenAPI 3.x definition in json here: 
    "openapi": "3.x.x",
    "security": {
        ...
    },
    "components": {
        ...
    },
    "paths": {
        ...
    },
    ...
}
```
Then use `YourApiSpecification` in place of `T` in: 
```typescript
import {iterated} from '@openapi-adapter/iterated'
import {OpenApiAdapter} from '@openapi-adapter/fetch' 
// You can use any OpenApiAdapter from [core,fetch,axios]. 
import {YourApiSpecification} from '../path/to/your/specification'

export class YourApi extends FetchOpenApiAdapter<'your-api-namespace', iterated.Definition<YourApiSpecification>>
{
    ...
}
```
Keep in mind, you'll have to configure your own requestHandler if you are using OpenApiAdapter from `core`, and some other variables, see docs or examples specific to each on their docs.


## Supported type safety features:
- security
- components
  - schemas
    - ✅ type: `string, number, boolean, object, integer, null, array`
    - ✅ oneOf
    - ✅ anyOf 
    - ✅ not
    - ✅ items 
    - ✅ properties
    - ✅ additionalProperties
    - ✅ required
    - ✅ enum
    - ❗️ anyOf: `Partial of possible values` **_(really hard to do TS type that matches exaclty this specification)_**
    - ❗️ type: `integer` => `number`: **_(no integer type in TypeScript)_**
    - ❌ type: `<array of types> (To-Do)`
    - ❌ maxium: **_(no typing support in TypeScript)_**
    - ❌ exclusiveMaximum: **_(no typing support in TypeScript)_**
    - ❌ minimum: **_(no typing support in TypeScript)_**
    - ❌ exclusiveMinimum: **_(no typing support in TypeScript)_**
    - ❌ maxLength `(To-Do)`
    - ❌ minLength `(To-Do)`
    - ❌ pattern:  **_(no typing support in TypeScript, that can be inferred easily from regex)_**
    - ❌ maxItems `(To-Do)`
    - ❌ minItems `(To-Do)`
    - ❌ uniqueItems  `(To-Do)`
    - ❌ maxProperties  `(To-Do)`
    - ❌ minProperties  `(To-Do)`
    - ❌ prefixItems `(To-Do)`
  - responses
    - ✅ headers
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
        - ❌ encoding `(To-Do)`
  - parameters
    - ✅ name
    - ✅ in
    - ✅ required
    - ✅ explode
    - ✅ allowReserved
    - ✅ schema
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
        - ❌ encoding `(To-Do)`
  - requestBodies
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
        - ❌ encoding `(To-Do)`
    - ✅ required
  - headers 
    - ✅ required
    - ✅ explode
    - ✅ allowReserved
    - ✅ schema
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
        - ❌ encoding `(To-Do)`
  - securitySchemes
    - ✅ type: `apiKey, http`
    - ❗️ type: `oauth2, openIdConnect`: _(you have to manage token fetching by yourself)_
-  paths
    - `<api-path>`
      - ✅ parameters
      - `<http-method>: get, put, post, delete, options, head, patch, trace` 
        -  ✅ security
        -  ✅ parameters
        -  ✅ requestBody
        -  ✅ responses 
