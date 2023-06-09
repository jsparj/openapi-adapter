import { adapter } from "@openapi-adapter/core/types"
import { iterated } from "@openapi-adapter/iterated/types/iterated"
import { TestApiDefinition } from '../../__mocks__/TestApi.definition'

type DEF = adapter.Definition<iterated.Definition<TestApiDefinition>>

const testDefinition: DEF = {
    auth: {
        global: ['globalApiKey'],
        schemes: {
            globalApiKey: {
                type: 'apiKey',
                payload: {
                    name: 'global-apikey',
                    in: 'header',
                    apiKey: '__global-apikey__'
                }
            },
            basicHttp: {
                type: 'http',
                payload: {
                    scheme: 'basic',
                    token: "<token>"
                }
            },
            bearerHttp: {
                type: 'http',
                payload: {
                    scheme: 'bearer',
                    token: "Bearer <token>"
                }
            },
            someOAuth2: {
                type: 'oauth2',
                payload: {
                    accessToken: '<accessToken>'
                }
            },
            someOpenIdConnect: {
                type: 'openIdConnect',
                payload: {
                    accessToken: '<accessToken>'
                }
            }
        }
    },
    path: {
        "path/tests/.array*/.enum*/.null*/.number*/.object*/.string*": {

            delete: {
                request: {
                    pathParams: {
                        array: [],
                        null: null,
                        object: {
                            number: 34,
                            string: '234',
                            integer: 34,
                        },
                        string: 'asd'
                    },
                    headers: {
                        array: [],
                        object: {
                            number: 34,
                            string: '234',
                        },
                        string: '',
                        null: null
                    },
                    query: {
                        array: [],
                        object: {
                            number: 34,
                            string: '234',
                        },
                        string: '',
                        null: null
                    },
                    body: {
                        "application/json": {
                            mediaType: 'application/json',
                            content: {
                                number: 1234,
                                string: 'asd',
                            }
                        },
                        "application/xml": {
                            mediaType: 'application/xml',
                            content: {
                                number: 1234,
                                string: 'asd',
                                null: null
                            }
                        }
                    },
                },
                security: ["someOAuth2", "basicHttp"],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                mediaType: 'application/json',
                                content: {
                                    number: 1234,
                                    string: 'asd',
                                }
                            },
                            "application/xml": {
                                mediaType: 'application/xml',
                                content: {
                                    number: 1234,
                                    string: 'asd',
                                    null: null
                                }
                            }
                        },
                    },
                    "401": {},
                    "403": {},
                    "404": {}
                }
            }
        }
    },
    refs: {
        "parameters/header_simple_explode_optional_number": 
    }
}
