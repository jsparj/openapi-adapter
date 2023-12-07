# Instructions

1. Install commandline tools: `npm -g @openapi-adapter/cli`
2. Install adapter dependencies locally to your node.js project: `npm -g @openapi-adapter/node-fetch`
3. Generate openapi adapter, folder in this directory was generated with:  
`openapi-adapter generate ./ExampleApi.json ExampleApi --service-name ExampleApi`
4. _[optional]_ If `mutualTLS` is needed on node.js side, use option: [`-service-type node-fetch`]. Default service type supports mutualTLS on browser environments.
5. Import your adapter from generated folder and install either `@openapi-adapter/fetch` or `@openapi-adapter/node-fetch`.