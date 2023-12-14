//[generated code]: DO NOT EDIT DIRECTLY
import type {schema} from './schemas'
import type {securityScheme} from './securitySchemes'
export namespace generated {
	export interface Definition{
		auth: {
			schemes: {
				mutualTLS: securityScheme.mutualTLS
				authorization: securityScheme.authorization
			}
			global: [`mutualTLS`]
		}
		path: {
			'/resource/{resourceId}': {
				item: {
					requestParams: {
						path: {
							/**
							 * @description Resource identifier.
							 */
							resourceId: {
								serialization: {
									explode: false
									style: `simple`
								}
								value: number
							}
						}
						query: {
						}
						header: {
						}
						cookie: {
						}
					}
				}
				operations: {
					get: {
						requestParams: {
							security: [`authorization`]
						}
						responseObject: {
							'200': {
								/**
								 * @description Successful response
								 */
								data: {
									mediaType: `application/json`
									value: schema.Resource
								}
								headers: {
									'content-type': `application/json`
								}
							}
						}
					}
					post: {
						requestParams: {
							security: [`authorization`]
							body: {
								mediaType: `application/json`
								value: schema.Resource
							}
						}
						responseObject: {
							'201': {
								/**
								 * @description Resource created successfully.
								 */
								data: undefined
								headers: {
								}
							}
						}
					}
				}
			}
		}
	}
}
