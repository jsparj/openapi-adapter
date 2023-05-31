import { OpenApiAdapter, raw } from "../../src";

const schema3_1_0 = <const>{
    openapi: '3.1.0',
    info: {
        title: 'OpenApi 3.1.0',
        version: 'V3.1.0',
    }
}


export class OpenApi31 extends OpenApiAdapter<'openapi-3.1.0', typeof schema3_1_0>{
    constructor() {
        super('openapi-3.1.0', schema3_1_0, {
            host: 'https://localhost:3000',
        })
    }
}



const openapi31 = new OpenApi31()



