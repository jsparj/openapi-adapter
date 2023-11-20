import {OpenApiAdapter} from '@openapi-adapter/fetch'
import type {iterated} from '@openapi-adapter/core'
import type {ExampleApiSpecification} from './ExampleApi.specification'

const settings = OpenApiAdapter.createDefaultSettings(
  {
    //optional global headers: (will be replaced if the same header is defined in the request)
    "some-global-header": "this-will-be-injected-to-every-request"
  }, 
  {
    //optional RequestInit definitions:
  }
)

export namespace ExampleApi {
  export type Definition = iterated.Definition<ExampleApiSpecification>
  export type Settings = typeof settings 
}

export class ExampleApi extends OpenApiAdapter<
  'example-api',
  ExampleApi.Definition,
  ExampleApi.Settings
>
{
  constructor(host: string){
    super('example-api', host, settings)
  }
}
  
const exampleApi = new ExampleApi('http://localhost:3000')

// initialize auth if required 
// (in this case request will throw error if 'apiKey' or 'applicationId' is not initialized before usage in request function.) 
exampleApi.initializeAuth({
 apiKey: {
  type: 'apiKey',
  token: {
    in: 'header',
    name: "Authorization",
    value: 'xxxx',
  }
 },
 applicationId: {
  type: 'apiKey',
  token: {
    in: 'header',
    name: "x-apideck-app-id",
    value: 'xxxx',
  }
 }
})

export default exampleApi

exampleApi.request('/vault/connections/{unified_api}/{service_id}/import','post', {
  security: ['apiKey'],
  path: {
    service_id: 'xxx',
    unified_api: 'xxx'
  },
  header: {
    "x-apideck-app-id": 'xxx',
    "x-apideck-consumer-id": 'xxx'
  },
  body: {
    mediaType: 'application/json',
    value: {
      credentials: {
        refresh_token: 'xxx',
      },
      metadata: {},
      settings: {}
    }
  }
})
.then(
  // Handöe response: 
  response => { 
    switch(response.code){
      case 'example-api/ok': 
        //... do soemthing with HttpStatus.OK response
        response.headers // -->
        response.data // -->
        break;

      default:
        // handle other responses: 
        return Promise.reject(response.code)
    }
  }
)
