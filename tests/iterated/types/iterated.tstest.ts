import { CoreOpenApiAdapter } from "../../../packages/core/src/classes"
import { adapter, specification, utility, } from "../../../packages/core/types"
import { iterated } from "../../../packages/iterated/types/iterated"
import { TestApiDefinition } from '../../fetch/__mocks__/TestApi.definition'

type DEF = iterated.Definition<TestApiDefinition>

const params = {
    array: [32,null,null,'s'],
    null: null,
    object: {
        array: ['',2,null,true],
        number: 34,
        string: '234',
        integer: 34,
    },
    string: 'asd'
}

const contentObject = <const> {
    mediaType: 'application/json',
    content: {
        number: 1234,
        string: 'asd',
        null: null
    }
}

const mediaObject = <const>{
    'application/json': {
        mediaType: 'application/json',
    },
    'application/xml': {
        mediaType: 'application/xml',
    }
}

const pathItem = <const>{
    requestParams: {
        query: {
            enum: "_1_",
            number: 43
        },
        headers: {
            enum: "_1_",
            number: 43
        },
        pathParams: {
            enum: '_3_',
            number: 35456
        }
    }
}
const operation = <const>{
    requestParams: {
        security: ["someOAuth2", "basicHttp"] as ["someOAuth2", "basicHttp"],
        pathParams: params,
        headers: params,
        query: params,
        body: {
            mediaType: 'application/json',
            value: contentObject
        },
    },
    responseObject: {
        "200": {
            headers: {
                "content-type": 'application/json'
            },
            data: {
                mediaType: 'application/json',
                value: {
                    mediaType: 'application/json'
                }
            }
        },
        "401": {},
        "403": {},
        "404": {}
    }
}

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
        'path/tests/{.array*}/{.enum*}/{.null*}/{.number*}/{.object*}/{.string*}': {
            item: pathItem,
            operations: {
                delete: {
                    requestParams: {
                        security: ["someOAuth2", "basicHttp"] as ["someOAuth2", "basicHttp"],
                        pathParams: params,
                        headers: params,
                        query: params,
                        body: {
                            mediaType: 'application/json',
                            value: {
                                mediaType: 'application/json',
                                content: {
                                    number: 2342,
                                    string: 'sd'
                                }
                            }
                        },
                    },
                    responseObject: {
                        "200": {
                            headers: {
                                "content-type": 'application/json'
                            },
                            data: {
                                mediaType: 'application/json',
                                value: {
                                    mediaType: 'application/json'
                                }
                            }
                        },
                        "401": {},
                        "403": {},
                        "404": {}
                    }
                }
            }
        },
        "path/tests/{.array}/{.enum}/{.null}/{.number}/{.object}/{.string}": {
            item: pathItem,
            operations: { post: operation }
        },
        "path/tests/{;array*}/{;enum*}/{;null*}/{;number*}/{;object*}/{;string*}": {
            item: pathItem,
            operations: { head: operation}
        },
        "path/tests/{;array}/{;enum}/{;null}/{;number}/{;object}/{;string}":{
            item: pathItem,
            operations: { options: operation}
        },
        "path/tests/{array*}/{enum*}/{null*}/{number*}/{object*}/{string*}":{
            item: pathItem,
            operations: { put: operation}
        }, 
        "path/tests/{array}/{enum}/{null}/{number}/{object}/{string}": {
            item: pathItem,
            operations: { get: operation}
        },
    },
    refs: {
        "parameters/header_simple_array": [],
        "parameters/header_simple_enum": '_1_',
        "parameters/header_simple_explode_array": [],
        "parameters/header_simple_explode_enum": '_1_',
        "parameters/header_simple_explode_null": null,
        "parameters/header_simple_explode_number": 4,
        "parameters/header_simple_explode_object": {
            number: 23,
            string: '3'
        },
        "parameters/header_simple_explode_optional_array": [],
        "parameters/header_simple_explode_optional_null": null,
        "parameters/header_simple_explode_optional_number": 3,
        "parameters/header_simple_explode_optional_object": {
            number: 23,
            string: '3',
            integer: 234,
            null: null
        },
        "parameters/header_simple_explode_optional_string": '432',
        "parameters/header_simple_explode_string": '234',
        "parameters/header_simple_null": null,
        "parameters/header_simple_number": 234,
        "parameters/header_simple_object": {
            number: 34,
            string: '23v'
        },
        "parameters/header_simple_optional_array": [null, '32'],
        "parameters/header_simple_optional_enum": '_1_',
        "parameters/header_simple_optional_null": undefined,
        "parameters/header_simple_optional_number": undefined,
        "parameters/header_simple_optional_object": undefined,
        "parameters/header_simple_optional_string": 'asfds',
        "parameters/header_simple_string": '3rfv',
        "parameters/path_label_array": ['asd'],
        "parameters/path_label_enum": '_2_',
        "parameters/path_label_explode_array": [':asd', 3],
        "parameters/path_label_explode_enum": '_3_',
        "parameters/path_label_explode_null": null,
        "parameters/path_label_explode_number": 4,
        "parameters/path_label_explode_object": {
            number: 34,
            string: 'asdf',
        },
        "parameters/path_label_explode_string": 'asdgse',
        "parameters/path_label_null": null,
        "parameters/path_label_number": 683829,
        "parameters/path_label_object": {
            number: 2134,
            string: 'ä43d'
        },
        "parameters/path_label_string": 'sdgv34',
        "parameters/path_matrix_array": [],
        "parameters/path_matrix_enum": '_2_',
        "parameters/path_matrix_explode_array": [],
        "parameters/path_matrix_explode_enum": '_1_',
        "parameters/path_matrix_explode_null": null,
        "parameters/path_matrix_explode_number": 234,
        "parameters/path_matrix_explode_object": {
            number: 234324,
            string: '32',
            integer: 43,
            null: undefined
        },
        "parameters/header_simple_explode_optional_enum": '_2_',
        "parameters/path_matrix_explode_string": 'asd',
        "parameters/path_matrix_null": null,
        "parameters/path_matrix_number": 34,
        "parameters/path_matrix_object": {
            number: 34,
            string: 'äfp'
        },
        "parameters/path_matrix_string": 'dgs',
        "parameters/path_simple_array": [],
        "parameters/path_simple_enum": '_3_',
        "parameters/path_simple_explode_array": ['asd'],
        "parameters/path_simple_explode_enum": '_3_',
        "parameters/path_simple_explode_null": null,
        "parameters/path_simple_explode_number": 453,
        "parameters/path_simple_explode_object": {
            number: 43,
            string: 'ds'
        },
        "parameters/path_simple_explode_string": 'asdfbs',
        "parameters/path_simple_null": null,
        "parameters/path_simple_number": 3256,
        "parameters/path_simple_object": {
            number: 43573,
            string: '234g',
        },
        "parameters/path_simple_string": 'sadf',
        "parameters/query_form_array": ['dsb'],
        "parameters/query_deepObject_explode_object": {
            number: 346,
            string: 'sd'
        },
        "parameters/query_deepObject_explode_optional_object": {
            number: 3523,
            string: 'adsf',
            integer: -4829,
            null: null
        },
        "parameters/query_form_enum": '_3_',
        "parameters/query_form_explode_array": [],
        "parameters/query_form_explode_enum": '_3_',
        "parameters/query_form_explode_null": null,
        "parameters/query_form_explode_number": 345,
        "parameters/query_form_explode_object": {
            number: 4235,
            string: ''
        },
        "parameters/query_form_explode_optional_array": [],
        "parameters/query_form_explode_optional_enum": '_1_',
        "parameters/query_form_explode_optional_null": null,
        "parameters/query_form_explode_optional_number": 34362,
        "parameters/query_form_explode_optional_object": {
            number: -38,
            string: ''
        },
        "parameters/query_form_explode_optional_string": 'ags',
        "parameters/query_form_explode_string": 'adf',
        "parameters/query_form_null": null,
        "parameters/query_form_number": 68,
        "parameters/query_form_object": {
            number: 324,
            string: '!'
        },
        "parameters/query_form_optional_array": [],
        "parameters/query_form_optional_enum": '_2_',
        "parameters/query_form_optional_null": null,
        "parameters/query_form_optional_number": NaN,
        "parameters/query_form_optional_object": {
            number: NaN,
            string: '3458vh'
        },
        "parameters/query_form_optional_string": 'asfbvasdj',
        "parameters/query_form_string": 'adfb4 v',
        "parameters/query_pipeDelimited_array": [],
        "parameters/query_pipeDelimited_explode_array": [],
        "parameters/query_pipeDelimited_explode_optional_array": [],
        "parameters/query_pipeDelimited_optional_array": [],
        "parameters/query_spaceDelimited_array": [],
        "parameters/query_spaceDelimited_explode_array": [],
        "parameters/query_spaceDelimited_explode_optional_array": [],
        "parameters/query_spaceDelimited_optional_array": [],
        "requestBodies/Default": {
            mediaType: 'application/json',
            value: {
                mediaType: 'application/json',
                content: {
                    number: 34,
                    string: '43'
                }
            }
        },
        "responses/BodyAndHeadersObject": {
            headers: {
                "content-type": 'application/json'
            },
            data: {
                mediaType: 'application/json',
                value: {
                    mediaType: 'application/json'
                }
            }
        },
        "responses/Forbidden": {},
        "responses/NotFound": {},
        "responses/Unauthorized": {},
        "schemas/Boolean": true,
        "schemas/DeepObject": {
            array: [null, 327, null],
            record: {}
        },
        "schemas/Enum": '_2_',
        "schemas/Integer": 34,
        "schemas/MediaTypeObjectApplicationJson": {
            mediaType: 'application/json',
            content: {
                number: 343,
                string: '342'
            }
        },
        "schemas/MediaTypeObjectApplicationXml": {
            mediaType: 'application/xml',
            content: {
                number: 343,
                string: '342'
            }
        },
        "schemas/Null": null,
        "schemas/Number": 343,
        "schemas/Primitive": null,
        "schemas/PrimitiveArray": [],
        "schemas/PrimitiveObject": {
            number: 343,
            string: '342'
        },
        "schemas/PrimitiveRecord": {},
        "schemas/String": '¨234',
        "securitySchemes/basicHttp": {
            type: 'http',
            payload: {
                scheme: 'basic',
                token: ''
            }
        },
        "securitySchemes/bearerHttp": {
            type: 'http',
            payload: {
                scheme: 'bearer',
                token: ''
            }
        },
        "securitySchemes/globalApiKey": {
            type: 'apiKey',
            payload: {
                in: 'header',
                name: 'global-apikey',
                apiKey: ''
            }
        },
        "securitySchemes/someOAuth2": {
            type: 'oauth2',
            payload: {
                accessToken: ''
            }
        },
        "securitySchemes/someOpenIdConnect": {
            type: 'openIdConnect',
            payload: {
                
            }
        }
    }
}


class InterfaceTest<Settings extends adapter.Settings = {
    host: 'http://localhost:3000',
    response: {
        defaultDataMediaType: 'application/json'
    }
}>
    implements
    adapter.IAuthorization<DEF>,
    adapter.IFetch<'test-api', DEF, Settings>
{

    
    public request<
        PathId extends adapter.path.Id<DEF>,
        HttpMethod extends adapter.path.HttpMethod<DEF, PathId>,
        RequestParams extends adapter.request.Params<DEF, PathId, HttpMethod>,
        ResponseDeserialization extends adapter.response.Deserialization<DEF, PathId, HttpMethod>,
    >(
        pathId: PathId,
        method: HttpMethod,
        requestParams: RequestParams,
        responseParams?: ResponseDeserialization
    ): Promise<adapter.Responses<'test-api', DEF, PathId, HttpMethod, ResponseDeserialization, Settings['response']>> {
        throw new Error('not implemented')
    }


    initializeAuth(): void {
        throw new Error("Method not implemented.")
    }
    configureApiKey<AuthId extends never>(authId: AuthId): void {
        throw new Error("Method not implemented.")
    }
    configureOAuth2<SecuritySchemeId extends never>(securitySchemeId: SecuritySchemeId, accessToken: string): void {
        throw new Error("Method not implemented.")
    }
    configureOpenIdConnect<AuthId extends never>(authId: AuthId): void {
        throw new Error("Method not implemented.")
    }
    configureHttpAuthentication<AuthId extends never>(authId: AuthId): void {
        throw new Error("Method not implemented.")
    }
}

const api = new InterfaceTest()


api.request('path/tests/{.array}/{.enum}/{.null}/{.number}/{.object}/{.string}', 'post', {
    security: ['basicHttp', 'someOAuth2'],
    pathParams: {
        array: [],
        enum: '_2_',
        null: null,
        number: 3435,
        object: {
            number: 434,
            string: '234g'
        },
        string: '234f'
    },
    headers: {
        array: [],
        enum: '_2_',
        null: null,
        number: 3435,
        object: {
            number: 434,
            string: '234g'
        },
        string: '234f'
    },
    query: {
        array: [],
        enum: '_2_',
        null: null,
        number: 3435,
        object: {
            number: 434,
            string: '234g'
        },
        string: '234f'
    },
    body: {
        mediaType: 'application/json',
        value: {
            mediaType: 'application/json',
            content: {
                number: 34,
                string: '23'
            }
        }
    }
}, {
    data: 'application/json',
}).then(response => {
    switch (response.code) {
        case 'test-api/ok':
            const asss = response.headers
            return
        
        case 'test-api/not-found':
            const asd = response.headers
            return
    }
})