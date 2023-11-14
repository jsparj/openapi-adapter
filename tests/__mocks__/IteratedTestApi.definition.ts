// GENERATED CODE: Do not make direct changes!
import type { iterated } from '@openapi-adapter/core'
export interface IteratedTestApiSpecification
{
  "openapi": "3.1.0",
  "info": {
    "title": "test-definition",
    "version": "1.0"
  },
  "security": [
    {
      "globalHeaderApiKey": []
    },
    {
      "globalQueryApiKey": []
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
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_array": {
        "in": "path",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "path_simple_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_enum": {
        "in": "path",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "path_simple_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_number": {
        "in": "path",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "path_simple_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_null": {
        "in": "path",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "path_simple_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_object": {
        "in": "path",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "path_simple_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "path_simple_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "path_label_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "label",
        "explode": false
      },
      "path_label_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "label",
        "explode": true
      },
      "path_matrix_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "matrix",
        "explode": false
      },
      "path_matrix_explode_string": {
        "in": "path",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "matrix",
        "explode": true
      },
      "header_simple_optional_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_array": {
        "in": "header",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_enum": {
        "in": "header",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_number": {
        "in": "header",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_null": {
        "in": "header",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_object": {
        "in": "header",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_optional_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "header_simple_explode_optional_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "header_simple_explode_string": {
        "in": "header",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": true
      },
      "cookie_simple_optional_array": {
        "in": "cookie",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_array": {
        "in": "cookie",
        "name": "array",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveArray"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_optional_enum": {
        "in": "cookie",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_enum": {
        "in": "cookie",
        "name": "enum",
        "schema": {
          "$ref": "#/components/schemas/Enum"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_optional_number": {
        "in": "cookie",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_number": {
        "in": "cookie",
        "name": "number",
        "schema": {
          "$ref": "#/components/schemas/Number"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_optional_null": {
        "in": "cookie",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_null": {
        "in": "cookie",
        "name": "null",
        "schema": {
          "$ref": "#/components/schemas/Null"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_optional_object": {
        "in": "cookie",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_object": {
        "in": "cookie",
        "name": "object",
        "schema": {
          "$ref": "#/components/schemas/PrimitiveObject"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_optional_string": {
        "in": "cookie",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": false
      },
      "cookie_simple_string": {
        "in": "cookie",
        "name": "string",
        "schema": {
          "$ref": "#/components/schemas/String"
        },
        "required": true,
        "style": "simple",
        "explode": false
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
      "globalHeaderApiKey": {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "header"
      },
      "globalQueryApiKey": {
        "type": "apiKey",
        "name": "global-apikey",
        "in": "query"
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
      "Empty": {
        "description": ""
      },
      "BodyAndHeadersObject": {
        "description": "OK",
        "headers": {
          "Content-Type": {
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
    "/path/s/simple/e/no/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_simple_enum"
        },
        {
          "$ref": "#/components/parameters/path_simple_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/path/s/simple/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_simple_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_simple_explode_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/path/s/label/e/no/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_label_enum"
        },
        {
          "$ref": "#/components/parameters/path_label_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/path/s/label/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_label_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_label_explode_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/path/s/matrix/e/no/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_matrix_enum"
        },
        {
          "$ref": "#/components/parameters/path_matrix_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/path/s/matrix/e/yes/{array}/{enum}/{null}/{number}/{object}/{string}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/path_matrix_explode_enum"
        },
        {
          "$ref": "#/components/parameters/path_matrix_explode_number"
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
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/header/s/simple/e/no/o/no": {
      "parameters": [
        {
          "$ref": "#/components/parameters/header_simple_optional_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_optional_number"
        }
      ],
      "patch": {
        "parameters": [
          {
            "$ref": "#/components/parameters/header_simple_optional_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_optional_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/header/s/simple/e/no/o/yes": {
      "parameters": [
        {
          "$ref": "#/components/parameters/header_simple_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_number"
        }
      ],
      "trace": {
        "parameters": [
          {
            "$ref": "#/components/parameters/header_simple_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/header/s/simple/e/yes/o/no": {
      "parameters": [
        {
          "$ref": "#/components/parameters/header_simple_explode_optional_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_explode_optional_number"
        }
      ],
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/header_simple_explode_optional_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_optional_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_optional_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_optional_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/header/s/simple/e/yes/o/yes": {
      "parameters": [
        {
          "$ref": "#/components/parameters/header_simple_explode_enum"
        },
        {
          "$ref": "#/components/parameters/header_simple_explode_number"
        }
      ],
      "put": {
        "parameters": [
          {
            "$ref": "#/components/parameters/header_simple_explode_array"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_null"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_object"
          },
          {
            "$ref": "#/components/parameters/header_simple_explode_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/cookie/s/simple/e/no/o/no": {
      "parameters": [
        {
          "$ref": "#/components/parameters/cookie_simple_optional_enum"
        },
        {
          "$ref": "#/components/parameters/cookie_simple_optional_number"
        }
      ],
      "post": {
        "parameters": [
          {
            "$ref": "#/components/parameters/cookie_simple_optional_array"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_optional_null"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_optional_object"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_optional_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/cookie/s/simple/e/no/o/yes": {
      "parameters": [
        {
          "$ref": "#/components/parameters/cookie_simple_enum"
        },
        {
          "$ref": "#/components/parameters/cookie_simple_number"
        }
      ],
      "delete": {
        "parameters": [
          {
            "$ref": "#/components/parameters/cookie_simple_array"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_null"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_object"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/cookie/s/simple/e/yes/o/no": {
      "parameters": [
        {
          "$ref": "#/components/parameters/cookie_simple_explode_optional_enum"
        },
        {
          "$ref": "#/components/parameters/cookie_simple_explode_optional_number"
        }
      ],
      "options": {
        "parameters": [
          {
            "$ref": "#/components/parameters/cookie_simple_explode_optional_array"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_optional_null"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_optional_object"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_optional_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
    "/cookie/s/simple/e/yes/o/yes": {
      "parameters": [
        {
          "$ref": "#/components/parameters/cookie_simple_explode_enum"
        },
        {
          "$ref": "#/components/parameters/cookie_simple_explode_number"
        }
      ],
      "head": {
        "parameters": [
          {
            "$ref": "#/components/parameters/cookie_simple_explode_array"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_null"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_object"
          },
          {
            "$ref": "#/components/parameters/cookie_simple_explode_string"
          }
        ],
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
            "$ref": "#/components/responses/Empty"
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
export type IteratedTestApiDefinition = iterated.Definition<IteratedTestApiSpecification>
