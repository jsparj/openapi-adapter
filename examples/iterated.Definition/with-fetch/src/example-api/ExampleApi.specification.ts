export interface ExampleApiSpecification
// Copy-Paste your OpenApi 3.x specification here: (this exampler uses: )
{
  "openapi": "3.0.3",
  "servers": [
    {
      "description": "Production server",
      "url": "https://unify.apideck.com"
    }
  ],
  "info": {
    "contact": {
      "email": "hello@apideck.com",
      "url": "https://developers.apideck.com"
    },
    "description": "Welcome to the Vault API 👋\n\nWhen you're looking to connect to an API, the first step is authentication.\n\nVault helps you handle OAuth flows, store API keys, and refresh access tokens from users (called consumers in Apideck).\n\n## Base URL\n\nThe base URL for all API requests is `https://unify.apideck.com`\n\n## Get Started\n\nTo use the Apideck APIs, you need to sign up for free at [https://app.apideck.com/signup](). Follow the steps below to get started.\n\n- [Create a free account.](https://app.apideck.com/signup)\n- Go to the [Dashboard](https://app.apideck.com/unify/unified-apis/dashboard).\n- Get your API key and the application ID.\n- Select and configure the integrations you want to make available to your users. Through the Unify dashboard, you can configure which connectors you want to support as integrations.\n- Retrieve the client_id and client_secret for the integration you want to activate (Only needed for OAuth integrations).\n- Soon, you can skip the previous step and use the Apideck sandbox credentials to get you started instead (upcoming)\n- Register the redirect URI for the example app (https://unify.apideck.com/vault/callback) in the list of redirect URIs under your app's settings\n- Use the [publishing guides](/app-listing-requirements) to get your integration listed across app marketplaces.\n\n### Hosted Vault\n\nHosted Vault (vault.apideck.com) is a no-code solution, so you don't need to build your own UI to handle the integration settings and authentication.\n\n![Hosted Vault - Integrations portal](https://github.com/apideck-samples/integration-settings/raw/master/public/img/vault.png)\n\nBehind the scenes, Hosted Vault implements the Vault API endpoints and handles the following features for your customers:\n\n- Add a connection\n- Handle the OAuth flow\n- Configure connection settings per integration\n- Manage connections\n- Discover and propose integration options\n- Search for integrations (upcoming)\n- Give integration suggestions based on provided metadata (email or website) when creating the session (upcoming)\n\nTo use Hosted Vault, you will need to first [**create a session**](https://developers.apideck.com/apis/vault/reference#operation/sessionsCreate). This can be achieved by making a POST request to the Vault API to create a valid session for a user, hereafter referred to as the consumer ID.\n\nExample using curl:\n\n```\ncurl -X POST https://unify.apideck.com/vault/sessions\n    -H \"Content-Type: application/json\"\n    -H \"Authorization: Bearer <your-api-key>\"\n    -H \"X-APIDECK-CONSUMER-ID: <consumer-id>\"\n    -H \"X-APIDECK-APP-ID: <application-id>\"\n    -d '{\"consumer_metadata\": { \"account_name\" : \"Sample\", \"user_name\": \"Sand Box\", \"email\": \"sand@box.com\", \"image\": \"https://unavatar.now.sh/jake\" }, \"theme\": { \"vault_name\": \"Intercom\", \"primary_color\": \"#286efa\", \"sidepanel_background_color\": \"#286efa\",\"sidepanel_text_color\": \"#FFFFFF\", \"favicon\": \"https://res.cloudinary.com/apideck/icons/intercom\" }}'\n```\n\n### Vault API\n\n_Beware, this is strategy takes more time to implement in comparison to Hosted Vault._\n\nIf you are building your integration settings UI manually, you can call the Vault API directly.\n\nThe Vault API is for those who want to completely white label the in-app integrations overview and authentication experience. All the available endpoints are listed below.\n\nThrough the API, your customers authenticate directly in your app, where Vault will still take care of redirecting to the auth provider and back to your app.\n\nIf you're already storing access tokens, we will help you migrate through our Vault Migration API (upcoming).\n\n## Domain model\n\nAt its core, a domain model creates a web of interconnected entities.\n\nOur domain model contains five main entity types: Consumer (user, account, team, machine), Application, Connector, Integration, and Connection.\n\n## Connection state\n\nThe connection state is computed based on the connection flow below.\n\n![](https://developers.apideck.com/api-references/vault/connection-flow.png)\n\n## Unify and Proxy integration\n\nThe only thing you need to use the Unify APIs and Proxy is the consumer id; thereafter, Vault will do the look-up in the background to handle the token injection before performing the API call(s).\n\n## Headers\n\nCustom headers that are expected as part of the request. Note that [RFC7230](https://tools.ietf.org/html/rfc7230) states header names are case insensitive.\n\n| Name                  | Type    | Required | Description |\n| --------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| x-apideck-app-id      | String  | Yes      | The id of your Unify application. Available at https://app.apideck.com/api-keys. |\n| x-apideck-consumer-id | String  | Yes      | The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app. |\n| x-apideck-raw         | Boolean | No       | Include raw response. Mostly used for debugging purposes. |\n\n## Sandbox (upcoming)\n\nThe sandbox is pre-loaded with data similar to a real-life integrations setup. You can use the preconfigured OAauth configured connectors for testing purposes and can skip this step by using the Apideck sandbox credentials to get you started.\n\n## Guides\n\n- [How to build an integrations UI with Vault](https://github.com/apideck-samples/integration-settings)\n- How to configure the OAuth credentials for integration providers (COMING SOON)\n\n## FAQ\n\n**What purpose does Vault serve? Can I just handle the authentication and access token myself?**\nYou can store everything yourself, but that defeats the purpose of using Apideck Unify. Handling tokens for multiple providers can quickly become very complex.\n\n### Is my data secure?\n\nVault employs data minimization, therefore only requesting the minimum amount of scopes needed to perform an API request.\n\n### How do I migrate existing data?\n\nUsing our migration API, you can migrate the access tokens and accounts to Apideck Vault. (COMING SOON)\n\n### Can I use Vault in combination with existing integrations?\n\nYes, you can. The flexibility of Unify allows you to quickly the use cases you need while keeping a gradual migration path based on your timeline and requirements.\n\n### How does Vault work for Apideck Ecosystem customers?\n\nOnce logged in, pick your ecosystem; on the left-hand side of the screen, you'll have the option to create an application underneath the Unify section.\n\n### How to integrate Apideck Vault\n\nThis section covers everything you need to know to authenticate your customers through Vault.\nVault provides **three auth strategies** to use API tokens from your customers:\n\n- Vault API\n- Hosted Vault\n- Apideck Ecosystem _(COMING SOON)_\n\nYou can also opt to bypass Vault and still take care of authentication flows yourself. Make sure to put the right safeguards in place to protect your customers' tokens and other sensitive data.\n\n### What auth types does Vault support?\n\nWhat auth strategies does Vault handle? We currently support three flows so your customers can activate an integration.\n\n#### API keys\n\nFor Services supporting the API key strategy, you can use Hosted Vault will need to provide an in-app form where users can configure their API keys provided by the integration service.\n\n#### OAuth 2.0\n\n##### Authorization Code Grant Type Flow\n\nVault handles the complete Authorization Code Grant Type Flow for you. This flow only supports browser-based (passive) authentication because most identity providers don't allow entering a username and password to be entered into applications that they don't own.\n\nCertain connectors require an OAuth redirect authentication flow, where the end-user is redirected to the provider's website or mobile app to authenticate.\n\nThis is being handled by the `/authorize` endpoint.\n\n#### Basic auth\n\nBasic authentication is a simple authentication scheme built into the HTTP protocol. The required fields to complete basic auth are handled by Hosted Vault or by updating the connection through the Vault API below.\n\n",
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "title": "Vault API",
    "version": "9.3.0",
    "x-apideck-api": "vault",
    "x-apideck-sdk-support": true,
    "x-apisguru-categories": [
      "developer_tools"
    ],
    "x-logo": {
      "url": "https://api.apis.guru/v2/cache/logo/https_developers.apideck.com_icon.png"
    },
    "x-origin": [
      {
        "format": "openapi",
        "url": "https://raw.githubusercontent.com/apideck-libraries/openapi-specs/master/vault.yml",
        "version": "3.0"
      }
    ],
    "x-providerName": "apideck.com",
    "x-serviceName": "vault",
    "x-tags": [
      "partner"
    ]
  },
  "externalDocs": {
    "description": "Apideck Developer Docs",
    "url": "https://developers.apideck.com"
  },
  "security": [
    {
      "apiKey": [],
      "applicationId": []
    }
  ],
  "tags": [
    {
      "description": "A session represents an authorized session for a consumer. A session is a JWT token that is valid for a short time (1h by default). Use this session token to open Hosted Vault or Vault JS for a consumer.",
      "name": "Sessions",
      "x-apideck-model": {
        "$ref": "#/components/schemas/Session"
      }
    },
    {
      "description": "A connection represents an account of a consumer for a connector. For example a consumer with ID \"test-consumer\" has a Salesforce connection for the CRM API. Connections securely save credentials and settings for a connector.",
      "name": "Connections",
      "x-apideck-model": {
        "$ref": "#/components/schemas/Connection"
      }
    },
    {
      "description": "A consumer represents an account or user in your system. All connections to connectors are scoped to a consumer.",
      "name": "Consumers",
      "x-apideck-model": {
        "$ref": "#/components/schemas/Consumer"
      }
    },
    {
      "description": "A log represents a request made for a given consumer. Logs include requests made to unified APIs, connectors and the Vault API.",
      "name": "Logs",
      "x-apideck-model": {
        "$ref": "#/components/schemas/Log"
      }
    }
  ],
  "paths": {
    "/vault/authorize/{service_id}/{application_id}": {
      "get": {
        "description": "__In most cases the authorize link is provided in the ``/connections`` endpoint. Normally you don't need to manually generate these links.__\n\nUse this endpoint to authenticate a user with a connector. It will return a 301 redirect to the downstream connector endpoints.\n\nAuth links will have a state parameter included to verify the validity of the request. This is the url your users will use to activate OAuth supported integration providers.\n\nVault handles the complete Authorization Code Grant Type Flow for you and will redirect you to the dynamic redirect uri you have appended to the url in case this is missing the default redirect uri you have configured for your Unify application.\n",
        "operationId": "connectionsAuthorize",
        "parameters": [
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/application_id"
          },
          {
            "$ref": "#/components/parameters/state"
          },
          {
            "$ref": "#/components/parameters/redirect_uri"
          },
          {
            "$ref": "#/components/parameters/scope"
          }
        ],
        "responses": {
          "301": {
            "description": "redirect"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [],
        "summary": "Authorize",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  applicationId: 'dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX',\n  state:\n    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsInVuaWZpZWRfYXBpIjoiZGVmYXVsdCIsInNlcnZpY2VfaWQiOiJ0ZWFtbGVhZGVyIiwiYXBwbGljYXRpb25faWQiOiIxMTExIiwiaWF0IjoxNjIyMTI2Nzg3fQ.97_pn1UAXc7mctXBdr15czUNO1jjdQ9sJUOIE_Myzbk',\n  redirectUri: 'http://example.com/integrations'\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsAuthorize(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true,
        "x-sdk-exclude": true
      }
    },
    "/vault/callback": {
      "get": {
        "description": "This endpoint gets called after the triggering the authorize flow.\n\nCallback links need a state and code parameter to verify the validity of the request.\n",
        "operationId": "connectionsCallback",
        "parameters": [
          {
            "$ref": "#/components/parameters/state"
          },
          {
            "$ref": "#/components/parameters/code"
          }
        ],
        "responses": {
          "301": {
            "description": "callback"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [],
        "summary": "Callback",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY'\n})\n\nconst params = {\n  state:\n    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsInVuaWZpZWRfYXBpIjoiZGVmYXVsdCIsInNlcnZpY2VfaWQiOiJ0ZWFtbGVhZGVyIiwiYXBwbGljYXRpb25faWQiOiIxMTExIiwiaWF0IjoxNjIyMTI2Nzg3fQ.97_pn1UAXc7mctXBdr15czUNO1jjdQ9sJUOIE_Myzbk',\n  code: 'g0ZGZmNjVmOWI'\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsCallback(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true,
        "x-sdk-exclude": true
      }
    },
    "/vault/connections": {
      "get": {
        "description": "This endpoint includes all the configured integrations and contains the required assets\nto build an integrations page where your users can install integrations.\nOAuth2 supported integrations will contain authorize and revoke links to handle the authentication flows.\n",
        "operationId": "connectionsAll",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/api"
          },
          {
            "$ref": "#/components/parameters/configured"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConnectionsResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get all connections",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.connectionsAll({})\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "connections"
      }
    },
    "/vault/connections/{unified_api}/{service_id}": {
      "delete": {
        "description": "Deletes a connection",
        "operationId": "connectionsDelete",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "responses": {
          "204": {
            "description": "Resource deleted"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Deletes a connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.connectionsDelete({\n    serviceId: 'pipedrive',\n    unifiedApi: 'crm'\n  })\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "connectionsDelete"
      },
      "get": {
        "description": "Get a connection",
        "operationId": "connectionsOne",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.connectionsOne({\n    serviceId: 'pipedrive',\n    unifiedApi: 'crm'\n  })\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      },
      "patch": {
        "description": "Update a connection",
        "operationId": "connectionsUpdate",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Connection"
              }
            }
          },
          "description": "Fields that need to be updated on the resource",
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/UpdateConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Update connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  unifiedApi: 'crm',\n  connection: {\n    enabled: true,\n    settings: {\n      instance_url: 'https://eu28.salesforce.com',\n      api_key: '12345xxxxxx'\n    },\n    metadata: {\n      account: {\n        name: 'My Company',\n        id: 'c01458a5-7276-41ce-bc19-639906b0450a'\n      },\n      plan: 'enterprise'\n    },\n    configuration: [\n      {\n        resource: 'leads',\n        defaults: [\n          {\n            id: 'ProductInterest',\n            options: [Array],\n            value: 'GC5000 series'\n          }\n        ]\n      }\n    ]\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsUpdate(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      },
      "post": {
        "description": "Create an authorized connection\n",
        "operationId": "connectionsAdd",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Connection"
              }
            }
          },
          "description": "Fields that need to be persisted on the resource",
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/CreateConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Create connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  unifiedApi: 'crm',\n  connection: {\n    enabled: true,\n    settings: {\n      instance_url: 'https://eu28.salesforce.com',\n      api_key: '12345xxxxxx'\n    },\n    metadata: {\n      account: {\n        name: 'My Company',\n        id: 'c01458a5-7276-41ce-bc19-639906b0450a'\n      },\n      plan: 'enterprise'\n    },\n    configuration: [\n      {\n        resource: 'leads',\n        defaults: [\n          {\n            id: 'ProductInterest',\n            options: [Array],\n            value: 'GC5000 series'\n          }\n        ]\n      }\n    ]\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsAdd(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true,
        "x-sdk-exclude": true
      }
    },
    "/vault/connections/{unified_api}/{service_id}/import": {
      "post": {
        "description": "Import an authorized connection.\n",
        "operationId": "connectionsImport",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ConnectionImportData"
              }
            }
          },
          "description": "Fields that need to be persisted on the resource",
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/CreateConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Import connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  unifiedApi: 'crm',\n  connection: {\n    credentials: {\n      access_token:\n        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',\n      refresh_token:\n        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ'\n    },\n    settings: {\n      instance_url: 'https://eu28.salesforce.com'\n    },\n    metadata: {\n      account: {\n        name: 'My Company',\n        id: 'c01458a5-7276-41ce-bc19-639906b0450a'\n      },\n      plan: 'enterprise'\n    }\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsImport(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true
      }
    },
    "/vault/connections/{unified_api}/{service_id}/token": {
      "post": {
        "description": "Get an access token for a connection and store it in Vault. Currently only supported for connections with the client_credentials OAuth grant type.\n\nNote that the access token will not be returned in the response. A 200 response code indicates a valid access token was stored on the connection.\n",
        "operationId": "connectionsToken",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "properties": {},
                "type": "object"
              }
            }
          }
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get Access Token",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  unifiedApi: 'crm',\n  connectionsToken: {}\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsToken(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true,
        "x-sdk-exclude": true
      }
    },
    "/vault/connections/{unified_api}/{service_id}/{resource}/config": {
      "get": {
        "description": "This endpoint returns custom settings and their defaults required by connection for a given resource.\n",
        "operationId": "connectionSettingsAll",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/resource"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get resource settings",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  unifiedApi: 'crm',\n  serviceId: 'pipedrive',\n  resource: 'leads'\n}\n\ntry {\n  const { data } = await apideck.vault.connectionSettingsAll(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "connectionSettings"
      },
      "patch": {
        "description": "Update default values for a connection's resource settings",
        "operationId": "connectionSettingsUpdate",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/unified_api"
          },
          {
            "$ref": "#/components/parameters/resource"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Connection"
              }
            }
          },
          "description": "Fields that need to be updated on the resource",
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/UpdateConnectionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Update settings",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  unifiedApi: 'crm',\n  resource: 'leads',\n  connection: {\n    enabled: true,\n    settings: {\n      instance_url: 'https://eu28.salesforce.com',\n      api_key: '12345xxxxxx'\n    },\n    metadata: {\n      account: {\n        name: 'My Company',\n        id: 'c01458a5-7276-41ce-bc19-639906b0450a'\n      },\n      plan: 'enterprise'\n    },\n    configuration: [\n      {\n        resource: 'leads',\n        defaults: [\n          {\n            id: 'ProductInterest',\n            options: [Array],\n            value: 'GC5000 series'\n          }\n        ]\n      }\n    ]\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.connectionSettingsUpdate(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "connectionSettingsUpdate"
      }
    },
    "/vault/consumers": {
      "get": {
        "description": "This endpoint includes all application consumers, along with an aggregated count of requests made.\n",
        "operationId": "consumersAll",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/cursor"
          },
          {
            "$ref": "#/components/parameters/limit"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConsumersResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get all consumers",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.consumersAll({})\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "consumers"
      },
      "post": {
        "description": "Create a consumer",
        "operationId": "consumersAdd",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Consumer"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/CreateConsumerResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Create consumer",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\nconst params = {\n  consumer: {\n    consumer_id: 'test_consumer_id',\n    metadata: {\n      account_name: 'SpaceX',\n      user_name: 'Elon Musk',\n      email: 'elon@musk.com',\n      image: 'https://www.spacex.com/static/images/share.jpg'\n    }\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.consumersAdd(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      }
    },
    "/vault/consumers/{consumer_id}": {
      "delete": {
        "description": "Delete consumer and all their connections, including credentials.",
        "operationId": "consumersDelete",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/consumer_id"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/DeleteConsumerResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Delete consumer",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.consumersDelete({\n    consumerId: 'test_user_id'\n  })\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      },
      "get": {
        "description": "Consumer detail including their aggregated counts with the connections they have authorized.\n",
        "operationId": "consumersOne",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/consumer_id"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetConsumerResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get consumer",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.consumersOne({\n    consumerId: 'test_user_id'\n  })\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "consumer"
      },
      "patch": {
        "description": "Update consumer metadata such as name and email.",
        "operationId": "consumersUpdate",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/consumer_id"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateConsumerRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/UpdateConsumerResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Update consumer",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\nconst params = {\n  consumerId: 'test_user_id',\n  consumer: {\n    metadata: {\n      account_name: 'SpaceX',\n      user_name: 'Elon Musk',\n      email: 'elon@musk.com',\n      image: 'https://www.spacex.com/static/images/share.jpg'\n    }\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.consumersUpdate(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      }
    },
    "/vault/consumers/{consumer_id}/stats": {
      "get": {
        "description": "Get consumer request counts within a given datetime range.\n",
        "operationId": "consumerRequestCountsAll",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/consumer_id"
          },
          {
            "$ref": "#/components/parameters/start_datetime"
          },
          {
            "$ref": "#/components/parameters/end_datetime"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/ConsumerRequestCountsInDateRangeResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Consumer request counts",
        "tags": [
          "Consumers"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID'\n})\n\nconst params = {\n  consumerId: 'test_user_id',\n  startDatetime: '2021-05-01T12:00:00.000Z',\n  endDatetime: '2021-05-30T12:00:00.000Z'\n}\n\ntry {\n  const { data } = await apideck.vault.consumerRequestCountsAll(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "consumerRequestCounts"
      }
    },
    "/vault/logs": {
      "get": {
        "description": "This endpoint includes all consumer request logs.\n",
        "operationId": "logsAll",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/filter"
          },
          {
            "$ref": "#/components/parameters/cursor"
          },
          {
            "$ref": "#/components/parameters/limit"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/GetLogsResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Get all consumer request logs",
        "tags": [
          "Logs"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\ntry {\n  const { data } = await apideck.vault.logsAll({})\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-field-name": "logs"
      }
    },
    "/vault/revoke/{service_id}/{application_id}": {
      "get": {
        "description": "__In most cases the authorize link is provided in the ``/connections`` endpoint. Normally you don't need to manually generate these links.__\n\nUse this endpoint to revoke an existing OAuth connector.\n\nAuth links will have a state parameter included to verify the validity of the request. This is the url your users will use to activate OAuth supported integration providers.\n\nVault handles the complete revoke flow for you and will redirect you to the dynamic redirect uri you have appended to the url in case this is missing the default redirect uri you have configured for your Unify application.\n",
        "operationId": "connectionsRevoke",
        "parameters": [
          {
            "$ref": "#/components/parameters/service_id"
          },
          {
            "$ref": "#/components/parameters/application_id"
          },
          {
            "$ref": "#/components/parameters/state"
          },
          {
            "$ref": "#/components/parameters/redirect_uri"
          }
        ],
        "responses": {
          "301": {
            "description": "redirect"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [],
        "summary": "Revoke connection",
        "tags": [
          "Connections"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY'\n})\n\nconst params = {\n  serviceId: 'pipedrive',\n  applicationId: 'dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX',\n  state:\n    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsInVuaWZpZWRfYXBpIjoiZGVmYXVsdCIsInNlcnZpY2VfaWQiOiJ0ZWFtbGVhZGVyIiwiYXBwbGljYXRpb25faWQiOiIxMTExIiwiaWF0IjoxNjIyMTI2Nzg3fQ.97_pn1UAXc7mctXBdr15czUNO1jjdQ9sJUOIE_Myzbk',\n  redirectUri: 'http://example.com/integrations'\n}\n\ntry {\n  const { data } = await apideck.vault.connectionsRevoke(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ],
        "x-graphql-exclude": true,
        "x-sdk-exclude": true
      }
    },
    "/vault/sessions": {
      "post": {
        "description": "Making a POST request to this endpoint will initiate a Hosted Vault session. Redirect the consumer to the returned\nURL to allow temporary access to manage their integrations and settings.\n\nNote: This is a short lived token that will expire after 1 hour (TTL: 3600).\n",
        "operationId": "sessionsCreate",
        "parameters": [
          {
            "$ref": "#/components/parameters/x-apideck-consumer-id"
          },
          {
            "$ref": "#/components/parameters/x-apideck-app-id"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Session"
              }
            }
          },
          "description": "Additional redirect uri and/or consumer metadata",
          "required": false
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/CreateSessionResponse"
          },
          "400": {
            "$ref": "#/components/responses/BadRequestResponse"
          },
          "401": {
            "$ref": "#/components/responses/UnauthorizedResponse"
          },
          "402": {
            "$ref": "#/components/responses/PaymentRequiredResponse"
          },
          "404": {
            "$ref": "#/components/responses/NotFoundResponse"
          },
          "422": {
            "$ref": "#/components/responses/UnprocessableResponse"
          },
          "default": {
            "$ref": "#/components/responses/UnexpectedErrorResponse"
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ],
        "summary": "Create Session",
        "tags": [
          "Sessions"
        ],
        "x-apideck-api": "vault",
        "x-codeSamples": [
          {
            "label": "Node",
            "lang": "TypeScript",
            "source": "import { Apideck } from '@apideck/node'\n\nconst apideck = new Apideck({\n  apiKey: 'REPLACE_WITH_API_KEY',\n  appId: 'REPLACE_WITH_APP_ID',\n  consumerId: 'REPLACE_WITH_CONSUMER_ID'\n})\n\nconst params = {\n  session: {\n    consumer_metadata: {\n      account_name: 'SpaceX',\n      user_name: 'Elon Musk',\n      email: 'elon@musk.com',\n      image: 'https://www.spacex.com/static/images/share.jpg'\n    },\n    redirect_uri: 'https://mysaas.com/dashboard',\n    settings: {\n      unified_apis: ['crm'],\n      hide_resource_settings: false,\n      sandbox_mode: false,\n      isolation_mode: false,\n      session_length: '30m',\n      show_logs: true,\n      show_suggestions: false,\n      show_sidebar: true,\n      auto_redirect: false,\n      hide_guides: false,\n      allow_actions: ['delete']\n    },\n    theme: {\n      favicon: 'https://res.cloudinary.com/apideck/icons/intercom',\n      logo: 'https://res.cloudinary.com/apideck/icons/intercom',\n      primary_color: '#286efa',\n      sidepanel_background_color: '#286efa',\n      sidepanel_text_color: '#FFFFFF',\n      vault_name: 'Intercom',\n      privacy_url: 'https://compliance.apideck.com/privacy-policy',\n      terms_url: 'https://www.termsfeed.com/terms-conditions/957c85c1b089ae9e3219c83eff65377e'\n    },\n    custom_consumer_settings: {\n      feature_flag_1: true,\n      tax_rates: [\n        {\n          id: '6',\n          label: '6%'\n        },\n        {\n          id: '21',\n          label: '21%'\n        }\n      ]\n    }\n  }\n}\n\ntry {\n  const { data } = await apideck.vault.sessionsCreate(params)\n  console.log('API called successfully', data)\n} catch (error) {\n  console.error(error)\n}\n"
          }
        ]
      }
    }
  },
  "components": {
    "parameters": {
      "api": {
        "description": "Scope results to Unified API",
        "example": "crm",
        "in": "query",
        "name": "api",
        "schema": {
          "type": "string"
        }
      },
      "application_id": {
        "description": "Application ID of the resource to return",
        "example": "dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX",
        "in": "path",
        "name": "application_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "code": {
        "description": "An authorization code from the connector which Apideck Vault will later exchange for an access token.",
        "example": "g0ZGZmNjVmOWI",
        "in": "query",
        "name": "code",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "configured": {
        "description": "Scopes results to connections that have been configured or not",
        "example": true,
        "in": "query",
        "name": "configured",
        "schema": {
          "type": "boolean"
        }
      },
      "consumer_id": {
        "description": "ID of the consumer to return",
        "example": "test_user_id",
        "in": "path",
        "name": "consumer_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "cursor": {
        "description": "Cursor to start from. You can find cursors for next/previous pages in the meta.cursors property of the response.",
        "in": "query",
        "name": "cursor",
        "schema": {
          "nullable": true,
          "type": "string"
        }
      },
      "end_datetime": {
        "description": "Scopes results to requests that happened before datetime",
        "example": "2021-05-30T12:00:00.000Z",
        "in": "query",
        "name": "end_datetime",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "filter": {
        "description": "Filter results",
        "explode": true,
        "in": "query",
        "name": "filter",
        "schema": {
          "$ref": "#/components/schemas/LogsFilter"
        },
        "style": "deepObject"
      },
      "id": {
        "description": "ID of the record you are acting upon.",
        "in": "path",
        "name": "id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "limit": {
        "description": "Number of results to return. Minimum 1, Maximum 200, Default 20",
        "in": "query",
        "name": "limit",
        "schema": {
          "default": 20,
          "maximum": 200,
          "minimum": 1,
          "type": "integer"
        }
      },
      "raw": {
        "description": "Include raw response. Mostly used for debugging purposes",
        "in": "query",
        "name": "raw",
        "schema": {
          "default": false,
          "type": "boolean"
        }
      },
      "redirect_uri": {
        "description": "URL to redirect back to after authorization. When left empty the default configured redirect uri will be used.",
        "example": "http://example.com/integrations",
        "in": "query",
        "name": "redirect_uri",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "resource": {
        "description": "Resource Name",
        "example": "leads",
        "in": "path",
        "name": "resource",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "scope": {
        "description": "One or more OAuth scopes to request from the connector. OAuth scopes control the set of resources and operations that are allowed after authorization. Refer to the connector's documentation for the available scopes.",
        "example": [
          "openid",
          "leads:write",
          "profile:read"
        ],
        "explode": false,
        "in": "query",
        "name": "scope",
        "schema": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "style": "spaceDelimited"
      },
      "service_id": {
        "description": "Service ID of the resource to return",
        "example": "pipedrive",
        "in": "path",
        "name": "service_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "start_datetime": {
        "description": "Scopes results to requests that happened after datetime",
        "example": "2021-05-01T12:00:00.000Z",
        "in": "query",
        "name": "start_datetime",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "state": {
        "description": "An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks.",
        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsInVuaWZpZWRfYXBpIjoiZGVmYXVsdCIsInNlcnZpY2VfaWQiOiJ0ZWFtbGVhZGVyIiwiYXBwbGljYXRpb25faWQiOiIxMTExIiwiaWF0IjoxNjIyMTI2Nzg3fQ.97_pn1UAXc7mctXBdr15czUNO1jjdQ9sJUOIE_Myzbk",
        "in": "query",
        "name": "state",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "unified_api": {
        "description": "Unified API",
        "example": "crm",
        "in": "path",
        "name": "unified_api",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-app-id": {
        "description": "The ID of your Unify application",
        "example": "dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX",
        "in": "header",
        "name": "x-apideck-app-id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-consumer-id": {
        "description": "ID of the consumer which you want to get or push data from",
        "in": "header",
        "name": "x-apideck-consumer-id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-downstream-authorization": {
        "description": "Downstream authorization header. This will skip the Vault token injection.",
        "example": "Bearer XXXXXXXXXXXXXXXXX",
        "in": "header",
        "name": "x-apideck-downstream-authorization",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-downstream-method": {
        "description": "Downstream method. If not provided the upstream method will be inherited,",
        "example": "POST",
        "in": "header",
        "name": "x-apideck-downstream-method",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-downstream-url": {
        "description": "Downstream URL",
        "example": "https://api.twilio.com",
        "in": "header",
        "name": "x-apideck-downstream-url",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "x-apideck-service-id": {
        "description": "Provide the service id you want to call (e.g., pipedrive). Only needed when a consumer has activated multiple integrations for a Unified API.",
        "in": "header",
        "name": "x-apideck-service-id",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    },
    "responses": {
      "BadRequestResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BadRequestResponse"
            }
          }
        },
        "description": "Bad Request"
      },
      "ConsumerRequestCountsInDateRangeResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ConsumerRequestCountsInDateRangeResponse"
            }
          }
        },
        "description": "Consumers Request Counts within Date Range"
      },
      "CreateConnectionResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateConnectionResponse"
            }
          }
        },
        "description": "Connection created"
      },
      "CreateConsumerResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateConsumerResponse"
            }
          }
        },
        "description": "Consumer created"
      },
      "CreateSessionResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateSessionResponse"
            }
          }
        },
        "description": "Session created"
      },
      "Created": {
        "content": {
          "application/json": {
            "example": {},
            "schema": {}
          }
        },
        "description": "Resource created"
      },
      "DeleteConsumerResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/DeleteConsumerResponse"
            }
          }
        },
        "description": "Consumer deleted"
      },
      "Deleted": {
        "content": {
          "application/json": {
            "example": {},
            "schema": {}
          }
        },
        "description": "Resource successfully deleted"
      },
      "GetConnectionResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GetConnectionResponse"
            }
          }
        },
        "description": "Connection"
      },
      "GetConnectionsResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GetConnectionsResponse"
            }
          }
        },
        "description": "Connections"
      },
      "GetConsumerResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GetConsumerResponse"
            }
          }
        },
        "description": "Consumer"
      },
      "GetConsumersResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GetConsumersResponse"
            }
          }
        },
        "description": "Consumers"
      },
      "GetLogsResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GetLogsResponse"
            }
          }
        },
        "description": "Logs"
      },
      "NoContent": {
        "content": {
          "application/json": {
            "example": {},
            "schema": {}
          }
        },
        "description": "No content"
      },
      "NotFoundResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/NotFoundResponse"
            }
          }
        },
        "description": "The specified resource was not found"
      },
      "NotImplementedResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/NotImplementedResponse"
            }
          }
        },
        "description": "Not Implemented"
      },
      "Ok": {
        "content": {
          "application/json": {
            "example": {},
            "schema": {}
          }
        },
        "description": "Ok"
      },
      "PaymentRequiredResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/PaymentRequiredResponse"
            }
          }
        },
        "description": "Payment Required"
      },
      "ProxyError": {
        "content": {
          "application/json": {
            "schema": {}
          }
        },
        "description": "Proxy error",
        "headers": {
          "x-apideck-downstream-error": {
            "schema": {
              "description": "Indicates if the error returned in the body is from the downstream",
              "type": "boolean"
            }
          }
        }
      },
      "UnauthorizedResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UnauthorizedResponse"
            }
          }
        },
        "description": "Unauthorized"
      },
      "UnexpectedErrorResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UnexpectedErrorResponse"
            }
          }
        },
        "description": "Unexpected error"
      },
      "UnprocessableResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UnprocessableResponse"
            }
          }
        },
        "description": "Unprocessable"
      },
      "UpdateConnectionResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateConnectionResponse"
            }
          }
        },
        "description": "Connection updated"
      },
      "UpdateConsumerResponse": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateConsumerResponse"
            }
          }
        },
        "description": "Consumer updated"
      },
      "Updated": {
        "content": {
          "application/json": {
            "example": {},
            "schema": {}
          }
        },
        "description": "Resource updated"
      }
    },
    "schemas": {
      "ApplicationId": {
        "description": "ID of your Apideck Application",
        "example": "dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX",
        "type": "string"
      },
      "AuthType": {
        "description": "Type of authorization used by the connector",
        "enum": [
          "oauth2",
          "apiKey",
          "basic",
          "custom",
          "none"
        ],
        "example": "oauth2",
        "readOnly": true,
        "type": "string",
        "x-apideck-enum-id": "auth_types"
      },
      "BadRequestResponse": {
        "properties": {
          "detail": {
            "anyOf": [
              {
                "example": "Missing property foobar",
                "type": "string"
              },
              {
                "example": {
                  "missing": [
                    {
                      "foobar": "required"
                    }
                  ]
                },
                "type": "object"
              }
            ],
            "description": "Contains parameter or domain specific information related to the error and why it occurred."
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Bad Request",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Invalid Params",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#requestvalidationerror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 400,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "RequestValidationError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "BadRequest"
      },
      "Connection": {
        "properties": {
          "auth_type": {
            "$ref": "#/components/schemas/AuthType"
          },
          "authorize_url": {
            "description": "The OAuth redirect URI. Redirect your users to this URI to let them authorize your app in the connector's UI. Before you can use this URI, you must add `redirect_uri` as a query parameter. Your users will be redirected to this `redirect_uri` after they granted access to your app in the connector's UI.",
            "example": "https://unify.apideck.com/vault/authorize/salesforce/<application-id>?state=<state>",
            "nullable": true,
            "readOnly": true,
            "type": "string"
          },
          "configurable_resources": {
            "example": [
              "opportunities",
              "companies",
              "contacts",
              "leads"
            ],
            "items": {
              "type": "string"
            },
            "readOnly": true,
            "type": "array"
          },
          "configuration": {
            "items": {
              "properties": {
                "defaults": {
                  "items": {
                    "properties": {
                      "id": {
                        "example": "ProductInterest",
                        "type": "string"
                      },
                      "options": {
                        "items": {
                          "$ref": "#/components/schemas/FormFieldOption"
                        },
                        "type": "array"
                      },
                      "target": {
                        "enum": [
                          "custom_fields",
                          "resource"
                        ],
                        "example": "custom_fields",
                        "readOnly": true,
                        "type": "string",
                        "x-apideck-enum-id": "connections.configuration.defaults.target"
                      },
                      "value": {
                        "anyOf": [
                          {
                            "example": "GC5000 series",
                            "type": "string"
                          },
                          {
                            "example": 10,
                            "type": "integer"
                          },
                          {
                            "example": 10.5,
                            "type": "number"
                          },
                          {
                            "example": true,
                            "type": "boolean"
                          },
                          {
                            "items": {
                              "anyOf": [
                                {
                                  "example": "GC6000 series",
                                  "type": "string"
                                },
                                {
                                  "example": 10,
                                  "type": "integer"
                                },
                                {
                                  "example": 10.5,
                                  "type": "number"
                                }
                              ]
                            },
                            "type": "array"
                          }
                        ]
                      }
                    },
                    "type": "object"
                  },
                  "type": "array"
                },
                "resource": {
                  "example": "leads",
                  "type": "string"
                }
              },
              "type": "object"
            },
            "type": "array"
          },
          "created_at": {
            "example": 1615563533390,
            "readOnly": true,
            "type": "number"
          },
          "enabled": {
            "description": "Whether the connection is enabled or not. You can enable or disable a connection using the Update Connection API.",
            "example": true,
            "type": "boolean"
          },
          "form_fields": {
            "description": "The settings that are wanted to create a connection.",
            "example": [
              {
                "custom_field": false,
                "disabled": false,
                "id": "instance_url",
                "label": "Instance url",
                "mask": false,
                "placeholder": "",
                "required": true,
                "sensitive": false,
                "type": "text",
                "value": "https://eu28.salesforce.com"
              },
              {
                "custom_field": false,
                "disabled": false,
                "id": "api_key",
                "label": "API Key",
                "mask": false,
                "placeholder": "",
                "required": true,
                "sensitive": true,
                "type": "text",
                "value": "123455677"
              }
            ],
            "items": {
              "$ref": "#/components/schemas/FormField"
            },
            "readOnly": true,
            "type": "array"
          },
          "has_guide": {
            "description": "Whether the connector has a guide available in the developer docs or not (https://docs.apideck.com/connectors/{service_id}/docs/consumer+connection).",
            "example": true,
            "readOnly": true,
            "type": "boolean"
          },
          "icon": {
            "description": "A visual icon of the connection, that will be shown in the Vault",
            "example": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
            "readOnly": true,
            "type": "string"
          },
          "id": {
            "description": "The unique identifier of the connection.",
            "example": "crm+salesforce",
            "readOnly": true,
            "type": "string"
          },
          "integration_state": {
            "$ref": "#/components/schemas/IntegrationState"
          },
          "logo": {
            "description": "The logo of the connection, that will be shown in the Vault",
            "example": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
            "readOnly": true,
            "type": "string"
          },
          "metadata": {
            "additionalProperties": true,
            "description": "Attach your own consumer specific metadata",
            "example": {
              "account": {
                "id": "c01458a5-7276-41ce-bc19-639906b0450a",
                "name": "My Company"
              },
              "plan": "enterprise"
            },
            "nullable": true,
            "properties": {},
            "type": "object"
          },
          "name": {
            "description": "The name of the connection",
            "example": "Salesforce",
            "readOnly": true,
            "type": "string"
          },
          "oauth_grant_type": {
            "$ref": "#/components/schemas/OAuthGrantType"
          },
          "resource_schema_support": {
            "example": [
              "leads"
            ],
            "items": {
              "type": "string"
            },
            "readOnly": true,
            "type": "array"
          },
          "resource_settings_support": {
            "example": [
              "leads"
            ],
            "items": {
              "type": "string"
            },
            "readOnly": true,
            "type": "array"
          },
          "revoke_url": {
            "description": "The OAuth revoke URI. Redirect your users to this URI to revoke this connection. Before you can use this URI, you must add `redirect_uri` as a query parameter. Your users will be redirected to this `redirect_uri` after they granted access to your app in the connector's UI.",
            "example": "https://unify.apideck.com/vault/revoke/salesforce/<application-id>?state=<state>",
            "nullable": true,
            "readOnly": true,
            "type": "string"
          },
          "service_id": {
            "description": "The ID of the service this connection belongs to.",
            "example": "salesforce",
            "readOnly": true,
            "type": "string"
          },
          "settings": {
            "additionalProperties": true,
            "description": "Connection settings. Values will persist to `form_fields` with corresponding id",
            "example": {
              "api_key": "12345xxxxxx",
              "instance_url": "https://eu28.salesforce.com"
            },
            "nullable": true,
            "properties": {},
            "type": "object"
          },
          "settings_required_for_authorization": {
            "description": "List of settings that are required to be configured on integration before authorization can occur",
            "example": [
              "client_id",
              "client_secret"
            ],
            "items": {
              "type": "string"
            },
            "readOnly": true,
            "type": "array"
          },
          "state": {
            "$ref": "#/components/schemas/ConnectionState"
          },
          "status": {
            "description": "Status of the connection.",
            "enum": [
              "live",
              "upcoming",
              "requested"
            ],
            "readOnly": true,
            "type": "string",
            "x-apideck-enum-id": "connections.status"
          },
          "subscriptions": {
            "items": {
              "$ref": "#/components/schemas/WebhookSubscription"
            },
            "readOnly": true,
            "type": "array"
          },
          "tag_line": {
            "example": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
            "readOnly": true,
            "type": "string"
          },
          "unified_api": {
            "description": "The unified API category where the connection belongs to.",
            "example": "crm",
            "readOnly": true,
            "type": "string"
          },
          "updated_at": {
            "example": 1616662325753,
            "nullable": true,
            "readOnly": true,
            "type": "number"
          },
          "validation_support": {
            "readOnly": true,
            "type": "boolean"
          },
          "website": {
            "description": "The website URL of the connection",
            "example": "https://www.salesforce.com",
            "readOnly": true,
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Connection"
      },
      "ConnectionEvent": {
        "properties": {
          "entity": {
            "$ref": "#/components/schemas/ConsumerConnection"
          },
          "entity_id": {
            "description": "The service provider's ID of the entity that triggered this event",
            "example": "123456ASDF",
            "type": "string"
          },
          "entity_type": {
            "description": "The type entity that triggered this event",
            "example": "Connection",
            "type": "string"
          },
          "event_id": {
            "description": "Unique reference to this request event",
            "example": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
            "type": "string"
          },
          "event_type": {
            "$ref": "#/components/schemas/VaultEventType"
          },
          "execution_attempt": {
            "description": "The current count this request event has been attempted",
            "example": 2,
            "type": "number"
          },
          "occurred_at": {
            "description": "ISO Datetime for when the original event occurred",
            "example": "2021-10-01T03:14:55.419Z",
            "type": "string"
          },
          "service_id": {
            "description": "Service provider identifier",
            "example": "close",
            "type": "string"
          }
        },
        "type": "object",
        "x-sdk-exclude": true
      },
      "ConnectionImportData": {
        "properties": {
          "credentials": {
            "additionalProperties": false,
            "example": {
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
              "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"
            },
            "properties": {
              "access_token": {
                "description": "Access token",
                "example": "1234567890abcdefghijklmnopqrstuvwxyz",
                "type": "string"
              },
              "expires_in": {
                "description": "The number of seconds until the token expires. If omitted the token will be queued for refresh.",
                "example": 3600,
                "nullable": true,
                "type": "integer"
              },
              "issued_at": {
                "description": "The datetime at which the token was issued. If omitted the token will be queued for refresh.",
                "example": "2020-01-01T00:00:00Z",
                "format": "date-time",
                "nullable": true,
                "type": "string"
              },
              "refresh_token": {
                "description": "The refresh token can be used to obtain a new access token.",
                "example": "1234567890abcdefghijklmnopqrstuvwxyz",
                "type": "string"
              }
            },
            "required": [
              "refresh_token"
            ],
            "type": "object"
          },
          "metadata": {
            "additionalProperties": true,
            "description": "Attach your own consumer specific metadata",
            "example": {
              "account": {
                "id": "c01458a5-7276-41ce-bc19-639906b0450a",
                "name": "My Company"
              },
              "plan": "enterprise"
            },
            "nullable": true,
            "properties": {},
            "type": "object"
          },
          "settings": {
            "description": "Connection settings. Values will persist to `form_fields` with corresponding id",
            "example": {
              "instance_url": "https://eu28.salesforce.com"
            },
            "nullable": true,
            "type": "object"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "ConnectionImportData"
      },
      "ConnectionMetadata": {
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "ConnectionMetadata"
      },
      "ConnectionState": {
        "description": "[Connection state flow](#section/Connection-state)",
        "enum": [
          "available",
          "callable",
          "added",
          "authorized",
          "invalid"
        ],
        "example": "authorized",
        "readOnly": true,
        "type": "string",
        "x-apideck-enum-id": "connections.state",
        "x-apideck-schema-id": "ConnectionState"
      },
      "ConnectionWebhook": {
        "additionalProperties": false,
        "properties": {
          "created_at": {
            "description": "The date and time when the object was created.",
            "example": "2020-09-30T07:43:32.000Z",
            "format": "date-time",
            "readOnly": true,
            "title": "Created at (timestamp)",
            "type": "string"
          },
          "delivery_url": {
            "description": "The delivery url of the webhook endpoint.",
            "example": "https://example.com/my/webhook/endpoint",
            "format": "uri",
            "pattern": "^(https?)://",
            "type": "string"
          },
          "description": {
            "description": "A description of the object.",
            "example": "A description",
            "nullable": true,
            "title": "Description",
            "type": "string"
          },
          "disabled_reason": {
            "description": "Indicates if the webhook has has been disabled as it reached its retry limit or if account is over the usage allocated by it's plan.",
            "enum": [
              "none",
              "retry_limit",
              "usage_limit"
            ],
            "example": "retry_limit",
            "type": "string",
            "x-apideck-enum-id": "webhook.disabled_reasons"
          },
          "events": {
            "description": "The list of subscribed events for this webhook. [`*`] indicates that all events are enabled.",
            "example": [
              "vault.connection.created",
              "vault.connection.updated"
            ],
            "items": {
              "enum": [
                "*",
                "crm.activity.created",
                "crm.activity.updated",
                "crm.activity.deleted",
                "crm.company.created",
                "crm.company.updated",
                "crm.company.deleted",
                "crm.contact.created",
                "crm.contact.updated",
                "crm.contact.deleted",
                "crm.lead.created",
                "crm.lead.updated",
                "crm.lead.deleted",
                "crm.note.created",
                "crm.notes.updated",
                "crm.notes.deleted",
                "crm.opportunity.created",
                "crm.opportunity.updated",
                "crm.opportunity.deleted",
                "lead.lead.created",
                "lead.lead.updated",
                "lead.lead.deleted",
                "vault.connection.created",
                "vault.connection.updated",
                "vault.connection.disabled",
                "vault.connection.deleted",
                "vault.connection.callable",
                "vault.connection.token_refresh.failed",
                "ats.job.created",
                "ats.job.updated",
                "ats.job.deleted",
                "ats.applicant.created",
                "ats.applicant.updated",
                "ats.applicant.deleted",
                "accounting.customer.created",
                "accounting.customer.updated",
                "accounting.customer.deleted",
                "accounting.invoice.created",
                "accounting.invoice.updated",
                "accounting.invoice.deleted",
                "accounting.invoice_item.created",
                "accounting.invoice_item.updated",
                "accounting.invoice_item.deleted",
                "accounting.ledger_account.created",
                "accounting.ledger_account.updated",
                "accounting.ledger_account.deleted",
                "accounting.tax_rate.created",
                "accounting.tax_rate.updated",
                "accounting.tax_rate.deleted",
                "accounting.bill.created",
                "accounting.bill.updated",
                "accounting.bill.deleted",
                "accounting.payment.created",
                "accounting.payment.updated",
                "accounting.payment.deleted",
                "accounting.supplier.created",
                "accounting.supplier.updated",
                "accounting.supplier.deleted",
                "pos.order.created",
                "pos.order.updated",
                "pos.order.deleted",
                "pos.product.created",
                "pos.product.updated",
                "pos.product.deleted",
                "pos.payment.created",
                "pos.payment.updated",
                "pos.item.created",
                "pos.item.updated",
                "pos.item.deleted",
                "pos.modifier.created",
                "pos.modifier.updated",
                "pos.modifier.deleted",
                "pos.modifier-group.created",
                "pos.modifier-group.updated",
                "pos.modifier-group.deleted",
                "hris.employee.created",
                "hris.employee.updated",
                "hris.employee.deleted",
                "hris.company.created",
                "hris.company.updated",
                "hris.company.deleted",
                "file-storage.file.created",
                "file-storage.file.updated",
                "file-storage.file.deleted",
                "issue-tracking.ticket.created",
                "issue-tracking.ticket.updated",
                "issue-tracking.ticket.deleted"
              ],
              "example": "crm.company.created",
              "type": "string",
              "x-apideck-enum-id": "webhooks.event_type"
            },
            "title": "Subscribed events",
            "type": "array"
          },
          "execute_base_url": {
            "description": "The Unify Base URL events from connectors will be sent to after service id is appended.",
            "example": "https://unify.apideck.com/webhook/webhooks/1234/execute",
            "format": "uri",
            "pattern": "^(https?)://",
            "readOnly": true,
            "type": "string"
          },
          "id": {
            "example": "1234",
            "readOnly": true,
            "type": "string"
          },
          "status": {
            "description": "The status of the webhook.",
            "enum": [
              "enabled",
              "disabled"
            ],
            "example": "enabled",
            "type": "string",
            "x-apideck-enum-id": "webhooks.status",
            "x-graphql-type-name": "WebhookStatus"
          },
          "unified_api": {
            "$ref": "#/components/schemas/UnifiedApiId"
          },
          "updated_at": {
            "description": "The date and time when the object was last updated.",
            "example": "2020-09-30T07:43:32.000Z",
            "format": "date-time",
            "nullable": true,
            "readOnly": true,
            "title": "Updated at (timestamp)",
            "type": "string"
          }
        },
        "required": [
          "delivery_url",
          "status",
          "events",
          "unified_api",
          "execute_base_url"
        ],
        "type": "object",
        "x-apideck-schema-id": "Webhook"
      },
      "Consumer": {
        "properties": {
          "aggregated_request_count": {
            "example": 101,
            "readOnly": true,
            "type": "number"
          },
          "application_id": {
            "description": "ID of your Apideck Application",
            "example": "dSBdXd2H6Mqwfg0atXHXYcysLJE9qyn1VwBtXHX",
            "readOnly": true,
            "type": "string"
          },
          "connections": {
            "items": {
              "$ref": "#/components/schemas/ConsumerConnection"
            },
            "readOnly": true,
            "type": "array"
          },
          "consumer_id": {
            "$ref": "#/components/schemas/ConsumerId"
          },
          "created": {
            "example": "2021-05-07T12:55:42.242Z",
            "readOnly": true,
            "type": "string"
          },
          "metadata": {
            "$ref": "#/components/schemas/ConsumerMetadata"
          },
          "modified": {
            "example": "2021-05-07T12:55:42.242Z",
            "readOnly": true,
            "type": "string"
          },
          "request_count_updated": {
            "example": "2021-05-07T12:55:42.242Z",
            "readOnly": true,
            "type": "string"
          },
          "request_counts": {
            "$ref": "#/components/schemas/RequestCountAllocation"
          },
          "services": {
            "example": [
              "salesforce",
              "stripe"
            ],
            "items": {
              "example": "salesforce",
              "type": "string"
            },
            "readOnly": true,
            "type": "array"
          }
        },
        "required": [
          "consumer_id"
        ],
        "type": "object",
        "x-apideck-schema-id": "Consumer"
      },
      "ConsumerConnection": {
        "properties": {
          "auth_type": {
            "$ref": "#/components/schemas/AuthType"
          },
          "consumer_id": {
            "example": "test_user_id",
            "type": "string"
          },
          "created_at": {
            "example": "2020-09-19T12:18:37.071Z",
            "type": "string"
          },
          "enabled": {
            "example": true,
            "type": "boolean"
          },
          "icon": {
            "example": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
            "type": "string"
          },
          "id": {
            "example": "1111+test_user_id",
            "readOnly": true,
            "type": "string"
          },
          "logo": {
            "example": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
            "type": "string"
          },
          "metadata": {
            "additionalProperties": true,
            "description": "Attach your own consumer specific metadata",
            "example": {
              "account": {
                "id": "c01458a5-7276-41ce-bc19-639906b0450a",
                "name": "My Company"
              },
              "plan": "enterprise"
            },
            "nullable": true,
            "properties": {},
            "type": "object"
          },
          "name": {
            "example": "Salesforce",
            "type": "string"
          },
          "service_id": {
            "example": "teamleader",
            "type": "string"
          },
          "settings": {
            "description": "Connection settings. Values will persist to `form_fields` with corresponding id",
            "example": {
              "instance_url": "https://eu28.salesforce.com"
            },
            "nullable": true,
            "type": "object"
          },
          "state": {
            "enum": [
              "available",
              "callable",
              "added",
              "configured",
              "authorized"
            ],
            "example": "authorized",
            "type": "string",
            "x-apideck-enum-id": "consumer.connections.state"
          },
          "tag_line": {
            "example": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
            "readOnly": true,
            "type": "string"
          },
          "unified_api": {
            "example": "crm",
            "type": "string"
          },
          "updated_at": {
            "example": "2020-09-19T12:18:37.071Z",
            "nullable": true,
            "type": "string"
          },
          "website": {
            "example": "https://www.salesforce.com",
            "readOnly": true,
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "ConsumerConnection"
      },
      "ConsumerId": {
        "description": "Unique consumer identifier. You can freely choose a consumer ID yourself. Most of the time, this is an ID of your internal data model that represents a user or account in your system (for example account:12345). If the consumer doesn't exist yet, Vault will upsert a consumer based on your ID.",
        "example": "test_consumer_id",
        "type": "string"
      },
      "ConsumerMetadata": {
        "description": "The metadata of the consumer. This is used to display the consumer in the sidebar. This is optional, but recommended.",
        "properties": {
          "account_name": {
            "description": "The name of the account as shown in the sidebar.",
            "example": "SpaceX",
            "title": "Account name",
            "type": "string"
          },
          "email": {
            "description": "The email of the user as shown in the sidebar.",
            "example": "elon@musk.com",
            "title": "Email",
            "type": "string"
          },
          "image": {
            "description": "The avatar of the user in the sidebar. Must be a valid URL",
            "example": "https://www.spacex.com/static/images/share.jpg",
            "title": "Image",
            "type": "string"
          },
          "user_name": {
            "description": "The name of the user as shown in the sidebar.",
            "example": "Elon Musk",
            "title": "User name",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "ConsumerMetadata"
      },
      "ConsumerRequestCountsInDateRangeResponse": {
        "properties": {
          "data": {
            "properties": {
              "aggregated_request_count": {
                "example": 40,
                "type": "number"
              },
              "application_id": {
                "example": "1111",
                "type": "string"
              },
              "consumer_id": {
                "example": "test_user_id",
                "type": "string"
              },
              "end_datetime": {
                "example": "2021-05-10T12:00:00.000Z",
                "type": "string"
              },
              "request_counts": {
                "$ref": "#/components/schemas/RequestCountAllocation"
              },
              "start_datetime": {
                "example": "2021-05-01T12:00:00.000Z",
                "type": "string"
              }
            },
            "type": "object",
            "x-apideck-schema-id": "ConsumerRequestCountsInDateRange"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "ConsumerRequestCountsInDateRangeResponse"
      },
      "CreateConnectionResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Connection"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 201,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "CreateConnectionResponse"
      },
      "CreateConsumerResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Consumer"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConsumerResponse"
      },
      "CreateSessionResponse": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "additionalProperties": false,
            "properties": {
              "session_token": {
                "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsImFwcGxpY2F0aW9uX2lkIj",
                "readOnly": true,
                "type": "string"
              },
              "session_uri": {
                "example": "http://vault.apideck.com/session/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcl9pZCI6InRlc3RfdXNlcl9pZCIsImFwcGxpY2F0aW9uX2lkIj",
                "readOnly": true,
                "type": "string"
              }
            },
            "required": [
              "session_uri",
              "session_token"
            ],
            "type": "object"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "CreateSessionResponse"
      },
      "DeleteConsumerResponse": {
        "properties": {
          "data": {
            "properties": {
              "consumer_id": {
                "$ref": "#/components/schemas/ConsumerId"
              }
            }
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConsumerResponse"
      },
      "FormField": {
        "properties": {
          "allow_custom_values": {
            "default": false,
            "description": "Only applicable to select fields. Allow the user to add a custom value though the option select if the desired value is not in the option select list.",
            "example": false,
            "title": "Allow custom values",
            "type": "boolean"
          },
          "custom_field": {
            "example": false,
            "type": "boolean"
          },
          "description": {
            "description": "The description of the form field",
            "example": "Slack channel to push notification to",
            "nullable": true,
            "type": "string"
          },
          "disabled": {
            "description": "Indicates if the form field is displayed in a “read-only” mode.",
            "example": false,
            "nullable": true,
            "type": "boolean"
          },
          "hidden": {
            "description": "Indicates if the form field is not displayed but the value that is being stored on the connection.",
            "example": false,
            "nullable": true,
            "type": "boolean"
          },
          "id": {
            "description": "The unique identifier of the form field.",
            "example": "channel",
            "type": "string"
          },
          "label": {
            "description": "The label of the field",
            "example": "Channel",
            "type": "string"
          },
          "options": {
            "example": [
              {
                "label": "General Channel",
                "value": "general"
              }
            ],
            "items": {
              "$ref": "#/components/schemas/FormFieldOption"
            },
            "type": "array"
          },
          "placeholder": {
            "description": "The placeholder for the form field",
            "example": "Select a channel",
            "nullable": true,
            "type": "string"
          },
          "prefix": {
            "description": "Prefix to display in front of the form field.",
            "example": "https://",
            "nullable": true,
            "type": "string"
          },
          "required": {
            "description": "Indicates if the form field is required, which means it must be filled in before the form can be submitted",
            "example": true,
            "type": "boolean"
          },
          "sensitive": {
            "description": "Indicates if the form field contains sensitive data, which will display the value as a masked input.",
            "example": false,
            "nullable": true,
            "type": "boolean"
          },
          "suffix": {
            "description": "Suffix to display next to the form field.",
            "example": ".shopify.com",
            "nullable": true,
            "type": "string"
          },
          "type": {
            "enum": [
              "text",
              "checkbox",
              "tel",
              "email",
              "url",
              "textarea",
              "select",
              "filtered-select",
              "multi-select",
              "datetime",
              "date",
              "time",
              "number"
            ],
            "example": "select"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "FormField",
        "x-graphql-type-name": "FormField"
      },
      "FormFieldOption": {
        "anyOf": [
          {
            "$ref": "#/components/schemas/SimpleFormFieldOption"
          },
          {
            "$ref": "#/components/schemas/FormFieldOptionGroup"
          }
        ]
      },
      "FormFieldOptionGroup": {
        "properties": {
          "id": {
            "example": "1234",
            "type": "string"
          },
          "label": {
            "example": "General Channel",
            "type": "string"
          },
          "options": {
            "items": {
              "$ref": "#/components/schemas/SimpleFormFieldOption"
            },
            "type": "array"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "FormFieldOptionGroup"
      },
      "GetConnectionResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Connection"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConnectionResponse"
      },
      "GetConnectionsResponse": {
        "properties": {
          "data": {
            "items": {
              "$ref": "#/components/schemas/Connection"
            },
            "type": "array"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConnectionsResponse"
      },
      "GetConsumerResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Consumer"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConsumerResponse"
      },
      "GetConsumersResponse": {
        "properties": {
          "data": {
            "items": {
              "properties": {
                "aggregated_request_count": {
                  "example": 101,
                  "type": "number"
                },
                "application_id": {
                  "example": "1111",
                  "type": "string"
                },
                "consumer_id": {
                  "example": "test_consumer_id",
                  "type": "string"
                },
                "created": {
                  "example": "2021-05-07T12:55:42.242Z",
                  "type": "string"
                },
                "metadata": {
                  "$ref": "#/components/schemas/ConsumerMetadata"
                },
                "modified": {
                  "example": "2021-05-07T12:55:42.242Z",
                  "type": "string"
                },
                "request_count_updated": {
                  "example": "2021-05-07T12:55:42.242Z",
                  "type": "string"
                },
                "request_counts": {
                  "$ref": "#/components/schemas/RequestCountAllocation"
                },
                "services": {
                  "example": [
                    "salesforce",
                    "stripe"
                  ],
                  "items": {
                    "example": "salesforce",
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            },
            "type": "array"
          },
          "links": {
            "$ref": "#/components/schemas/Links"
          },
          "meta": {
            "$ref": "#/components/schemas/Meta"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConsumersResponse"
      },
      "GetLogsResponse": {
        "properties": {
          "data": {
            "items": {
              "$ref": "#/components/schemas/Log"
            },
            "type": "array"
          },
          "links": {
            "$ref": "#/components/schemas/Links"
          },
          "meta": {
            "$ref": "#/components/schemas/Meta"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetLogsResponse",
        "x-graphql-type-name": "LogList"
      },
      "IntegrationState": {
        "description": "The current state of the Integration.",
        "enum": [
          "disabled",
          "needs_configuration",
          "configured"
        ],
        "example": "configured",
        "readOnly": true,
        "type": "string",
        "x-apideck-enum-id": "integrations.state",
        "x-apideck-schema-id": "IntegrationState"
      },
      "Links": {
        "description": "Links to navigate to previous or next pages through the API",
        "properties": {
          "current": {
            "description": "Link to navigate to the current page through the API",
            "example": "https://unify.apideck.com/crm/companies",
            "type": "string"
          },
          "next": {
            "description": "Link to navigate to the previous page through the API",
            "example": "https://unify.apideck.com/crm/companies?cursor=em9oby1jcm06OnBhZ2U6OjM",
            "nullable": true,
            "type": "string"
          },
          "previous": {
            "description": "Link to navigate to the previous page through the API",
            "example": "https://unify.apideck.com/crm/companies?cursor=em9oby1jcm06OnBhZ2U6OjE%3D",
            "nullable": true,
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Links"
      },
      "Log": {
        "additionalProperties": false,
        "properties": {
          "api_style": {
            "description": "Indicates if the request was made via REST or Graphql endpoint.",
            "example": "REST",
            "type": "string"
          },
          "base_url": {
            "description": "The Apideck base URL the request was made to.",
            "example": "unify.apideck.com",
            "type": "string"
          },
          "child_request": {
            "description": "Indicates whether or not this is a child or parent request.",
            "example": false,
            "type": "boolean"
          },
          "consumer_id": {
            "description": "The consumer Id associated with the request.",
            "example": "test-consumer",
            "type": "string"
          },
          "duration": {
            "description": "The entire execution time in milliseconds it took to call the Apideck service provider.",
            "example": 2220.379304,
            "type": "number"
          },
          "error_message": {
            "description": "If error occurred, this is brief explanation",
            "example": "Refresh token is invalid",
            "nullable": true,
            "type": "string"
          },
          "execution": {
            "description": "The entire execution time in milliseconds it took to make the request.",
            "example": 2248,
            "type": "integer"
          },
          "has_children": {
            "description": "When request is a parent request, this indicates if there are child requests associated.",
            "example": false,
            "type": "boolean"
          },
          "http_method": {
            "description": "HTTP Method of request.",
            "example": "GET",
            "type": "string"
          },
          "id": {
            "description": "UUID acting as Request Identifier.",
            "example": "0b5f7480-5550-4f5c-a5fc-3c01ac43dd0f",
            "type": "string"
          },
          "latency": {
            "description": "Latency added by making this request via Unified Api.",
            "example": 27.620695999999953,
            "type": "number"
          },
          "operation": {
            "additionalProperties": false,
            "description": "The request as defined in OpenApi Spec.",
            "properties": {
              "id": {
                "description": "The OpenApi Operation Id associated with the request",
                "example": "connectionsAll",
                "type": "string"
              },
              "name": {
                "description": "The OpenApi Operation name associated with the request",
                "example": "Get All Connections",
                "type": "string"
              }
            },
            "required": [
              "id",
              "name"
            ],
            "type": "object"
          },
          "parent_id": {
            "description": "When request is a child request, this UUID indicates it's parent request.",
            "example": "0b5f7480-5550-4f5c-a5fc-3c01ac43dd0f",
            "nullable": true,
            "type": "string"
          },
          "path": {
            "description": "The path component of the URI the request was made to.",
            "example": "/vault/connections",
            "type": "string"
          },
          "sandbox": {
            "description": "Indicates whether the request was made using Apidecks sandbox credentials or not.",
            "example": false,
            "type": "boolean"
          },
          "service": {
            "additionalProperties": false,
            "description": "Apideck service provider associated with request.",
            "properties": {
              "id": {
                "description": "Apideck service provider id.",
                "example": "apideck-vault",
                "type": "string"
              },
              "name": {
                "description": "Apideck service provider name.",
                "example": "Apideck Vault",
                "type": "string"
              }
            },
            "required": [
              "id",
              "name"
            ],
            "type": "object"
          },
          "source_ip": {
            "description": "The IP address of the source of the request.",
            "example": "94.227.131.238",
            "nullable": true,
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Status code that was returned.",
            "example": 200,
            "type": "integer"
          },
          "success": {
            "description": "Whether or not the request was successful.",
            "example": true,
            "type": "boolean"
          },
          "timestamp": {
            "description": "ISO Date and time when the request was made.",
            "example": "2021-07-12T14:26:17.420Z",
            "type": "string"
          },
          "unified_api": {
            "description": "Which Unified Api request was made to.",
            "enum": [
              "crm",
              "lead",
              "proxy",
              "vault",
              "accounting",
              "hris",
              "ats",
              "ecommerce",
              "issue-tracking",
              "pos",
              "file-storage",
              "sms"
            ],
            "example": "vault",
            "type": "string",
            "x-apideck-enum-id": "logs.unified_api"
          }
        },
        "required": [
          "id",
          "parent_id",
          "api_style",
          "base_url",
          "child_request",
          "consumer_id",
          "duration",
          "execution",
          "has_children",
          "http_method",
          "latency",
          "operation",
          "path",
          "sandbox",
          "service",
          "status_code",
          "success",
          "timestamp",
          "unified_api"
        ],
        "type": "object",
        "x-apideck-schema-id": "Log"
      },
      "LogsFilter": {
        "properties": {
          "connector_id": {
            "example": "crm+salesforce",
            "nullable": true,
            "type": "string"
          },
          "exclude_unified_apis": {
            "example": "vault,proxy",
            "nullable": true,
            "type": "string"
          },
          "status_code": {
            "example": 201,
            "nullable": true,
            "type": "number"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "LogsFilter",
        "x-graphql-type-name": "LogsFilter"
      },
      "Meta": {
        "description": "Response metadata",
        "properties": {
          "cursors": {
            "description": "Cursors to navigate to previous or next pages through the API",
            "properties": {
              "current": {
                "description": "Cursor to navigate to the current page of results through the API",
                "example": "em9oby1jcm06OnBhZ2U6OjI=",
                "nullable": true,
                "type": "string"
              },
              "next": {
                "description": "Cursor to navigate to the next page of results through the API",
                "example": "em9oby1jcm06OnBhZ2U6OjM=",
                "nullable": true,
                "type": "string"
              },
              "previous": {
                "description": "Cursor to navigate to the previous page of results through the API",
                "example": "em9oby1jcm06OnBhZ2U6OjE=",
                "nullable": true,
                "type": "string"
              }
            },
            "type": "object"
          },
          "items_on_page": {
            "description": "Number of items returned in the data property of the response",
            "example": 50,
            "type": "integer"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Meta"
      },
      "NotFoundResponse": {
        "properties": {
          "detail": {
            "anyOf": [
              {
                "example": "Could not find widget with id: '123'",
                "type": "string"
              },
              {
                "example": {
                  "not_found": {
                    "entity": "widget",
                    "id": "123"
                  }
                },
                "type": "object"
              }
            ],
            "description": "Contains parameter or domain specific information related to the error and why it occurred."
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Not Found",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Unknown Widget",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#entitynotfounderror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 404,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "EntityNotFoundError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "NotFound"
      },
      "NotImplementedResponse": {
        "properties": {
          "detail": {
            "anyOf": [
              {
                "example": "Failed to retrieve Widget tokenUrl from 'components.securitySchemes.OAuth2.flows'",
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "Contains parameter or domain specific information related to the error and why it occurred."
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Not Implemented",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Unmapped Attribute",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#mappingerror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 501,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "MappingError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "NotImplemented"
      },
      "OAuthGrantType": {
        "description": "OAuth grant type used by the connector. More info: https://oauth.net/2/grant-types",
        "enum": [
          "authorization_code",
          "client_credentials",
          "password"
        ],
        "example": "authorization_code",
        "readOnly": true,
        "type": "string",
        "x-apideck-enum-id": "oauth_grant_types"
      },
      "PaymentRequiredResponse": {
        "properties": {
          "detail": {
            "description": "Contains parameter or domain specific information related to the error and why it occurred.",
            "example": "You have reached your limit of 2000",
            "type": "string"
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Payment Required",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Request Limit Reached",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#requestlimiterror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 402,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "RequestLimitError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "PaymentRequired"
      },
      "ProxyRequest": {
        "example": {
          "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "api_version": "2010-04-01",
          "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
          "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
          "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
          "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
          "direction": "outbound-api",
          "from": "+15017122661",
          "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "num_media": "0",
          "num_segments": "1",
          "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "status": "sent",
          "subresource_uris": {
            "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
          },
          "to": "+15558675310",
          "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
        },
        "properties": {},
        "type": "object",
        "x-apideck-schema-id": "ProxyRequest"
      },
      "RequestCountAllocation": {
        "properties": {
          "proxy": {
            "example": 10,
            "type": "number"
          },
          "unify": {
            "example": 100,
            "type": "number"
          },
          "vault": {
            "example": 21,
            "type": "number"
          }
        },
        "readOnly": true,
        "type": "object",
        "x-apideck-schema-id": "RequestCountAllocation"
      },
      "Session": {
        "additionalProperties": false,
        "properties": {
          "consumer_metadata": {
            "$ref": "#/components/schemas/ConsumerMetadata"
          },
          "custom_consumer_settings": {
            "additionalProperties": true,
            "description": "Custom consumer settings that are passed as part of the session.",
            "example": {
              "feature_flag_1": true,
              "tax_rates": [
                {
                  "id": "6",
                  "label": "6%"
                },
                {
                  "id": "21",
                  "label": "21%"
                }
              ]
            },
            "title": "Custom consumer settings",
            "type": "object"
          },
          "redirect_uri": {
            "description": "The URL to redirect the user to after the session has been configured.",
            "example": "https://mysaas.com/dashboard",
            "title": "Redirect URI",
            "type": "string"
          },
          "settings": {
            "additionalProperties": false,
            "description": "Settings to change the way the Vault is displayed.",
            "properties": {
              "allow_actions": {
                "description": "Hide actions from your users in [Vault](/apis/vault/reference#section/Get-Started). Actions in `allow_actions` will be shown on a connection in Vault.\nAvailable actions are: `delete`, `disconnect`, `reauthorize` and `disable`.\nEmpty array will hide all actions. By default all actions are visible.",
                "items": {
                  "enum": [
                    "delete",
                    "disconnect",
                    "reauthorize",
                    "disable"
                  ],
                  "type": "string"
                },
                "title": "Allow actions",
                "type": "array"
              },
              "auto_redirect": {
                "default": false,
                "description": "Automatically redirect to redirect uri after the connection has been configured as callable. Defaults to `false`.",
                "title": "Auto-redirect",
                "type": "boolean"
              },
              "hide_guides": {
                "default": false,
                "description": "Hide Apideck connection guides in [Vault](/apis/vault/reference#section/Get-Started). Defaults to `false`.",
                "title": "Hide guides",
                "type": "boolean"
              },
              "hide_resource_settings": {
                "default": false,
                "description": "A boolean that controls the display of the configurable resources for an integration. When set to true, the resource configuration options will be hidden and not shown to the user. When set to false, the resource configuration options will be displayed to the user.",
                "title": "Hide resource settings",
                "type": "boolean"
              },
              "isolation_mode": {
                "default": false,
                "description": "Configure [Vault](/apis/vault/reference#section/Get-Started) to run in isolation mode, meaning it only shows the connection settings and hides the navigation items.",
                "title": "Isolation mode",
                "type": "boolean"
              },
              "sandbox_mode": {
                "default": false,
                "description": "Configure [Vault](/apis/vault/reference#section/Get-Started) to show a banner informing the logged in user is in a test environment.",
                "title": "Sandbox mode",
                "type": "boolean"
              },
              "session_length": {
                "default": "1h",
                "description": "The duration of time the session is valid for (maximum 1 week).",
                "example": "30m",
                "title": "Session Length",
                "type": "string"
              },
              "show_logs": {
                "default": true,
                "description": "Configure [Vault](/apis/vault/reference#section/Get-Started) to show the logs page. Defaults to `true`.",
                "title": "Show logs",
                "type": "boolean"
              },
              "show_sidebar": {
                "default": true,
                "description": "Configure [Vault](/apis/vault/reference#section/Get-Started) to show the sidebar. Defaults to `true`.",
                "title": "Show sidebar",
                "type": "boolean"
              },
              "show_suggestions": {
                "default": false,
                "description": "Configure [Vault](/apis/vault/reference#section/Get-Started) to show the suggestions page. Defaults to `false`.",
                "title": "Show suggestions",
                "type": "boolean"
              },
              "unified_apis": {
                "description": "Provide the IDs of the Unified APIs you want to be visible. Leaving it empty or omitting this field will show all Unified APIs.",
                "items": {
                  "$ref": "#/components/schemas/UnifiedApiId"
                },
                "type": "array"
              }
            },
            "type": "object",
            "x-graphql-type-name": "SessionSettings"
          },
          "theme": {
            "description": "Theming options to change the look and feel of Vault.",
            "properties": {
              "favicon": {
                "description": "The URL to the favicon to use for Vault.",
                "example": "https://res.cloudinary.com/apideck/icons/intercom",
                "title": "Favicon",
                "type": "string"
              },
              "logo": {
                "description": "The URL to the logo to use for Vault.",
                "example": "https://res.cloudinary.com/apideck/icons/intercom",
                "title": "Logo",
                "type": "string"
              },
              "primary_color": {
                "description": "The primary color to use for Vault.",
                "example": "#286efa",
                "title": "Primary color",
                "type": "string"
              },
              "privacy_url": {
                "description": "The URL to the privacy policy that will be shown in the sidebar.",
                "example": "https://compliance.apideck.com/privacy-policy",
                "title": "Privacy URL",
                "type": "string"
              },
              "sidepanel_background_color": {
                "description": "The background color to use for the sidebar.",
                "example": "#286efa",
                "title": "Sidebar background color",
                "type": "string"
              },
              "sidepanel_text_color": {
                "description": "The text color to use for the sidebar.",
                "example": "#FFFFFF",
                "title": "Sidebar text color",
                "type": "string"
              },
              "terms_url": {
                "description": "The URL to the terms and conditions that will be shown in the sidebar.",
                "example": "https://www.termsfeed.com/terms-conditions/957c85c1b089ae9e3219c83eff65377e",
                "title": "Terms URL",
                "type": "string"
              },
              "vault_name": {
                "description": "The name that will be shown in the sidebar.",
                "example": "Intercom",
                "title": "Vault name",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Session"
      },
      "SimpleFormFieldOption": {
        "properties": {
          "label": {
            "example": "General Channel",
            "type": "string"
          },
          "value": {
            "anyOf": [
              {
                "example": "general",
                "type": "string"
              },
              {
                "example": 123,
                "type": "integer"
              },
              {
                "example": 12.5,
                "type": "number"
              },
              {
                "example": true,
                "type": "boolean"
              },
              {
                "example": [
                  "team",
                  "general"
                ],
                "items": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    }
                  ]
                },
                "type": "array"
              }
            ]
          }
        },
        "type": "object",
        "x-apideck-schema-id": "SimpleFormFieldOption"
      },
      "UnauthorizedResponse": {
        "properties": {
          "detail": {
            "description": "Contains parameter or domain specific information related to the error and why it occurred.",
            "example": "Failed to generate valid JWT Session. Verify applicationId is correct",
            "type": "string"
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Unauthorized",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Unauthorized Request",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#unauthorizederror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 401,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "UnauthorizedError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Unauthorized"
      },
      "UnexpectedErrorResponse": {
        "properties": {
          "detail": {
            "anyOf": [
              {
                "example": "Missing Header: x-apideck-consumer-id",
                "type": "string"
              },
              {
                "example": {
                  "missing": [
                    {
                      "x-apideck-consumer-id": "required"
                    }
                  ]
                },
                "type": "object"
              }
            ],
            "description": "Contains parameter or domain specific information related to the error and why it occurred."
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Bad Request",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Invalid Params",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#unauthorizederror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 400,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "RequestHeadersValidationError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Error"
      },
      "UnifiedApiId": {
        "description": "Name of Apideck Unified API",
        "enum": [
          "accounting",
          "ats",
          "calendar",
          "crm",
          "csp",
          "customer-support",
          "ecommerce",
          "email",
          "email-marketing",
          "expense-management",
          "file-storage",
          "form",
          "hris",
          "lead",
          "payroll",
          "pos",
          "procurement",
          "project-management",
          "script",
          "sms",
          "spreadsheet",
          "team-messaging",
          "issue-tracking",
          "time-registration",
          "transactional-email",
          "vault"
        ],
        "example": "crm",
        "type": "string",
        "x-apideck-enum-id": "unified_api"
      },
      "UnprocessableResponse": {
        "properties": {
          "detail": {
            "description": "Contains parameter or domain specific information related to the error and why it occurred.",
            "example": "Unprocessable request, please verify your request headers and body.",
            "type": "string"
          },
          "error": {
            "description": "Contains an explanation of the status_code as defined in HTTP/1.1 standard (RFC 7231)",
            "example": "Unprocessable Entity",
            "type": "string"
          },
          "message": {
            "description": "A human-readable message providing more details about the error.",
            "example": "Invalid State",
            "type": "string"
          },
          "ref": {
            "description": "Link to documentation of error type",
            "example": "https://developers.apideck.com/errors#invalidstateerror",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP status code",
            "example": 422,
            "type": "number"
          },
          "type_name": {
            "description": "The type of error returned",
            "example": "InvalidStateError",
            "type": "string"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "Unprocessable"
      },
      "UpdateConnectionResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Connection"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "UpdateConnectionResponse"
      },
      "UpdateConsumerRequest": {
        "additionalProperties": false,
        "properties": {
          "metadata": {
            "$ref": "#/components/schemas/ConsumerMetadata"
          }
        },
        "type": "object",
        "x-apideck-schema-id": "UpdateConsumerRequest"
      },
      "UpdateConsumerResponse": {
        "properties": {
          "data": {
            "$ref": "#/components/schemas/Consumer"
          },
          "status": {
            "description": "HTTP Response Status",
            "example": "OK",
            "type": "string"
          },
          "status_code": {
            "description": "HTTP Response Status Code",
            "example": 200,
            "type": "integer"
          }
        },
        "required": [
          "status_code",
          "status",
          "data"
        ],
        "type": "object",
        "x-apideck-schema-id": "GetConsumerResponse"
      },
      "VaultEventType": {
        "enum": [
          "*",
          "vault.connection.created",
          "vault.connection.updated",
          "vault.connection.disabled",
          "vault.connection.deleted",
          "vault.connection.callable",
          "vault.connection.token_refresh.failed"
        ],
        "example": "vault.connection.created",
        "type": "string",
        "x-apideck-enum-id": "vault.events"
      },
      "WebhookSubscription": {
        "additionalProperties": false,
        "properties": {
          "created_at": {
            "description": "The date and time the webhook subscription was created downstream",
            "example": "2020-10-01T12:00:00.000Z",
            "type": "string"
          },
          "downstream_event_types": {
            "description": "The list of downstream Events this connection is subscribed to",
            "items": {
              "description": "The Downstream Event Type",
              "example": "contacts.CREATED",
              "type": "string"
            },
            "type": "array"
          },
          "downstream_id": {
            "description": "The ID of the downstream service",
            "example": "5f5f5f5f5f5f5f5f5f5f5f5f",
            "type": "string"
          },
          "execute_url": {
            "description": "The URL the downstream is sending to when the event is triggered",
            "example": "https://unify.apideck.com/webhook/w/{lookupIdToken}/{serviceId}?e={downstreamEventType}",
            "type": "string"
          },
          "unify_event_types": {
            "description": "The list of Unify Events this connection is subscribed to",
            "items": {
              "description": "The Unify Event Type",
              "example": "crm.contact.created",
              "type": "string"
            },
            "type": "array"
          }
        },
        "readOnly": true,
        "type": "object",
        "x-apideck-schema-id": "WebhookSubscription"
      }
    },
    "securitySchemes": {
      "apiKey": {
        "description": "To use API you have to sign up and get your own API key. Unify API accounts have sandbox mode and live mode API keys. \nTo change modes just use the appropriate key to get a live or test object. You can find your API keys on the unify settings of your Apideck app.\nYour Apideck application_id can also be found on the same page.\n\nAuthenticate your API requests by including your test or live secret API key in the request header. \n\n- Bearer authorization header: `Authorization: Bearer <your-apideck-api-key>`\n- Application id header: `x-apideck-app-id: <your-apideck-app-id>`\n\nYou should use the public keys on the SDKs and the secret keys to authenticate API requests.\n\n**Do not share or include your secret API keys on client side code.** Your API keys carry significant privileges. Please ensure to keep them 100% secure and be sure to not share your secret API keys in areas that are publicly accessible like GitHub.\n\nLearn how to set the Authorization header inside Postman https://learning.postman.com/docs/postman/sending-api-requests/authorization/#api-key\n\nGo to Unify to grab your API KEY https://app.apideck.com/unify/api-keys\n",
        "in": "header",
        "name": "Authorization",
        "type": "apiKey"
      },
      "applicationId": {
        "description": "The ID of your Unify application",
        "in": "header",
        "name": "x-apideck-app-id",
        "type": "apiKey"
      }
    }
  },
  "x-webhooks": {
    "ConnectionCallable": {
      "post": {
        "description": "Event broadcast when a connection is now callable.",
        "operationId": "connectionCallable",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": true,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "callable",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.callable",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Callable",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.callable"
      }
    },
    "ConnectionCreated": {
      "post": {
        "description": "Event broadcast when a connection has been created.",
        "operationId": "connectionCreated",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": true,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "added",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.created",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Created",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.created"
      }
    },
    "ConnectionDeleted": {
      "post": {
        "description": "Event broadcast when a connection has been deleted.",
        "operationId": "connectionDeleted",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": true,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "available",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.deleted",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Deleted",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.deleted"
      }
    },
    "ConnectionDisabled": {
      "post": {
        "description": "Event broadcast when a connection has been disabled.",
        "operationId": "connectionDisabled",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": false,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "authorized",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.disabled",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Disabled",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.disabled"
      }
    },
    "ConnectionUpdated": {
      "post": {
        "description": "Event broadcast when a connection has been updated.",
        "operationId": "connectionUpdated",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": true,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "authorized",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.updated",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Updated",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.updated"
      }
    },
    "TokenRefreshFailed": {
      "post": {
        "description": "Event broadcast when a connection token refresh has failed.",
        "operationId": "connectionTokenRefreshFailed",
        "parameters": [
          {
            "description": "The type of event that was triggered",
            "in": "header",
            "name": "x-apideck-event-type",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/VaultEventType"
            }
          },
          {
            "description": "An idempotency key is a unique value generated to recognize subsequent retries/duplicates of the same request.",
            "in": "header",
            "name": "x-apideck-idempotency-key",
            "required": true,
            "schema": {
              "example": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "format": "uuid",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "entity": {
                  "auth_type": "oauth2",
                  "consumer_id": "test_user_id",
                  "created_at": "2020-09-19T12:18:37.071Z",
                  "enabled": true,
                  "icon": "https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png",
                  "id": "1111+test_user_id",
                  "logo": "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",
                  "name": "Salesforce",
                  "service_id": "salesforce",
                  "state": "added",
                  "tag_line": "CRM software solutions and enterprise cloud computing from Salesforce, the leader in customer relationship management (CRM) and PaaS. Free 30 day trial.",
                  "unified_api": "crm",
                  "updated_at": "2020-09-19T12:18:37.071Z",
                  "website": "https://www.salesforce.com"
                },
                "entity_id": "1111+test_user_id",
                "entity_type": "Connection",
                "event_id": "9755c355-56c3-4a2f-a2da-86ff4411fccb",
                "event_type": "vault.connection.token_refresh.failed",
                "execution_attempt": 2,
                "occurred_at": "2021-10-01T03:14:55.419Z",
                "service_id": "apideck-vault"
              },
              "schema": {
                "$ref": "#/components/schemas/ConnectionEvent"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully."
          }
        },
        "security": [],
        "summary": "Connection Token Refresh Failed",
        "tags": [
          "Webhook Events"
        ],
        "x-apideck-event-type": "vault.connection.token_refresh.failed"
      }
    },
    "x-sdk-exclude": true
  }
}