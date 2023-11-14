**@openapi-adapter** is base class for making fully typed requests with intellisense against <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI</a> specifications. It is fast, lightweight and completely dependency-free. And all this with minimal bundle size.

The code is [MIT-licensed](./LICENSE) and free for use.

## Project Goals

1. Create fully typed and intellisensed apis from any valid OpenAPI specification.
2. Use **runtime-free types**, to minimize bundle size on production builds.
3. This library should never require any additional dependencies.


## Libraries in **@openapi-adapter** family:

| Library                     | Type        | Dev Stage     | Description                                                                                |
| :-------------------------- | :---------- | :-----------: | :----------------------------------------------------------------------------------------- |
| `@openapi-adapter/core`     | `core`      | `beta`        | Core library for doing requests and infering API-types from OpenApi 3.x specification.     |
| `@openapi-adapter/fetch`    | `handler`   | `beta`        | `OpenApiAdapter` class with `requestHandler` that is build around `fetch` library.         |


## How to

### Creating api class for your OpenAPI specification:

- _Example with: [iterated.Definition](../../examples/iterated.Definition)_

### Using your apis: 






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



