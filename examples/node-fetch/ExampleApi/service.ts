//[generated code]: DO NOT EDIT DIRECTLY
import {generated} from './definition'
import {OpenApiAdapter} from '@openapi-adapter/node-fetch'
export class ExampleApi extends OpenApiAdapter<`ExampleApi`,ExampleApi.Definition,ExampleApi.Settings>{
	constructor(host: string){
		super('ExampleApi', host, settings)
	}
}
export namespace ExampleApi {
	export type Definition = generated.Definition
	export type Settings = typeof settings
}
const settings = OpenApiAdapter.createDefaultSettings()
