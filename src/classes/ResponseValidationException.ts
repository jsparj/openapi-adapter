import { openapi } from "../types";

export class ResponseValidationException extends Error implements openapi.response.ValidationException {
    code: openapi.response.ValidationExceptionCode;
    constructor(code: openapi.response.ValidationExceptionCode, message: string) {
        super(`ResponseValidationException[${code}]: ${message}`)
        this.code = code
    }
}