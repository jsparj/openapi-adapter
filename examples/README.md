# Instructions:
To generate OpenApiAdapter for your specification you have following options to choose from based on your requirements: 

## Standard: `fetch`
Use this if: 
- Target project is ran on `browser` environment.
- Target project is ran on `node` environment and your specification does not define `mutualTLS` security scheme.

This adapter will use native fetch found in browser or node.js environment.

You will also need to install '@openapi-adapter/fetch' to your project.

## Serverside MutualTLS: `node-fetch`
Use this if: 
- Target project is ran on `node` environment and your specification defines `mutualTLS` security scheme.

This adapter will use `node-fetch` library for all requests.

You will also need to install `@openapi-adapter/node-fetch` to your project.

## Custom: `<your-adapter-import-path>`
Use this if: 
- You want to implement request handling by yourself. 

This will import `OpenApiAdapter` from path: `<your-adapter-import-path>`.