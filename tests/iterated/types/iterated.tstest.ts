import { adapter } from "../../../packages/core/types"
import { iterated } from "../../../packages/iterated/types/iterated"
import { TestApiSpecification } from '../../__mocks__/TestApi.specification'

type DEF = iterated.Definition<TestApiSpecification>

type DefaultSettings = adapter.settings.Default<
    string | undefined,
    string | undefined
>

class IteratedApi
    implements
    adapter.IAuthorization<DEF>,
    adapter.IFetch<'test-api', DEF, DefaultSettings>
{
    public request<
        PathId extends adapter.path.Id<DEF>,
        HttpMethod extends adapter.path.HttpMethod<DEF, PathId>,
        RequestParams extends adapter.request.ExtractParams<DEF, PathId, HttpMethod, DefaultSettings['serialization']>,
        ResponseOptions extends adapter.settings.ExtractResponseOptions<DEF, PathId, HttpMethod>,
    >(
        pathId: PathId,
        method: HttpMethod,
        requestParams: RequestParams,
        responseOptions?: ResponseOptions
    ): Promise<adapter.response.Object<'test-api', DEF, PathId, HttpMethod, ResponseOptions, DefaultSettings['deserialization']>> {
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

const api = new IteratedApi()


api.request('/path-params/s/matrix/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}','head', {
    security: ['basicHttp', 'someOAuth2'],
    path: {
        array: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: []
        },
        enum: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: '_2_'
        },
        null: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: null
        },
        number: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: 2434
        },
        object: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: {
                number: 434,
                string: '234g'
            },
        },
        string: {
            __serialization__: {
                style: 'matrix',
                explode: true
            },
            value: '234f'
        },
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

api.request('/path-params/s/matrix/e/no/{array}/{enum}/{null}/{number}/{object}/{string}', 'options', {
    security: ['basicHttp', 'someOAuth2'],
    path: {
        array: {
            __serialization__: {
                style: 'matrix'
            },
            value: []
        },
        enum: {
            __serialization__: {
                style: 'matrix'
            },
            value: '_2_'
        },
        null: {
            __serialization__: {
                style: 'matrix'
            },
            value: null
        },
        number: {
            __serialization__: {
                style: 'matrix'
            },
            value: 2434
        },
        object: {
            __serialization__: {
                style: 'matrix'
            },
            value: {
                number: 434,
                string: '234g'
            },
        },
        string: {
            __serialization__: {
                style: 'matrix'
            },
            value: '234f'
        },
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