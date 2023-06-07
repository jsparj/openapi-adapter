import { FetchOpenApiAdapter } from '@openapi-adapter/fetch'
import {StripeApiDefinition} from './StripeApi.definition'


import {iterated} from '@openapi-adapter/iterated'
export class StripeApiMock extends FetchOpenApiAdapter<'stripe-api', iterated.path.Map<StripeApiDefinition>>
{
    constructor() {
        super('stripe-api', {host: 'http://localhost:3001'})
    }
}