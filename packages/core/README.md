**@openapi-adapter** is base class for making fully typed requests with intellisense against <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI</a> specifications. It is fast, lightweight and completely dependency-free. And all this with minimal bundle size.

The code is [MIT-licensed](./LICENSE) and free for use.

## Project Goals

1. Create fully typed and intellisensed apis from any valid OpenAPI specification.
2. Use **runtime-free types**, to minimize bundle size on production builds.
3. This library should never require any additional dependencies.


## Libraries in **@openapi-adapter** family:

| Library                     | Type        | Dev Stage     | Description                                                                                                                                                |
| :-------------------------- | :---------- | :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@openapi-adapter/core`     | `core`      | `beta`        | Core library for doing requests and infering API-types from OpenApi 3.x specification.                                                                     |
| `@openapi-adapter/fetch`    | `handler`   | `beta`        | `OpenApiAdapter` class with `requestHandler` that is build around `fetch` library.                                                                         |
| `@openapi-adapter/axios`    | `handler`   | `(To-Do)`     | `OpenApiAdapter` class with `requestHandler` that is build around `axios` library.                                                                         |
| `@openapi-adapter/cli`      | `cli`       | `(To-Do)`     | Create generated type definitions for huge OpenApi specifications. _(not that big improvement in intellisense speed, no effect in production build)_ |


## What this library family does: 

This library family creates abstract classes what you can use to make your own fully typed apis. 

```typescript
const yourApi = new YourApi()
// if authentication is needed somewhere, provide with (in this example 'basicAuth' is authId that is required in requests that need authorization):
yourApi.initializeAuth({ 
  basicAuth: {
    type: 'http',
    payload: {
      in: 'header'
      name: 'Authorization',
      value: 'Basic <token>'
    }
  }
})
const result = await yourapi.request(
  // Full intellisense support.
  'example/message/{messageId}/replies', 
  // Full intellisense support.
  'get', 
  // Full intellisense support.
  { 
    // If operation.security exists in specification:
    security: ['basicAuth'],

    // Following parameters support all common serialization methods from OpenApi parameter serialization, but you have to set your own media serializers in settings if you need parameter content serialization by mediaType.
    path: { 
      messageId: 3435264363457
    },
    cookies: {
      someRequiredCookie: 'Hello world!'
    },
    headers: { 
      'Uncommon-Test-Header-With-Special-Serialization': {
        // Full intellisense support also for this. (you should set correct default serizalization method for specific parameter type in settings to minimize need for custom __serialization__ definitions)
        __serializarion__: {mediaType: 'application/some-not-default-media-type'},
        value: ['some','header','as','array','from','specification']
      },
      'Some-Other-Array-Header-With-Default-Serialization': ['some','header','as','array','from','specification']
    },
    query: { 
      replyQuery: { 
        skip: 80,
        count: 40
      }
    },
    body: {
      mediaType: 'application/json', // you will need to define your own requsetBodySerializer in settings if you need to use other mediaTypes than application/json
      value: {
        some: 'body-as-object'
      }
    }
  }
)
// result is union objects of possible responses in intellisense support in format: 
result === {
  status: number
  code: `<api-namespace>/<http-label-or-status-code-if-non-standard>`
  headers, // full intellisense support for available headers (can still have additional keys that are not defined in specification), partial support for header values. Value is still always extends string, so no deserialization here.
  data //full intellisense support
}
// You should catch additional cases when using switch, because responses might have unspecified response statuses.
```

## Creating api class for your OpenAPI specification:

- **From:** [iterated.Definition](../../examples/iterated.Definition)
- **From:** [generated.Definition]() (TODO)

## Supported type safety features:
`$ref` fields are supported everywhere.

For OpenApi 3.1.x specification: 

- security
- components
  - schemas
    - ✅ type: `string, number, boolean, object, integer, null, array`
    - ✅ oneOf
    - ✅ allOf 
    - ✅ not
    - ✅ items 
    - ✅ properties
    - ✅ additionalProperties
    - ✅ required
    - ✅ enum
    - ❗️ anyOf: `current: Partial of possible values` **_(it might be possible to do TS type that matches exaclty this specification)_**
    - ❗️ type: `integer` => `number`: **_(no integer type in TypeScript)_**
    - ❓ description: `not supported with iterated.Definition`
    - ❌ type: `<array of types> (To-Do)`
    - ❌ maxium: **_(no typing support in TypeScript)_**
    - ❌ exclusiveMaximum: **_(no typing support in TypeScript)_**
    - ❌ minimum: **_(no typing support in TypeScript)_**
    - ❌ exclusiveMinimum: **_(no typing support in TypeScript)_**
    - ❌ maxLength `(To-Do)`
    - ❌ minLength `(To-Do)`
    - ❌ pattern:  **_(no typing support in TypeScript that can be inferred easily from regex)_**
    - ❌ maxItems `(To-Do)`
    - ❌ minItems `(To-Do)`
    - ❌ uniqueItems  `(To-Do)`
    - ❌ maxProperties  `(To-Do)`
    - ❌ minProperties  `(To-Do)`
  - responses
    - ✅ headers
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
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
  - requestBodies
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
    - ✅ required
  - headers 
    - ✅ required
    - ✅ explode
    - ✅ allowReserved
    - ✅ schema
    - ✅ content
      - `<media-type>` _(one or more)_
        - ✅ schema
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



