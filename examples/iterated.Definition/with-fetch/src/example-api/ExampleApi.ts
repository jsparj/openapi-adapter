import { OpenApiAdapter } from '@openapi-adapter/fetch'
import { ExampleApiDefinition } from './ExampleApi.definition'


const settings = OpenApiAdapter.createDefaultSettings('http://localhost:3000')

class ExampleApi extends OpenApiAdapter<
  'ExampleApi',
  ExampleApiDefinition,
  typeof settings
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
      // If OpenApi specification uses non-standard parameter serialization, you should define your own serialization settings to match that.
      // In other cases the '__serialization__' field is required by type safety, this also triggers correct serialization method for parameters.
      // You should create your own 'default' serialization settings for most used serialization styles used by the api. 
      // WARNING: Remember to inject exact settings type to OpenApiAdapter, where all fields in the type are literals. Otherwise typesafety will be lost.
      resource:"<resource>",
      service_id: "<service_id>",
      unified_api:"<unified_api>",
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
