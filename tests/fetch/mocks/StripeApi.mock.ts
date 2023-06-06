import { FetchOpenApiAdapter } from '@openapi-adapter/fetch'
import {StripeApiDefinition} from './StripeApi.definition'

export class StripeApiMock extends FetchOpenApiAdapter<'stripe-api', StripeApiDefinition>
{
    constructor() {
        super('stripe-api', {host: 'http://localhost:3001'})
    }
}