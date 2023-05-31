import { OpenApiAdapter } from "../../src";
import { openapi } from "../../src/types";
import { Intersect } from "../../src/types/common";
import { path } from "../../src/types/openapi/path";

export const fitneatApiSchema = <const>{
  openapi: "3.0.0",
  paths: {
    "/v1/auth/token/admin": {
      get: {
        operationId: "AuthController_getAdminToken",
        parameters: [
          {
            name: "password",
            required: true,
            in: "query",
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenResponse" },
            },
          },
        },
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TokenResponse" },
              },
            },
          },
          "401": { description: "" },
          "403": { description: "" },
          "404": { description: "" },
        },
        tags: ["Auth"],
      },
    },
    "/v1/auth/token/user": {
      get: {
        operationId: "AuthController_getUserToken",
        parameters: [
          {
            name: "authProvider",
            required: true,
            in: "query",
            schema: {
              enum: ["apple", "facebook", "google", "microsoft"],
              type: "string",
            },
          },
          {
            name: "idToken",
            required: true,
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TokenResponse" },
              },
            },
          },
          "401": { description: "" },
          "403": { description: "" },
          "404": { description: "" },
        },
        tags: ["Auth"],
      },
    },
    "/v1/exercise/{exerciseId}": {
      get: {
        operationId: "ExerciseController_getMeasurement",
        parameters: [
          {
            name: "exerciseId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description:
              "Requirements: **{\n user: {\n  every: [\n   query:userId\n  ]\n }\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Exercise" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["Exercises"],
      },
    },
    "/v1/leaderboard/{leaderboardId}": {
      get: {
        operationId: "LeaderboardController_getMeasurement",
        parameters: [
          {
            name: "leaderboardId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description: "Requirements: **{\n user: all\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Leaderboard" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["Leaderboards"],
      },
    },
    "/v1/measurement/{measurementId}": {
      get: {
        operationId: "MeasurementController_getMeasurement",
        parameters: [
          {
            name: "measurementId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description:
              "Requirements: **{\n user: {\n  every: [\n   query:userId\n  ]\n }\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Measurement" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["Measurements"],
      },
    },
    "/v1/user": {
      get: {
        operationId: "UserController_queryUsers",
        parameters: [
          {
            name: "userId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description: "Requirements: **{\n user: all\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["User"],
      },
    },
    "/v1/user/{userId}": {
      get: {
        operationId: "UserController_getUser",
        parameters: [
          {
            name: "userId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description: "Requirements: **{\n user: all\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["User"],
      },
    },
    "/v1/user/identity/{userId}": {
      get: {
        operationId: "UserIdentityController_getUserIdentity",
        parameters: [
          {
            name: "userId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description:
              "Requirements: **{\n user: {\n  every: [\n   path:4:userId\n  ]\n }\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserIdentity" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["User"],
      },
    },
    "/v1/user/profile/{userId}": {
      get: {
        operationId: "UserProfileController_getUserIdentity",
        parameters: [
          {
            name: "userId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description: "Requirements: **{\n user: all\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserProfile" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["User Profile"],
      },
    },
    "/v1/user/settings/{userId}": {
      get: {
        operationId: "UserSettingsController_getUserSettings",
        parameters: [
          {
            name: "userId",
            required: true,
            in: "path",
            schema: { type: "string" },
          },
          {
            name: "authorization",
            in: "header",
            description:
              "Requirements: **{\n user: {\n  every: [\n   path:4:userId\n  ]\n }\n}**",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserSettings" },
              },
            },
          },
          "401": { description: "unauthorized" },
          "403": { description: "forbidden" },
        },
        tags: ["User Settings"],
      },
    },
  },
  info: { title: "Fitneat API", description: "", version: "V1", contact: {} },
  tags: [],
  servers: [],
  components: {
    schemas: {
      JwtPayload: {
        type: "object",
        properties: {
          clientId: { type: "string", enum: ["admin", "user", "fitneat-api"] },
          userId: { type: "string" },
          iat: { type: "number" },
          exp: { type: "number" },
        },
        required: ["clientId", "iat", "exp"],
      },
      TokenResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          payload: { $ref: "#/components/schemas/JwtPayload" },
        },
        required: ["token", "payload"],
      },
      Exercise: {
        type: "object",
        properties: { userId: { type: "string" } },
        required: ["userId"],
      },
      Leaderboard: {
        type: "object",
        properties: { leaderboardId: { type: "string" } },
        required: ["leaderboardId"],
      },
      Measurement: {
        type: "object",
        properties: { userId: { type: "string" } },
        required: ["userId"],
      },
      User: {
        type: "object",
        properties: {
          userId: { type: "string" },
          username: { type: "string" },
        },
        required: ["userId", "username"],
      },
      UserIdentityApple: {
        type: "object",
        properties: { providerUserId: { type: "string" } },
        required: ["providerUserId"],
      },
      UserIdentityFacebook: {
        type: "object",
        properties: { providerUserId: { type: "string" } },
        required: ["providerUserId"],
      },
      UserIdentityGoogle: {
        type: "object",
        properties: { providerUserId: { type: "string" } },
        required: ["providerUserId"],
      },
      UserIdentityMicrosoft: {
        type: "object",
        properties: { providerUserId: { type: "string" } },
        required: ["providerUserId"],
      },
      UserIdentityProviders: {
        type: "object",
        properties: {
          apple: { $ref: "#/components/schemas/UserIdentityApple" },
          facebook: { $ref: "#/components/schemas/UserIdentityFacebook" },
          google: { $ref: "#/components/schemas/UserIdentityGoogle" },
          microsoft: { $ref: "#/components/schemas/UserIdentityMicrosoft" },
        },
      },
      UserIdentity: {
        type: "object",
        properties: {
          userId: { type: "string" },
          providers: { $ref: "#/components/schemas/UserIdentityProviders" },
        },
        required: ["userId", "providers"],
      },
      UserProfile: {
        type: "object",
        properties: { userId: { type: "string" } },
        required: ["userId"],
      },
      UserSettings: {
        type: "object",
        properties: { userId: { type: "string" } },
        required: ["userId"],
      },
    },
  },
};


const settings: openapi.adapter.Settings<typeof fitneatApiSchema,{},{}> = {
  host: 'http://localhost:3000',
  global: {
    headers: {},
    queries: {}
  },
  overrides: {},
}


export class FitneatApi extends OpenApiAdapter<typeof fitneatApiSchema, 'fitneat-api'>
{
  constructor()
  {
    super('fitneat-api', settings)
  }

  private static _instance: FitneatApi | null = null
  private static get instance(){
    if (this._instance === null) this._instance = new FitneatApi()
    return this._instance
  }

  public static request = this.instance.fetch
}

