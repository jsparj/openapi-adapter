
**WARNING**: This project is still WIP and is subject to breaking changes.

---

**@openapi-adapter** is library for making fully typed requests with intellisense against <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI 3.x</a> specifications. 
This library is fast, lightweight and completely dependency-free. All this with minimal bundle size on production builds.

The code is [MIT-licensed](./LICENSE) and free for every use.

## Project Goals

1. Create fully typed and intellisensed apis from any valid OpenAPI 3.x specification.
2. Leverage TypeScript as much as possible to minimize bundle size on production builds.
3. This library should never require any additional dependencies.
4. Expect that OpenApi 3.x specification has all the valid information for every request. 

## Libraries in **@openapi-adapter** family:

| Library                                                                                    | Type        | Dev Stage      | Description                                                                                                                                                                                                   |
| :----------------------------------------------------------------------------------------- | :---------- | :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@openapi-adapter/core`](https://www.npmjs.com/package/@openapi-adapter/core)             | `core`      | `experimental` | Core library dependency for  this library family.                                                                                                                                                             |
| [`@openapi-adapter/fetch`](https://www.npmjs.com/package/@openapi-adapter/fetch)           | `handler`   | `experimental` | `OpenApiAdapter` class with `requestHandler` that is build around native `fetch` library. Only supports mutualTLS in browsers.                                                                                |
| [`@openapi-adapter/node-fetch`](https://www.npmjs.com/package/@openapi-adapter/node-fetch) | `handler`   | `experimental` | `OpenApiAdapter` class with `requestHandler` that is build around `node-fetch` library, supports **mutualTLS**                                                                                                |
| [`@openapi-adapter/cli`](https://www.npmjs.com/package/@openapi-adapter/cli)               | `cli`       | `experimental`      | Create generated type definitions for OpenApi specifications. _(not that big improvement in intellisense speed, no effect in production builds, but you can use component types from definition more easily)_ |


## What this library family does: 

This library family creates abstract classes what you can use to make your own fully typed apis. 

```typescript
const yourApi = new YourApi()
// if authorization is needed you have to call `initializeAuth` before calling `request`:
yourApi.initializeAuth({ 
  basicAuth: {
    type: 'http',
    token: {
      in: 'header'
      name: 'Authorization',
      value: 'Basic <token>'
    }
  }
})
const result = await yourApi.request(
  // Full intellisense support, only available pathIds will be shown:
  'example/message/{messageId}/replies', 
  // Full intellisense support, only http methods found in this pathId will be shown:
  'get', 
  // Full intellisense support, fully typed request information for this path and method.
  { 
    // If operation.security exists in specification:
    security: ['basicAuth'],

    // Following parameters support all common serialization methods from OpenApi parameter serialization. You'll have to set your own media serializers in settings if you need parameter content serialization by mediaType.
    path: { 
      messageId: 3435264363457
    },
    cookies: {
      someRequiredCookie: 'Hello world!'
    },
    headers: { 
      'Header-With-Special-Serialization': {
        // Full intellisense support also for this. (you should set correct default serizalization method for specific parameter type in settings to minimize need for custom __serialization__ definitions)
        __serializarion__: {mediaType: 'application/some-media-type'},
        value: ['some','header','as','array','from','specification']
      },
      'Normal-Header': "some-header-value"
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
// result is union of objects with all possible responses that are defined in specification: 
result === {
  status: number
  code: `<api-namespace>/<http-status-label-or-code-if-non-standard>`
  headers, // full intellisense support for available headers (can still have additional keys that are not defined in specification), partial support for header values. Value is still always extends string, so no deserialization here.
  data //full intellisense support
}

// Handle error status after request on your own.
switch(result.status) {
  case HttpStatus.OK:
    // do something with fully typed data or headers...
    ...
    break

  // You should always catch additional cases when using switch:
  default:
    ...
    break
}

```

## Creating your own OpenApiAdapter:
[[see examples]](../../examples)
