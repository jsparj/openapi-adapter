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
| [`@openapi-adapter/fetch`](https://www.npmjs.com/package/@openapi-adapter/fetch)           | `handler`   | `experimental` | `OpenApiAdapter` class with `requestHandler` that is build around native `fetch` library. Only supports **mutualTLS** in browsers.                                                                                |
| [`@openapi-adapter/node-fetch`](https://www.npmjs.com/package/@openapi-adapter/node-fetch) | `handler`   | `experimental` | `OpenApiAdapter` class with `requestHandler` that is build around `node-fetch` library, supports **mutualTLS**                                                                                                |
| [`@openapi-adapter/cli`](https://www.npmjs.com/package/@openapi-adapter/cli)               | `cli`       | `experimental`      | Create generated type definitions for OpenApi specifications. _(not that big improvement in intellisense speed, no effect in production builds, but you can use component types from definition more easily)_ |


## Creating your own OpenApiAdapter:
[[see examples]](../../examples)
