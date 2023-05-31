import { OpenApiAdapter } from "../../src";

const openApiObject3_0_0 = <const>{
    openapi: '3.0.0',
    info: {
        title: 'OpenApi 3.0.0',
        version: 'V3.0.0',
    }
}


export class OpenApi30 extends OpenApiAdapter<'openapi-3.0.0',typeof openApiObject3_0_0>{
    constructor() {
        super('openapi-3.0.0', openApiObject3_0_0, {
            host: 'https://localhost:3000'
        })
    }
}