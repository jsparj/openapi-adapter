export interface TestApiDefinition
{
  "openapi": "3.1.0",
  "info": {
    "title": "test-definition",
    "version": "1.0"
  },
  "security": [
    {
      "globalApiKey": []
    }
  ],
  "components": {
    "parameters": {
      "path_simple_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "matrix",
        "explode": true
      },
      "path_simple_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "matrix",
        "explode": true
      },
      "path_simple_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "matrix",
        "explode": true
      },
      "path_simple_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "matrix",
        "explode": true
      },
      "path_simple_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "matrix",
        "explode": true
      },
      "path_simple_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": true
      },
      "path_label_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "label",
        "explode": false
      },
      "path_label_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "label",
        "explode": true
      },
      "path_matrix_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "matrix",
        "explode": true
      },
      "header_simple_optional_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "simple",
        "explode": true
      },
      "query_form_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "form",
        "explode": true,
        "required": true
      },
      "query_spaceDelimited_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "spaceDelimited",
        "explode": false,
        "required": false
      },
      "query_spaceDelimited_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "spaceDelimited",
        "explode": false,
        "required": true
      },
      "query_spaceDelimited_explode_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "spaceDelimited",
        "explode": true,
        "required": false
      },
      "query_spaceDelimited_explode_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "spaceDelimited",
        "explode": true,
        "required": true
      },
      "query_pipeDelimited_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "pipeDelimited",
        "explode": false,
        "required": false
      },
      "query_pipeDelimited_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "pipeDelimited",
        "explode": false,
        "required": true
      },
      "query_pipeDelimited_explode_optional_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "pipeDelimited",
        "explode": true,
        "required": false
      },
      "query_pipeDelimited_explode_array": {
        "in": "query",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "style": "pipeDelimited",
        "explode": true,
        "required": true
      },
      "query_form_optional_enum": {
        "in": "query",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_enum": {
        "in": "query",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_enum": {
        "in": "query",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_enum": {
        "in": "query",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "style": "form",
        "explode": true,
        "required": true
      },
      "query_form_optional_number": {
        "in": "query",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_number": {
        "in": "query",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_number": {
        "in": "query",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_number": {
        "in": "query",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "style": "form",
        "explode": true,
        "required": true
      },
      "query_form_optional_null": {
        "in": "query",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_null": {
        "in": "query",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_null": {
        "in": "query",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_null": {
        "in": "query",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "style": "form",
        "explode": true,
        "required": true
      },
      "query_form_optional_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "form",
        "explode": true,
        "required": true
      },
      "query_deepObject_explode_optional_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "deepObject",
        "explode": true,
        "required": false
      },
      "query_deepObject_explode_object": {
        "in": "query",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "style": "deepObject",
        "explode": true,
        "required": true
      },
      "query_form_optional_string": {
        "in": "query",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "form",
        "explode": false,
        "required": false
      },
      "query_form_string": {
        "in": "query",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "form",
        "explode": false,
        "required": true
      },
      "query_form_explode_optional_string": {
        "in": "query",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "form",
        "explode": true,
        "required": false
      },
      "query_form_explode_string": {
        "in": "query",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "style": "form",
        "explode": true,
        "required": true
      }
    },
    "schemas": {
      "Number": {
        "type": "number"
      },
      "Integer": {
        "type": "integer"
      },
      "String": {
        "type": "string"
      },
      "Null": {
        "type": "null"
      },
      "Boolean": {
        "type": "boolean"
      },
      "Primitive": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/Boolean"
          },
          {
            "$ref": "#/components/schemas/String"
          },
          {
            "$ref": "#/components/schemas/Integer"
          },
          {
            "$ref": "#/components/schemas/Number"
          },
          {
            "$ref": "#/components/schemas/Null"
          }
        ]
      },
      "Enum": {
        "enum": [
          "_1_",
          "_2_",
          "_3_"
        ]
      },
      "PrimitiveArray": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Primitive"
        }
      },
      "PrimitiveObject": {
        "type": "object",
        "properties": {
          "string": {
            "$ref": "#/components/schemas/String"
          },
          "number": {
            "$ref": "#/components/schemas/Number"
          },
          "integer": {
            "$ref": "#/components/schemas/Integer"
          },
          "null": {
            "$ref": "#/components/schemas/Null"
          }
        },
        "required": [
          "string",
          "number"
        ]
      },
      "PrimitiveRecord": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/Primitive"
        }
      },
      "DeepObject": {
        "type": "object",
        "properties": {
          "array": {
            "$ref": "#/components/schemas/PrimitiveArray"
          },
          "record": {
            "$ref": "#/components/schemas/PrimitiveRecord"
          }
        }
      },
      "MediaTypeObjectApplicationJson": {
        "type": "object",
        "properties": {
          "mediaType": {
            "enum": [
              "application/json"
            ]
          },
          "content": {
            "$ref": "#/components/schemas/PrimitiveObject"
          }
        },
        "required": [
          "mediaType"
        ]
      },
      "MediaTypeObjectApplicationXml": {
        "type": "object",
        "properties": {
          "mediaType": {
            "enum": [
              "application/xml"
            ]
          },
          "content": {
            "$ref": "#/components/schemas/PrimitiveObject"
          }
        },
        "required": [
          "mediaType"
        ]
      }
    },
    "securitySchemes": {
      "globalApiKey": {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "header"
      },
      "basicHttp": {
        "type": "http",
        "scheme": "basic"
      },
      "bearerHttp": {
        "type": "http",
        "scheme": "bearer"
      },
      "someOAuth2": {
        "type": "oauth2",
        "flows": {
          "implicit": {
            "scopes": {}
          }
        }
      },
      "someOpenIdConnect": {
        "type": "openIdConnect",
        "openIdConnectUrl": "https://example.com"
      }
    },
    "requestBodies": {
      "Default": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/MediaTypeObjectApplicationJson"
            }
          },
          "application/xml": {
            "schema": {
              "$ref": "#/components/schemas/MediaTypeObjectApplicationXml"
            }
          }
        }
      }
    },
    "responses": {
      "NotFound": {
        "description": "NOT_FOUND"
      },
      "Forbidden": {
        "description": "FORBIDDEN"
      },
      "Unauthorized": {
        "description": "UNAUTHORIZED"
      },
      "BodyAndHeadersObject": {
        "description": "OK",
        "headers": {
          "content-type": {
            "required": true,
            "schema": {
              "enum": [
                "application/json",
                "application/xml"
              ]
            }
          }
        },
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/MediaTypeObjectApplicationJson"
            }
          },
          "application/xml": {
            "schema": {
              "$ref": "#/components/schemas/MediaTypeObjectApplicationXml"
            }
          }
        }
      }
    }
  },
  "paths": {
    "path/tests/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_simple_enum"
        },
        {
          "$ref": "#/components/parameters/path_simple_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_simple_array"
          },
          {
            "$ref": "#/components/parameters/path_simple_null"
          },
          {
            "$ref": "#/components/parameters/path_simple_object"
          },
          {
            "$ref": "#/components/parameters/path_simple_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "path/tests/{array*}/{enum*}/{null*}/{number*}/{object*}/{string*}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_simple_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_simple_explode_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "put": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_simple_explode_array"
          },
          {
            "$ref": "#/components/parameters/path_simple_explode_null"
          },
          {
            "$ref": "#/components/parameters/path_simple_explode_object"
          },
          {
            "$ref": "#/components/parameters/path_simple_explode_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "path/tests/{.array}/{.enum}/{.null}/{.number}/{.object}/{.string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_label_enum"
        },
        {
          "$ref": "#/components/parameters/path_label_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "post": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_label_array"
          },
          {
            "$ref": "#/components/parameters/path_label_null"
          },
          {
            "$ref": "#/components/parameters/path_label_object"
          },
          {
            "$ref": "#/components/parameters/path_label_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "path/tests/{.array*}/{.enum*}/{.null*}/{.number*}/{.object*}/{.string*}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_label_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_label_explode_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "delete": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_label_explode_array"
          },
          {
            "$ref": "#/components/parameters/path_label_explode_null"
          },
          {
            "$ref": "#/components/parameters/path_label_explode_object"
          },
          {
            "$ref": "#/components/parameters/path_label_explode_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "path/tests/{;array}/{;enum}/{;null}/{;number}/{;object}/{;string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_matrix_enum"
        },
        {
          "$ref": "#/components/parameters/path_matrix_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "options": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_matrix_array"
          },
          {
            "$ref": "#/components/parameters/path_matrix_null"
          },
          {
            "$ref": "#/components/parameters/path_matrix_object"
          },
          {
            "$ref": "#/components/parameters/path_matrix_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "path/tests/{;array*}/{;enum*}/{;null*}/{;number*}/{;object*}/{;string*}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_matrix_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_matrix_explode_number"
        },
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_number"
        },
        {
          "$ref": "#/components/parameters/query_form_explode_enum"
        }
      ],
      "head": {
        "parameters": [
          {
            "$ref": "#/components/parameters/path_matrix_explode_array"
          },
          {
            "$ref": "#/components/parameters/path_matrix_explode_null"
          },
          {
            "$ref": "#/components/parameters/path_matrix_explode_object"
          },
          {
            "$ref": "#/components/parameters/path_matrix_explode_string"
          },
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_array"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_null"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_object"
          },
          {
            "$ref": "#/components/parameters/query_form_explode_string"
          }
        ],
        "requestBody": {
          "$ref": "#/components/requestBodies/Default"
        },
        "security": [
          {
            "basicHttp": [],
            "someOAuth2": []
          },
          {
            "bearerHttp": [],
            "someOAuth2": []
          },
          {
            "someOpenIdConnect": []
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/BodyAndHeadersObject"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    }
  }
}