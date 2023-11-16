import { OpenApiAdapter } from '@openapi-adapter/fetch'
import { ExampleApiDefinition } from './ExampleApi.definition'


const asd : ExampleApiDefinition['refs']['parameters/consumer_id'] = {
 serialization: {
  explode: true,
  style: "simple"
 },
 value: ""
}

const settings = OpenApiAdapter.createDefaultSettings('http://localhost:3000')

class ExampleApi extends OpenApiAdapter<
  'ExampleApi',
  ExampleApiDefinition,
  OpenApiAdapter.Settings
>
{
  constructor(){
    super('ExampleApi', settings)
  }
}

const exampleApi = new ExampleApi()

// initialize auth if required 
// (in this case request will throw error if 'apiKey' or 'applicationId' is not initialized before usage in request function.) 
exampleApi.initializeAuth({
 apiKey: {
  type: 'apiKey',
  payload: {
    in: 'header',
    name: "Authorization",
    apiKey: 'xxxx',
  }
 },
 applicationId: {
  type: 'apiKey',
  payload: {
    in: 'header',
    name: "x-apideck-app-id",
    apiKey: 'xxxx',
  }
 }
})

export default exampleApi

// Then do some requests: 
exampleApi.request(
  '/vault/connections/{unified_api}/{service_id}/{resource}/config',
  'patch',
  {
    security: ["apiKey"],
    path: {
      resource: "",
      service_id: "",
      unified_api: "",
    },
    header: {
      "x-apideck-app-id": "xxx",
      "x-apideck-consumer-id": "asd",
    },
    body: {
      mediaType: 'application/json',
      value: {
        authorize_url: "#", // string
        configurable_resources: ["resource"],  // string[]
        auth_type: "apiKey", // enum
        //... optional types
      }
    }
  }
)
