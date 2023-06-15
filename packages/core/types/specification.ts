export namespace specification {
    export type HttpMethod =
        | 'get'
        | 'put'
        | 'post'
        | 'delete'
        | 'options'
        | 'head'
        | 'patch'
        | 'trace'
    
    /** Top-level types [RFC6838]: https://www.iana.org/assignments/media-types/media-types.xhtml*/
    export type MediaTypeTop =
        | 'application'
        | 'audio'
        | 'font'
        | 'image'
        | 'message'
        | 'model'
        | 'multipart'
        | 'text'
        | 'video'
        | '*'
    
    /** Types [RFC6838]: https://www.iana.org/assignments/media-types/media-types.xhtml*/
    export type MediaType = `${MediaTypeTop}/${string}`


    export interface ServerObject {
        url: string;
        description?: string;
        variables?: { [v: string]: ServerVariableObject };
    }
    export interface ServerVariableObject {
        enum?: readonly string[] | readonly boolean[] | readonly number[];
        default: string | boolean | number;
        description?: string;
    }


    export interface OpenAPIObject {
        openapi: string;
        info: InfoObject;
        servers?: readonly ServerObject[];
        paths?: PathsObject;
        components?: ComponentsObject;
        security?: readonly SecurityRequirementObject[];
        tags?: readonly TagObject[];
        externalDocs?: ExternalDocumentationObject;
        /** Webhooks added in v. 3.1.0 */
        webhooks?: PathsObject;
    }
    export interface InfoObject {
        title: string;
        description?: string;
        termsOfService?: string;
        contact?: ContactObject;
        license?: LicenseObject;
        version: string;
    }
    export interface ContactObject {
        name?: string;
        url?: string;
        email?: string;
    }
    export interface LicenseObject {
        name: string;
        url?: string;
    }

    export type ComponentsObject = {
        schemas?: Record<string, SchemaObject>;
        responses?: Record<string, ResponseObject>;
        parameters?: Record<string, ParameterObject>;
        requestBodies?: Record<string, RequestBodyObject>;
        headers?: Record<string, HeaderObject>;
        securitySchemes?: Record<string, SecuritySchemeObject>;
        callbacks?: Record<string, CallbackObject>;
    }

    export type ComponentType = keyof ComponentsObject

    export type ComponentObject =
        | SchemaObject
        | ResponseObject
        | ParameterObject
        | RequestBodyObject
        | HeaderObject
        | SecuritySchemeObject
        | CallbackObject

    export interface PathsObject {
        [path: string]: PathItemObject
    }

    export type PathItemObject = {
        $ref?: string;
        summary?: string;
        description?: string;
        servers?: readonly ServerObject[];
        parameters?: readonly ParameterObject[];

    } & {
            [method in HttpMethod]?: OperationObject
        }
    export interface OperationObject {
        tags?: readonly string[];
        summary?: string;
        description?: string;
        externalDocs?: ExternalDocumentationObject;
        operationId?: string;
        parameters?: readonly ParameterObject[];
        requestBody?: RequestBodyObject;
        responses: ResponsesObject;
        callbacks?: CallbacksObject;
        deprecated?: boolean;
        security?: readonly SecurityRequirementObject[];
        servers?: readonly ServerObject[];
    }
    export interface ExternalDocumentationObject {
        description?: string;
        url: string;
    }

    /**
     * The location of a parameter.
     * Possible values are "query", "header", "path" or "cookie".
     * Specification:
     * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-locations
     */
    export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';

    /**
     * The style of a parameter.
     * Describes how the parameter value will be serialized.
     * (serialization is not implemented yet)
     * Specification:
     * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values
     */
    export type ParameterStyle =
        | 'matrix'
        | 'label'
        | 'form'
        | 'simple'
        | 'spaceDelimited'
        | 'pipeDelimited'
        | 'deepObject';

    export type BaseParameterObject = {
        $ref?: string;
        summary?: string;
        description?: string;
        required?: boolean;
        deprecated?: boolean;
        allowEmptyValue?: boolean;

        style?: ParameterStyle; // "matrix" | "label" | "form" | "simple" | "spaceDelimited" | "pipeDelimited" | "deepObject";
        explode?: boolean;
        allowReserved?: boolean;
        schema?: SchemaObject;
        example?: any;
        content?: ContentObject;
    }

    export type ParameterObject<T extends ParameterLocation = ParameterLocation> = BaseParameterObject &
    {
        name?: string;
        in?: T; 
    }
    export type RequestBodyObject = {
        $ref?: string;
        summary?: string;
        description?: string;
        content?: ContentObject;
        required?: boolean;
    }
    export type ContentObject = {
        [mediatype in MediaType]?: MediaTypeObject;
    }

    export interface MediaTypeObject {
        schema?: SchemaObject;
        example?: any;
        encoding?: EncodingObject;
    }
    export interface EncodingObject {
        [property: string]: EncodingPropertyObject
    }
    export interface EncodingPropertyObject {
        contentType?: string;
        headers?: { [key: string]: HeaderObject };
        style?: string;
        explode?: boolean;
        allowReserved?: boolean;
    }
    export type ResponsesObject = {
        default?: ResponseObject
        [statusCode: string]: ResponseObject | undefined
    }

    export type ResponseObject = {
        $ref?: string;
        summary?: string;
        description?: string;
        headers?: HeadersObject;
        content?: ContentObject;
    }
    export interface CallbacksObject {
        [name: string]: CallbackObject
    }
    export type CallbackObject = {
        $ref?: string;
        summary?: string;
        description?: string;
    } & {
        [name: string]: PathItemObject
    }
    export interface HeadersObject {
        [name: string]: HeaderObject;
    }
    export interface LinkParametersObject {
        [name: string]: any | string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export type HeaderObject = BaseParameterObject
    export interface TagObject {
        name: string;
        description?: string;
        externalDocs?: ExternalDocumentationObject;
        [extension: string]: any; // Hack for allowing ISpecificationExtension
    }


    export type SchemaObjectType =
        | 'integer'
        | 'number'
        | 'string'
        | 'boolean'
        | 'object'
        | 'null'
        | 'array';

    export type SchemaObject = {
        $ref?: string;
        summary?: string;
        discriminator?: DiscriminatorObject;
        readOnly?: boolean;
        writeOnly?: boolean;
        xml?: XmlObject;
        externalDocs?: ExternalDocumentationObject;
        /** @deprecated use examples instead */
        example?: any;
        examples?: readonly any[];
        deprecated?: boolean;

        type?: SchemaObjectType | readonly SchemaObjectType[];
        format?:
        | 'int32'
        | 'int64'
        | 'float'
        | 'double'
        | 'byte'
        | 'binary'
        | 'date'
        | 'date-time'
        | 'password'
        | string;
        allOf?: readonly SchemaObject[];
        oneOf?: readonly SchemaObject[];
        anyOf?: readonly SchemaObject[];
        not?: SchemaObject;
        items?: SchemaObject;
        properties?: Record<string, SchemaObject>;
        additionalProperties?: SchemaObject | boolean;
        description?: string;
        default?: any;

        title?: string;
        multipleOf?: number;
        maximum?: number;
        /** @desc In OpenAPI 3.1: number */
        exclusiveMaximum?: number;
        minimum?: number;
        /** @desc In OpenAPI 3.1: number */
        exclusiveMinimum?: number;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        required?: readonly string[];
        enum?: readonly any[];
        prefixItems?: readonly SchemaObject[];
    }

    export interface SchemasObject {
        [schema: string]: SchemaObject;
    }

    export interface DiscriminatorObject {
        propertyName: string;
        mapping?: { [key: string]: string };
    }

    export interface XmlObject {
        name?: string;
        namespace?: string;
        prefix?: string;
        attribute?: boolean;
        wrapped?: boolean;
    }
    export type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

    export type SecuritySchemeObject = {
        $ref?: string;
        summary?: string;
        type?: SecuritySchemeType;
        description?: string;
        /** Required only for apiKey */ name?: string; // 
        /** Required only for apiKey */ in?: Exclude<ParameterLocation, 'path'>;
        /** Required only for http */ scheme?: string;
        bearerFormat?: string;
        /** Required only for oauth2 */ flows?: OAuthFlowsObject;
        /** Required only for openIdConnect */ openIdConnectUrl?: string; // 
    }
    export interface OAuthFlowsObject {
        implicit?: OAuthFlowObject;
        password?: OAuthFlowObject;
        clientCredentials?: OAuthFlowObject;
        authorizationCode?: OAuthFlowObject;
    }
    export interface OAuthFlowObject {
        authorizationUrl?: string;
        tokenUrl?: string;
        refreshUrl?: string;
        scopes: ScopesObject;
    }
    export interface ScopesObject {
        [scope: string]: string; 
    }
    export interface SecurityRequirementObject {
        [name: string]: readonly string[];
    }
}