WARNING: This project is still WIP and is subject to changes. Everything should still work as expected.

**@openapi-adapter** is base class for making fully typed requests with intellisense against <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI 3.x</a> specifications. 
Thils library is fast, lightweight and completely dependency-free. All this with minimal bundle size on production builds.

The code is [MIT-licensed](./LICENSE) and free for every use.

## Project Goals

1. Create fully typed and intellisensed apis from any valid OpenAPI 3.x specification.
2. Leverage TypeScript as much as possible to minimize bundle size on production builds.
3. This library should never require any additional dependencies.
4. Expect that OpenApi 3.x specification has all the valid information for every request. 

## Libraries in **@openapi-adapter** family:

| Library                     | Type        | Dev Stage     | Description                                                                                                                                                       |
| :-------------------------- | :---------- | :-----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@openapi-adapter/core`     | `core`      | `beta`        | Core library for doing requests and infering API-types from OpenApi 3.x specification.                                                                            |
| `@openapi-adapter/fetch`    | `handler`   | `beta`        | `OpenApiAdapter` class with `requestHandler` that is build around `fetch` library.                                                                                |
| `@openapi-adapter/axios`    | `handler`   | `(To-Do)`     | `OpenApiAdapter` class with `requestHandler` that is build around `axios` library.                                                                                |
| `@openapi-adapter/cli`      | `cli`       | `(To-Do)`     | Create generated type definitions for huge OpenApi specifications. _(likely not that big improvement in type intellisense speed, no effect in production build.)_ |


## What this library family does: 

This library family creates abstract classes what you can use to make your own fully typed apis. 

```typescript
// create Api class for your openapi schema, more info about this can be found on `@openapi-adapter/fetch` or ´@openapi-adapter/axios` README.md
class YourApi extends OpenApiAdapter<...> {
  ...
}

const yourApi = new YourApi()
// if authorization is needed you have to call `initializeAuth` before calling `request`:
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
  // Full intellisense support, only available pathIds will be shown:
  'example/message/{messageId}/replies', 
  // Full intellisense support, only http methods found in this pathId will be shown:
  'get', 
  // Full intellisense support, fully typed request information for this path and method.
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

// Handle error status after request on your own.
switch(result.code) {
  case HttpStatus.OK:
    ...
    break

  // You should catch additional cases when using switch, because responses might have unspecified response statuses _(it is very common that OpenApi specifications don't specify all edge cases for possible errors)_.
  default:
    ...
    break
}

```

## Creating api class for your OpenAPI specification:

- **From:** [iterated.Definition](../../examples/iterated.Definition)
- **From:** [generated.Definition]() (TODO)

