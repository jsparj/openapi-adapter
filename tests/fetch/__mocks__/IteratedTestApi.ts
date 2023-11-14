import { OpenApiAdapter } from '@openapi-adapter/fetch';
import { IteratedTestApiDefinition } from "../../__mocks__/IteratedTestApi.definition";
import { adapter, specification } from '../../../packages/core/dist';

const DEF_PATHS : adapter.path.Id<IteratedTestApiDefinition> = '/path/s/label/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}'

const DEF: Partial<IteratedTestApiDefinition['path']> = {
    '/path/s/label/e/no/{array}/{enum}/{null}/{number}/{object}/{string}': {
        item: {
            requestParams: {
                path: {
                    enum: {
                        serialization: { style: "label", explode: false },
                        value: '_2_'
                    },
                    number: {
                        serialization: { style: "label", explode: false },
                        value: 343
                    },
                },
                header: {},
                cookie: {},
                query: {}
            }
        },
        operations: {
            post: {
                requestParams: {
                    security: ["bearerHttp", "someOAuth2"],
                    path: {
                        array: {
                            serialization: { style: "label", explode: false },
                            value: []
                        },
                        null: {
                            serialization: { style: "label", explode: false },
                            value: null
                        },
                        object: {
                            serialization: { style: "label", explode: false},
                            value: {
                                number: 23435,
                                string: '434fvsd'
                            }
                        },
                        string: {
                            serialization: { style: "label", explode: false},
                            value: '3432fasd'
                        },
                    },
                    cookie: {},
                    header: {},
                    query: {},
                    body: undefined
                },
                responseObject: {
                    "200": {},
                    "401": {},
                    "403": {},
                    "404": {}
                }
            }
       }
    }
}

const settings = OpenApiAdapter.createDefaultSettings(
    'http://localhost:3000',
)

export class IteratedTestApi extends OpenApiAdapter<'iterated-test-api', IteratedTestApiDefinition, typeof settings>
{
    constructor() {
        super('iterated-test-api', settings)
    }
}